//
// Create and return html elements
//

function createButton(params) {
  const button = document.createElement('button');

  button.setAttribute('type', 'button');
  button.setAttribute('class', params.class);
  if (params.id) {
    button.setAttribute('id', params.id);
  }
  button.appendChild(document.createTextNode(params.text));
  button.addEventListener('click', params.onClick, false);
  return button;
}

function createTable(params) {
  const table = document.createElement('table');
  const tableHead = document.createElement('thead');
  const headItems = document.createElement('tr');
  const tableBody = document.createElement('tbody');
  let item;

  table.setAttribute('class', 'table table-hover');

  // table head
  params.tableHeadContent.forEach((cell) => {
    item = document.createElement('th');
    item.appendChild(document.createTextNode(cell));
    headItems.appendChild(item);
  });
  tableHead.appendChild(headItems);
  table.appendChild(tableHead);

  // table body
  params.tableContent.forEach((line) => {
    const tableLine = document.createElement('tr');
    line.forEach((cell) => {
      item = document.createElement('td');
      item.appendChild(cell);
      tableLine.appendChild(item);
    });
    tableBody.appendChild(tableLine);
  });
  table.appendChild(tableBody);
  return table;
}

function createPageTitle(params) {
  const titleWrapper1 = document.createElement('div');
  const titleWrapper2 = document.createElement('div');
  const title = document.createElement('h1');

  titleWrapper1.setAttribute('class', 'row');
  titleWrapper2.setAttribute('class', 'col-lg-12');
  title.setAttribute('class', 'page-header');
  title.appendChild(document.createTextNode(params.title));
  titleWrapper2.appendChild(title);
  titleWrapper1.appendChild(titleWrapper2);
  return titleWrapper1;
}

function createSubSection(params) {
  const sectionWrapper = document.createElement('div');
  const titleWrapper = document.createElement('div');
  const title = document.createElement('h2');

  title.appendChild(document.createTextNode(params.title));
  titleWrapper.setAttribute('class', 'page-header');
  sectionWrapper.setAttribute('class', 'table-responsive');
  if (params.id) {
    sectionWrapper.setAttribute('id', params.id);
  }
  titleWrapper.appendChild(title);
  sectionWrapper.appendChild(titleWrapper);
  return sectionWrapper;
}

function createTextInput(params) {
  const textInputWrapper = document.createElement('div');
  const textInputTitle = document.createElement('label');
  const textInput = document.createElement('input');

  textInputWrapper.setAttribute('class', 'form-group');
  textInput.setAttribute('class', 'form-control');
  if (params.id) {
    textInput.setAttribute('id', params.id);
  }
  if (params.onBlur) {
    textInput.addEventListener('blur', params.onBlur, true);
  }
  textInputTitle.appendChild(document.createTextNode(params.title));
  textInputWrapper.appendChild(textInputTitle);
  if (params.helpMsg) {
    textInput.setAttribute('placeholder', params.helpMsg);
  }
  textInputWrapper.appendChild(textInput);
  return textInputWrapper;
}

function createFileInput(params) {
  const fileInputWrapper = document.createElement('div');
  const fileInputTitle = document.createElement('label');
  const fileInput = document.createElement('input');

  fileInputWrapper.setAttribute('class', 'form-group');
  fileInput.setAttribute('type', 'file');
  if (params.id) {
    fileInput.setAttribute('id', params.id);
  }
  fileInputTitle.appendChild(document.createTextNode(params.title));
  fileInputWrapper.appendChild(fileInputTitle);
  fileInputWrapper.appendChild(fileInput);
  return fileInputWrapper;
}

function createAlert(params) {
  const alertWrapper = document.createElement('div');
  const alertTitle = document.createElement('strong');

  alertWrapper.setAttribute('class', `alert alert-${params.status}`);
  if (params.id) {
    alertWrapper.setAttribute('id', params.id);
  }
  alertTitle.appendChild(document.createTextNode(`${params.title} `));
  alertWrapper.appendChild(alertTitle);
  alertWrapper.appendChild(document.createTextNode(params.msg));
  return alertWrapper;
}

function createFieldset(params) {
  const fieldset = document.createElement('fieldset');

  if (params.fields) {
    params.fields.forEach((field) => {
      fieldset.appendChild(field);
    });
  }
  if (params.disabled) {
    fieldset.setAttribute('disabled', '');
  }
  if (params.id) {
    fieldset.setAttribute('id', params.id);
  }
  return fieldset;
}

function create(element, parameters) { // eslint-disable-line no-unused-vars
  const createFunctions = {
    button: createButton,
    table: createTable,
    pageTitle: createPageTitle,
    subSection: createSubSection,
    textInput: createTextInput,
    fileInput: createFileInput,
    alert: createAlert,
    fieldset: createFieldset,
  };

  if (createFunctions[element]) {
    return createFunctions[element](parameters);
  }
  return null;
}
