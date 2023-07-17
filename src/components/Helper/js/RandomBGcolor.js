
const randomBGcolor = () => {
  const tobeSetBgColor = document.querySelectorAll(".randomBGcolor");
  let randomColorPattern;
  tobeSetBgColor.forEach(element => {
    randomColorPattern = Math.random().toString(16).replace('0.', '');
    element.style.backgroundColor = `#${randomColorPattern.slice(1 , 7)}`;
  })

}

export { randomBGcolor };