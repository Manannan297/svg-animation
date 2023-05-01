const cursor = document.querySelector(".cursor");
let activeColor;

const PARAMS = {
  speed: 0.2,
  offset: Math.round(cursor.getBoundingClientRect().width / 2),
};

const COLORS = ["#F66C41", "#00E0FF", "#D9AB36", "#4EF483", "#7C4EFF"];

const mouse = {
  x: null,
  y: null,
};

const pos = {
  x: null,
  y: null,
};

// вспомогательные функции

const getRandomElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const updateCursor = () => {
  const diffX = Math.round(mouse.x - pos.x);
  const diffY = Math.round(mouse.y - pos.y);

  pos.x = Math.round(pos.x + diffX * PARAMS.speed);
  pos.y = Math.round(pos.y + diffY * PARAMS.speed);

  const translate = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

  cursor.style.transform = translate;
};

const updateCoordinates = (evt) => {
  mouse.x = evt.clientX - PARAMS.offset;
  mouse.y = evt.clientY - PARAMS.offset;

  console.log(mouse.x, mouse.y);
};

const changeColor = () => {
  const color = getRandomElement(COLORS);

  if (color === activeColor) {
    changeColor();
  } else {
    cursor.style.fill = color;
    activeColor = color;
  }
};

window.addEventListener("mousemove", updateCoordinates);
window.addEventListener("click", changeColor);

const requestAnimationHandler = () => {
  updateCursor();
  requestAnimationFrame(requestAnimationHandler);
};

requestAnimationFrame(requestAnimationHandler);
