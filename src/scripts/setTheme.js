import { findElementByClass } from "./findElement";


export default function setTheme(settings) {

  settings.theme ? document.body.classList.add(settings.theme) : document.body.classList.remove("light-theme");

  findElementByClass("switch-checkbox").checked = settings.isChecked;
  
  const modeText = findElementByClass("switch-text");
  modeText.textContent = "";
  modeText.textContent = settings.text;
}