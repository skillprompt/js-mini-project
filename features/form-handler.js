import { renderData } from "./render-data";
import { saveData } from "./save-data";

console.log("working...");

const showBtnElement = document.getElementById("show_form_btn");
const fieldSetElement = document.getElementById("form_fieldset");

const form = document.getElementById("form");

// add event listener
showBtnElement.addEventListener("click", function onClick(event) {
  // form hide/show
  const fieldSetDisplayStatus = fieldSetElement.style.display;

  if (fieldSetDisplayStatus === "block") {
    fieldSetElement.style.display = "none";
    // show the button name as 'Show Form'
    showBtnElement.innerText = "Show Form";
  } else {
    fieldSetElement.style.display = "block";
    // show the button name as "Hide Form"
    showBtnElement.innerText = "Hide Form";
  }
});

/**
 * 2. Push data into an array
 */
// example data structure
// const links = [
//   {
//     title: "Google",
//     link: "https://www.google.com",
//   },

//   {
//     title: "Facebook",
//     link: "https://www.facebook.com",
//   },
// ];
const links = [];

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevents the form from auto submitting

    // save the data
    saveData(links);
    renderData(links);
  });
}

/**
 * 3. event listener on the enter button
 */
if (form) {
  form.addEventListener("keyup", (event) => {
    event.preventDefault();

    if (event.key === "Enter") {
      // save the data
      saveData(links);
      renderData(links);
    }
  });
}

// !FIXME: There is bug when we press enter on the submit button. The form is getting submitted twice.
