export default function HackText() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%^&*()";

  let interval = null;

  function onMouseOverHandler(event) {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return event.target.dataset.value[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= event.target.dataset.value.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  }

  return (
    <div>
      <h1
        data-value="STARSIDE"
        onMouseOver={onMouseOverHandler}
      >
        STARSIDE
      </h1>
    </div>
  );
}
