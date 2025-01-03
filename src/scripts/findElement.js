export function findElementByClass(element, parentElement = document) {
  return parentElement.querySelector(`.${element}`);
}