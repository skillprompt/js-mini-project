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
console.log("before links", links);
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevents the form from auto submitting

    // Method 1: Using FormData
    // const formData = new FormData(event.target);
    // const title = formData.get("title");
    // const link = formData.get("link");

    // Method 2: Using DOM
    // select the input field
    const linkElement = document.getElementById("link");
    const titleElement = document.getElementById("title");

    // get the value from the input field
    const titleValue = titleElement.value;
    const linkValue = linkElement.value;

    // generate a unique id
    const uniqueId = new Date().getDate();

    // push the data into the array
    links.push({ id: uniqueId.toString(), title: titleValue, link: linkValue });

    console.log("after links", links);

    //  clear the form
    titleElement.value = "";
    linkElement.value = "";
  });
}
