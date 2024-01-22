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

function saveData(linksArr = []) {
  // select the input field
  const linkElement = document.getElementById("link");
  const titleElement = document.getElementById("title");

  // get the value from the input field
  const titleValue = titleElement.value;
  const linkValue = linkElement.value;

  // generate a unique id
  const uniqueId = new Date().getTime();

  // push the data into the array
  linksArr.push({
    id: uniqueId.toString(),
    title: titleValue,
    link: linkValue,
  });

  console.log("after links", linksArr);

  //  clear the form
  titleElement.value = "";
  linkElement.value = "";
}

// !FIXME: There is bug when we press enter on the submit button. The form is getting submitted twice.

/**
 * 4. Render the data
 */

function renderData(linksArr = []) {
  const dataContainer = document.getElementById("data");

  if (linksArr.length) {
    dataContainer.style.display = "block";
  } else {
    dataContainer.style.display = "none";
  }

  // generate the markup
  let markup = "";

  linksArr
    .filter((link) => {
      if (link.title.length) {
        return true;
      } else {
        return false;
      }
    })
    .forEach((item) => {
      markup += `
      <li>
        <h3>${item.title}</h3>
        <span>
          Link :
          <a href="${item.link}" target="_blank">${item.link}</a>
        </span>
        <button onclick="editData(${item.id})">edit</button> 
        <button id="delete-btn" data-id="${item.id}" data-link="${item.link}" data-title="${item.title}" >delete</button>
      </li>
    `;
    });
  dataContainer.innerHTML = markup;

  const deleteBtnElements = document.querySelectorAll("#delete-btn");

  for (let i = 0; i < deleteBtnElements.length; i++) {
    const deleteBtnElement = deleteBtnElements[i];

    deleteBtnElement.addEventListener("click", (event) => {
      const dataToDeleteId = event.target.dataset.id;
      deleteData(dataToDeleteId);
    });
  }
}

/**
 * Edit and delete buttons
 * These buttons are added in renderData function.
 */
/**
 * functions required for edit and delete
 */
function editData(dataToEditId) {
  console.log("editing data id", dataToEditId);
}

function deleteData(dataToDeleteId) {
  const itemIndex = links.findIndex((link) => {
    if (link.id === dataToDeleteId.toString()) {
      return true;
    } else {
      return false;
    }
  });

  if (itemIndex > -1) {
    //  item exists
    // perform the delete operation
    links.splice(itemIndex, 1);
    renderData(links);
  } else {
    alert("item does not exist");
  }
}
