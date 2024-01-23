import {
  addEventListenerToShowHideButton,
  addKeyUpEventListenerToForm,
  addSubmitEventListenerToForm,
} from "./modules/form-handler.js";

console.log("new app working...");

/**
 * add submit event
 * add keyup event
 * update ui
 * show/hide button
 * delete button
 * edit/update button
 */
addEventListenerToShowHideButton();
addSubmitEventListenerToForm();
addKeyUpEventListenerToForm();
