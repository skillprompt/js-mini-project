console.log("working...");

const titleField = document.getElementById("title");
const linkField = document.getElementById("link");
const form_fieldset = document.getElementById("form_fieldset");

class Storage {
  #store = null; // private property: localstorage
  #parseData(data) {
    return JSON.parse(data);
  } // private method
  #stringifyData(data) {
    return JSON.stringify(data);
  } // private method

  constructor(store) {
    this.#store = store;
  }
  saveData(key, data) {
    const stringifyData = this.#stringifyData(data);
    this.#store.setItem(key, stringifyData);
  }
  getDataByKey(key) {
    return this.#parseData(this.#store.getItem(key));
  }
}

class DummyStorage {
  constructor() {}

  // there should be two methods:

  setItem(key, data) {
    console.log("setItem", key, data);
  }

  getItem(key) {
    console.log("getItem", key);
    return null;
  }
}
const dummyStorageInstance = new DummyStorage();

const myStorage = new Storage(localStorage);

class Link {
  // methods: functions
  // properties: variables inside the class

  static data = []; // property, static means it can be used before instantiating the class

  formElm = null; // property

  constructor(form, storage) {
    this.data = storage.getDataByKey("courses") || [];
    console.log("datta", this.data);
    this.formElm = form;
  } // method: special function, runs when the class is instantiated

  getRandomId() {
    const id = ((Math.random() + 1) * 100).toFixed(2);
    console.log("id", id);
    return id;
  } // method

  findById = (editId) => {
    const dataToEdit = this.data.find((item) => item.id === editId);
    return dataToEdit;
  }; // method

  add(link) {
    const id = this.getRandomId();
    this.data.push({ id, title: link.title, link: link.link });
    console.log("add..", link);
  } // method

  edit = (id, link) => {
    this.formElm.setEditingId(id);
    const dataToEdit = this.findById(id);
    this.formElm.setTitle(link.title);
    this.formElm.setLink(link.link);

    titleField.value = dataToEdit.title;
    linkField.value = dataToEdit.link;

    dataToEdit.title = link.title;
    dataToEdit.link = link.link;
  }; // method

  delete = (id, afterDelete) => {
    const dataToNotDeleted = this.data.filter((item) => item.id !== id);
    this.data = dataToNotDeleted;
    console.log("delete..", dataToNotDeleted);
    afterDelete();
  }; // method
}

class LinkForm {
  title = ""; // property
  link = ""; // property

  editingId = null; // property to add/edit

  formDisplayStyle = "none"; // property to toggle form display

  btnElement = ""; // id of the button that toggles the form

  constructor(btnElement) {
    this.btnElement = btnElement;
    form_fieldset.style.display = this.formDisplayStyle;
    this.btnElement.addEventListener("click", this.toggleButton);
  }

  // setters
  setTitle = (title) => {
    this.title = title;
  }; // setting the value of title

  setLink = (link) => {
    this.link = link;
  }; // setting the value of link

  setFormData = (title, link) => {
    console.log({ titleField, linkField, title, link });
    titleField.value = title;
    linkField.value = link;
  };

  setEditingId = (id) => {
    this.editingId = id;
  };

  // getters
  getEditingId = () => {
    return this.editingId;
  };

  toggleForm(displayStyle) {
    this.formDisplayStyle = displayStyle;
    form_fieldset.style.display = displayStyle;
  }

  changeButtonInnerText(text) {
    this.btnElement.innerText = text;
  }

  toggleButton = () => {
    if (this.formDisplayStyle === "none") {
      this.toggleForm("block");
      this.changeButtonInnerText("Hide form");
    } else {
      this.toggleForm("none");
      this.changeButtonInnerText("View form");
    }
  };
}

const btn = document.getElementById("add_btn");
const linkForm = new LinkForm(btn);
const links = new Link(linkForm, myStorage);

function renderData(data) {
  let markup = "";
  const dataContainer = document.getElementById("data");
  if (data.length) {
    dataContainer.style.display = "block";
  } else {
    dataContainer.style.display = "none";
  }

  data.forEach((item) => {
    markup += `
    <li>
    <h3>${item.title}</h3>
    <span>
      Link :
      <a href="${item.link}" target="_blank"
        >${item.link}</a
      >
    </span>
    <button class="editItemBtn" type="button" data-id="${item.id}">edit</button> 
    <button class="deleteItemBtn" type="button" data-id="${item.id}">delete</button>
 </li> `;
  });

  document.getElementById("data").innerHTML = markup;

  const editItemBtns = document.querySelectorAll(".editItemBtn");
  const title = document.getElementById("title").value;
  const link = document.getElementById("link").value;

  editItemBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.getAttribute("data-id");
      links.edit(id, {
        link,
        title,
      });
    });
  });

  const deleteItemBtns = document.querySelectorAll(".deleteItemBtn");
  deleteItemBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.getAttribute("data-id");
      links.delete(id, () => renderItems(links.data));
    });
  });
}

function renderItems(data) {
  renderData(data);
}
renderItems(links.data);

const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // prevents the form from auto submitting
  event.stopPropagation();
  const title = document.getElementById("title").value;
  const link = document.getElementById("link").value;
  const editingId = linkForm.getEditingId();
  const linkData = {
    title,
    link,
  };
  if (editingId) {
    links.edit(editingId, linkData);
    linkForm.setEditingId(null);
  } else {
    links.add(linkData);
  }

  myStorage.saveData("courses", links.data);
  renderItems(links.data);

  document.getElementById("title").value = "";
  document.getElementById("link").value = "";
});
