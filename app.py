import streamlit as st
import pickle
import os
import base64
import time
import re
import io
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.chains.question_answering import load_qa_chain 
from langchain.chains.qa_with_sources import load_qa_with_sources_chain
from langchain.callbacks import get_openai_callback
import fitz
import datetime
import mimetypes
import requests
import json
import boto3
from botocore.exceptions import NoCredentialsError
import logging



#################### CONFIGURATION ####################

# Set test true or false so that the Gopher uses the test AWS bucket or the regular bucket
test = False

if test == True:
    BUCKET_NAME = 'guidelinegopher-test'
if test == False:
    BUCKET_NAME = 'guidelinegopher'

st.set_page_config(layout="wide")


st.markdown(
    """
    <link rel="canonical" href="https://guidelinegopher.com/" />
    """,
    unsafe_allow_html=True
)

# OpenAI API key
api_key = st.secrets["OPENAI_API_KEY"]
#os.environ["OPENAI_API_KEY"] = api_key





################## '--' GUIDELINE GOPHER '--' ##################
################## '--' GUIDELINE GOPHER '--' ##################
################## '--' GUIDELINE GOPHER '--' ##################



def log_user_request(query, store_name):
    logging.info(f"USER INQUIRY: {query} \nDOCUMENT: {store_name}.pdf")
    send_telegram_message(f"USER INQUIRY: {query} \nDOCUMENT: {store_name}.pdf")



def send_telegram_message(message):
    bot_token = st.secrets["TELEGRAM_BOT_TOKEN"]
    chat_id = st.secrets["TELEGRAM_CHAT_ID"]
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": message
    }
    requests.post(url, data=payload)



def upload_to_aws(pdf, BUCKET_NAME, store_name_pdf):
    s3 = boto3.client('s3', aws_access_key_id=st.secrets["AWS_ACCESS_KEY_ID"],
                      aws_secret_access_key=st.secrets["AWS_SECRET_ACCESS_KEY"])
    
    
    try:
        s3.upload_fileobj(pdf, BUCKET_NAME, store_name_pdf)
        return True
    except FileNotFoundError:
        return False
    except NoCredentialsError:
        return False
    

def generate_presigned_url(BUCKET_NAME, store_name_pdf, expiration=7200):
    s3_client = boto3.client('s3')
    try:
        response = s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket': BUCKET_NAME, 'Key': store_name_pdf},
                                                    ExpiresIn=expiration)
    except Exception as e:
        st.error(f"Error generating URL: {e}")
        return None
    return response


def guideline_gopher(store_name):


    # Empty main page and load PDF that's been selected
    placeholder = st.empty()
    pdf_viewer = f'''
        <iframe 
        id="pdf-iframe"
        src= "https://{BUCKET_NAME}.s3.us-west-1.amazonaws.com/web/viewer.html?file=https://{BUCKET_NAME}.s3.us-west-1.amazonaws.com/{store_name}.pdf"
        width="900" 
        height="1000">
        </iframe>
        '''
    placeholder.markdown(pdf_viewer, unsafe_allow_html=True)


    # Point to pkl vector file
    if os.path.exists(f"{store_name}.pkl"):

        with open(f"{store_name}.pkl", "rb") as f:
            VectorStore = pickle.load(f) 
    else:
        st.sidebar.write("SYSTEM MESSAGE: Embeddings not found.")

    # Initiate all session_state placeholders to make variables persistent across reruns
    if 'query' not in st.session_state:
        st.session_state.query = ""
    if 'response' not in st.session_state:
        st.session_state.response = ""
    if 'last_query' not in st.session_state:
        st.session_state.last_query = ""
    if 'docs' not in st.session_state:
        st.session_state.docs = ""


    # Ask the question, goes into session_state placeholder
    st.session_state.query = st.sidebar.text_input("Ask your question here:")


    # The Magic
    if st.session_state.query:
        st.session_state.docs = VectorStore.similarity_search(query=st.session_state.query, k=3)
        llm = ChatOpenAI(api_key=api_key, temperature=0, model_name='gpt-4o')
        chain = load_qa_chain(llm=llm, chain_type="stuff")

        if st.session_state.query != st.session_state.last_query:
            st.session_state.increment = 0
            with get_openai_callback() as cb:
                st.session_state.response = chain.run(input_documents=st.session_state.docs, question=st.session_state.query)
                #st.sidebar.write(str(cb)) #Uncomment to see openai callback
                log_user_request(st.session_state.query, store_name)

        st.sidebar.write(st.session_state.response)

        st.session_state.last_query = st.session_state.query

        # Logic to select between different search sources
        if 'increment' not in st.session_state:
            st.session_state.increment = 0

        if st.session_state.increment == 0:
            source = st.session_state.docs[0].page_content

        elif st.session_state.increment == 1:
            source = st.session_state.docs[1].page_content

        elif st.session_state.increment == 2:
            source = st.session_state.docs[2].page_content

        # Debugging sources on sidebar
        #st.sidebar.write("SOURCE:")
        #st.sidebar.write(source)
        # st.sidebar.write(st.session_state.docs)
        # st.sidebar.write(st.session_state.docs[0].page_content)
        # st.sidebar.write(st.session_state.docs[1].page_content)
        # st.sidebar.write(st.session_state.docs[2].page_content)





        # MATCHING LOGIC AND DEBUGGING
        # Remove dashes right before a new line since pdf.js can't handle that - \n
        newline_dash_scrubbed = re.sub(r'-\n', '', source)

        # Replace \n with a character in front of it with a simple space
        newline_nospace_scrubbed = re.sub(r"(?<! )\n", ' ', newline_dash_scrubbed)

        # Replace any \n characters with a space in front of them
        concurrent_newlines_scrubbed = re.sub(r"(\s*\n\s*){2,}", '', newline_nospace_scrubbed)

        # Remove all newline characters \n
        source_scrubbed = re.sub(r'\n', '', concurrent_newlines_scrubbed)


        # If end of page, result is everything before !end_of_page! minus 50 characters. If not result is source_scrubbed
        pattern = r'(.*?)!end_of_page!'
        match = re.search(pattern, source_scrubbed)
        if match:
            pageend_result = match.group(1)[:-50]
        else:
            pageend_result = source_scrubbed

        # Any run-on words with a non-capital letter followed directly by a capital cut off front or end depending on where landing in length of string
        pattern = r'[a-z][A-Z]'
        match = re.search(pattern, pageend_result)
        if match:
            start_index = match.start()
            string_length = len(pageend_result)

            if start_index < string_length / 2:
                result = pageend_result[start_index + 1:]
            else:
                result = pageend_result[:start_index - 1]
        else:
            result = pageend_result

        # DEBUGGING for 'result
        # st.sidebar.write("RESULT")
        # st.sidebar.write(result)
        
        # Search and highlight source text driven by search query at end of URL
        placeholder.empty()

        time.sleep(2)

        pdf_viewer = f'''
            <iframe 
            id="pdf-iframe"
            src= "https://{BUCKET_NAME}.s3.us-west-1.amazonaws.com/web/viewer.html?file=https://{BUCKET_NAME}.s3.us-west-1.amazonaws.com/{store_name}.pdf#search={result}"
            width="900" 
            height="1000">
            </iframe>
            '''
        placeholder.markdown(pdf_viewer, unsafe_allow_html=True)
        
        
        # Button to cycle through sources
        if st.sidebar.button("See next source"):
            st.sidebar.empty()

        if st.session_state.increment == 0:
            st.session_state.increment += 1
            st.sidebar.write("<b>Viewing Source: 1</b>", unsafe_allow_html=True)

        elif st.session_state.increment == 1:
            st.session_state.increment += 1
            st.sidebar.write("<b>Viewing Source: 2</b>", unsafe_allow_html=True)

        elif st.session_state.increment == 2:
            st.session_state.increment = 0
            st.sidebar.write("<b>Viewing Source: 3</b>", unsafe_allow_html=True)

        



def main():

    pdf = ""

    st.sidebar.header("ASK YOUR QUESTION BELOW")

    guideline_option = st.sidebar.selectbox('Select a translation', ('(Select translation)', 'Upload my own PDF', 'King James'))

    #guideline_option = 'King James'
    if guideline_option == 'King James':
        st.header("The King James translation of The Holy Bible")
        store_name = 'King James'
        guideline_gopher(store_name)

    # Take a different route if 'Upload my own'
    if guideline_option == 'Upload my own PDF':
        
        pdf = st.sidebar.file_uploader("Upload your PDF here", type='pdf')
        #st.sidebar.write(pdf) Debugging

        if pdf is not None:
            
            # Use MYMuPDF to extract text from PDF
            pdf_bytes = io.BytesIO(pdf.read())

            doc = fitz.open("pdf", pdf_bytes)
            text = ""
            for page in doc:
                text += page.get_text()
                text += "!end_of_page!"


            # Split PDF into chunks
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=1000,
                chunk_overlap=200,
                length_function=len
            )
            chunks = text_splitter.split_text(text=text)


            # Create embeddings
            store_name = pdf.name[:-4] # Use this line to obtain name of document
            store_name_pdf = store_name + '.pdf'
            embeddings = OpenAIEmbeddings()
            VectorStore = FAISS.from_texts(chunks, embedding=embeddings)
            with open(f"{store_name}.pkl", "wb") as f:
                pickle.dump(VectorStore, f)
            #st.write('SYSTEM MESSAGE: Embedding computation completed')


            # UNCOMMENT TO DOWNLOAD VECTOR DATA
            with open(f'{store_name}.pkl', 'rb') as file:
               st.download_button(
                   label="Download vector data",
                   data=file,
                   file_name=f'{store_name}.pkl',
                   mime='application/octet-stream'
                   )

            pdf.seek(0)

            # Upload PDF to AWS S3
            if upload_to_aws(pdf, BUCKET_NAME, store_name_pdf):
                generate_presigned_url(BUCKET_NAME, store_name_pdf, expiration=7200)

                
                # Empty main page and load PDF that's been selected
                placeholder = st.empty()

                pdf_viewer = f'''
                    <iframe 
                    id="pdf-iframe"
                    src= "https://{BUCKET_NAME}.s3.us-west-1.amazonaws.com/web/viewer.html?file=https://{BUCKET_NAME}.s3.us-west-1.amazonaws.com/{store_name}.pdf"
                    width="900" 
                    height="1000">
                    </iframe>
                    '''
                placeholder.markdown(pdf_viewer, unsafe_allow_html=True)

                # Initiate all session_state placeholders to make variables persistent across reruns
                if 'query' not in st.session_state:
                    st.session_state.query = ""
                if 'response' not in st.session_state:
                    st.session_state.response = ""
                if 'last_query' not in st.session_state:
                    st.session_state.last_query = ""
                if 'docs' not in st.session_state:
                    st.session_state.docs = ""


                # Ask the question, goes into session_state placeholder
                st.session_state.query = st.sidebar.text_input("Ask your question here:")


                # The magic
                if st.session_state.query:
                    st.session_state.docs = VectorStore.similarity_search(query=st.session_state.query, k=3)
                    llm = ChatOpenAI(api_key=api_key, temperature=0, model_name='gpt-3.5-turbo')
                    chain = load_qa_chain(llm=llm, chain_type="stuff")

                    if st.session_state.query != st.session_state.last_query:
                        st.session_state.increment = 0
                        with get_openai_callback() as cb:
                            st.session_state.response = chain.run(input_documents=st.session_state.docs, question=st.session_state.query)
                            #st.sidebar.write(str(cb)) #Uncomment to see openAI callback
                            log_user_request(st.session_state.query, store_name)

                    st.sidebar.write(st.session_state.response)

                    st.session_state.last_query = st.session_state.query


                    # Logic to select between different search sources
                    if 'increment' not in st.session_state:
                        st.session_state.increment = 0

                    if st.session_state.increment == 0:
                        source = st.session_state.docs[0].page_content

                    elif st.session_state.increment == 1:
                        source = st.session_state.docs[1].page_content

                    elif st.session_state.increment == 2:
                        source = st.session_state.docs[2].page_content

                    # Debugging sources on sidebar
                    #st.sidebar.write("SOURCES:")
                    #st.sidebar.write(docs)

                    # MATCHING LOGIC AND DEBUGGING
                    # Remove dashes right before a new line since pdf.js can't handle that - \n
                    newline_dash_scrubbed = re.sub(r'-\n', '', source)

                    # Replace \n with a character in front of it with a simple space
                    newline_nospace_scrubbed = re.sub(r"(?<! )\n", ' ', newline_dash_scrubbed)

                    # Replace any \n characters with a space in front of them
                    concurrent_newlines_scrubbed = re.sub(r"(\s*\n\s*){2,}", '', newline_nospace_scrubbed)

                    # Remove all newline characters \n
                    source_scrubbed = re.sub(r'\n', '', concurrent_newlines_scrubbed)


                    # If end of page, result is everything before !end_of_page! minus 50 characters. If not result is source_scrubbed
                    pattern = r'(.*?)!end_of_page!'
                    match = re.search(pattern, source_scrubbed)
                    if match:
                        pageend_result = match.group(1)[:-50]
                    else:
                        pageend_result = source_scrubbed


                    # Any run-on words with a non-capital letter followed directly by a capital cut off front or end depending on where landing in length of string
                    pattern = r'[a-z][A-Z]'
                    match = re.search(pattern, pageend_result)
                    if match:
                        start_index = match.start()
                        string_length = len(pageend_result)

                        if start_index < string_length / 2:
                            result = pageend_result[start_index + 1:]
                        else:
                            result = pageend_result[:start_index - 1]
                    else:
                        result = pageend_result

                    # DEBUGGING for 'result
                    # st.sidebar.write("RESULT")
                    # st.sidebar.write(result)
                    
                    # Search and highlight source text driven by search query at end of URL
                    placeholder.empty()

                    time.sleep(2)

                    pdf_viewer = f'''
                        <iframe 
                        id="pdf-iframe"
                        src= "https://{BUCKET_NAME}.s3.us-west-1.amazonaws.com/web/viewer.html?file=https://{BUCKET_NAME}.s3.us-west-1.amazonaws.com/{store_name}.pdf#search={result}"
                        width="900" 
                        height="1000">
                        </iframe>
                        '''
                    placeholder.markdown(pdf_viewer, unsafe_allow_html=True)

                    time.sleep(1)


                    # Button to cycle through sources
                    if st.sidebar.button("See next source"):
                        st.sidebar.empty()

                    if st.session_state.increment == 0:
                        st.session_state.increment += 1
                        st.sidebar.write("<b>Viewing Source: 1</b>", unsafe_allow_html=True)

                    elif st.session_state.increment == 1:
                        st.session_state.increment += 1
                        st.sidebar.write("<b>Viewing Source: 2</b>", unsafe_allow_html=True)

                    elif st.session_state.increment == 2:
                        st.session_state.increment = 0
                        st.sidebar.write("<b>Viewing Source: 3</b>", unsafe_allow_html=True)
                




if __name__ == '__main__':
    main()

    #//src="https://storage.googleapis.com/guidelinebling/web/viewer.html?file=https://storage.googleapis.com/guidelinebling/{store_name}.pdf"
    # //src="https://storage.googleapis.com/guidelinebling/web/viewer.html?file=https://storage.googleapis.com/guidelinebling/{store_name}.pdf#search={longest_match}"  