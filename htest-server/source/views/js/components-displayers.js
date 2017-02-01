//
// Display/clear html elements into/from GUI
//

/* eslint-disable no-unused-vars, no-undef */

function setInnerContent(id, content) {
  const element = document.getElementById(id);

  element.innerHTML = content;
  return element;
}

function clearPage() {
  return setInnerContent('page-wrapper-fluid', '');
}

function displayPageTitle(inputTitle) {
  const pageWrapper = document.getElementById('page-wrapper-fluid');
  const pageTitle = create('pageTitle', { title: inputTitle });

  pageWrapper.appendChild(pageTitle);
}

function displaySubSection(subSection) {
  const pageWrapper = document.getElementById('page-wrapper-fluid');

  pageWrapper.appendChild(subSection);
}

function replaceAlert(id, newAlert) {
  const currentAlert = document.getElementById(id);

  currentAlert.setAttribute('class', newAlert.getAttribute('class'));
  return setInnerContent(id, newAlert.innerHTML);
}

function replaceSelector(id, newSelector) {
  const currentSelector = document.getElementById(id);

  return setInnerContent(id, newSelector.innerHTML);
}

function updateFieldsetState(id, disabled) {
  const fieldset = document.getElementById(id);

  if (disabled) {
    fieldset.setAttribute('disabled', '');
  } else {
    fieldset.removeAttribute('disabled');
  }
}
