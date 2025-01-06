import '../styles/index.css'

import { findElementByClass } from "./findElement"
import updateWeather from "./updateWeather";
import getElements from './getElements';
import setTheme from './setTheme';

(function init() {
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", JSON.stringify({
      theme: "",
      isChecked: false,
      text: "Dark mode"
    }))
  } else {
    const theme = JSON.parse(localStorage.getItem("theme"));
    setTheme(theme);
  }


})()


const switchThemeCheckbox = findElementByClass("switch-checkbox");
switchThemeCheckbox.addEventListener("click", () => {
  const theme = JSON.parse(localStorage.getItem("theme"));

  if (theme.theme === "") {
    theme.theme = "light-theme";
    theme.isChecked = true;
    theme.text = "Light mode";

    setTheme(theme);
    localStorage.setItem("theme", JSON.stringify(theme));
  } else {
    theme.theme = "";
    theme.isChecked = false;
    theme.text = "Dark mode";

    localStorage.setItem("theme", JSON.stringify(theme));
    setTheme(theme);
  }
})


const formSearch = findElementByClass("search-form");

formSearch.addEventListener("submit", e => {
  e.preventDefault();

  const inputCity = formSearch.elements.city.value;

  updateWeather(getElements(), inputCity)
  formSearch.reset();

})

const getLocationBtn = document.querySelector(".location-btn")
getLocationBtn.addEventListener('click', () => {
  updateWeather(getElements());

})






