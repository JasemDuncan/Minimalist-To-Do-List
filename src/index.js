import './style.css';
import * as aux from './statusUpdate';
import {
  AddNewTask, ClearAllCompleted, DeleteTask, UpdateTaskDescription,
} from './crud';

const arrObjTask = [];

function ReorderTask(arrObjTask) {
  return arrObjTask.sort((a, b) => ((a.index > b.index) ? 1 : -1));
}

const arrObjTaskReorder = ReorderTask(arrObjTask);

function saveLocalStorage(arrToSave) {
  window.localStorage.setItem('MinimalistToDoList', JSON.stringify(arrToSave));
}

function loadLocalStorage() {
  return JSON.parse(window.localStorage.getItem('MinimalistToDoList'));
}

function loadTask(arr) {
  const ulTask = document.getElementById('ulTask');

  const lsTaskInsert = document.createElement('li');
  lsTaskInsert.classList = 'list-group-item';
  lsTaskInsert.id = 'idlsTaskInsert';
  ulTask.appendChild(lsTaskInsert);

  const itemGroupInsert = document.createElement('div');
  itemGroupInsert.classList = 'input-group';
  lsTaskInsert.appendChild(itemGroupInsert);

  const txtTaskName = document.createElement('input');
  txtTaskName.classList = 'form-control fw-lighter';
  txtTaskName.id = 'txtTaskName';
  txtTaskName.placeholder = 'Add to your list ...';

  txtTaskName.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const newRowTask = AddNewTask(txtTaskName.value, loadLocalStorage());
      saveLocalStorage(newRowTask);
      const myChilds = window.document.getElementById('ulTask');
      myChilds.innerHTML = `
      <div class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">Today's To Do</h5>                          
        </div>                       
      </div>`;
      loadTask(loadLocalStorage(newRowTask));
    }
  });
  itemGroupInsert.appendChild(txtTaskName);

  const btnInsertTask = document.createElement('button');
  btnInsertTask.classList = 'btn btn-outline-secondary';
  btnInsertTask.id = 'btnInsertTask';
  btnInsertTask.addEventListener('click', () => {
    const newRowTask = AddNewTask(txtTaskName.value, loadLocalStorage());
    saveLocalStorage(newRowTask);
    const myChilds = window.document.getElementById('ulTask');
    myChilds.innerHTML = `
    <div class="list-group-item list-group-item-action">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">Today's To Do</h5>                          
      </div>                       
    </div>`;
    loadTask(loadLocalStorage(newRowTask));
  });

  itemGroupInsert.appendChild(btnInsertTask);

  const iconInsert = document.createElement('i');
  iconInsert.classList = 'bi bi-arrow-down';
  btnInsertTask.appendChild(iconInsert);

  for (let i = 0; i < arr.length; i += 1) {
    const lsTask = document.createElement('li');
    lsTask.classList = 'list-group-item';
    lsTask.id = arr[i].index;

    const itemGroup = document.createElement('div');
    itemGroup.classList = 'input-group';

    const itemGroupText = document.createElement('div');
    itemGroupText.classList = 'input-group-text';

    const chkCompleted = document.createElement('input');
    chkCompleted.type = 'checkbox';
    chkCompleted.checked = arr[i].completed;
    chkCompleted.classList = 'form-check-input mt-0';

    const txtDescription = document.createElement('input');
    txtDescription.value = arr[i].description;
    txtDescription.classList = 'form-control';

    chkCompleted.addEventListener('change', () => {
      const arrAux = aux.statusUpdate(arr, arr[i].index);
      saveLocalStorage(arrAux);

      if (arr[i].completed) {
        txtDescription.classList = 'line-through form-control';
      } else {
        txtDescription.classList = 'form-control';
      }
    });

    txtDescription.addEventListener('input', () => {
      const arrAux2 = UpdateTaskDescription(txtDescription.value, arr, arr[i].index);
      saveLocalStorage(arrAux2);
    });

    if (arr[i].completed) {
      txtDescription.classList = 'line-through form-control';
    } else {
      txtDescription.classList = 'form-control';
    }

    const btnDeleteItem = document.createElement('button');
    btnDeleteItem.classList = 'btn btn-outline-secondary';

    const iconTrash = document.createElement('i');
    iconTrash.classList = 'bi bi-trash';

    btnDeleteItem.addEventListener('click', () => {
      const arrAux3 = DeleteTask(arr[i].index, arr);
      saveLocalStorage(arrAux3);
      const myChilds = window.document.getElementById('ulTask');
      myChilds.innerHTML = `
      <div class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">Today's To Do</h5>                          
        </div>                       
      </div>`;
      loadTask(loadLocalStorage(arrAux3));
    });

    lsTask.appendChild(itemGroup);
    itemGroup.appendChild(itemGroupText);
    itemGroupText.appendChild(chkCompleted);
    itemGroup.appendChild(txtDescription);
    itemGroup.appendChild(btnDeleteItem);
    btnDeleteItem.appendChild(iconTrash);

    document.getElementById('ulTask').appendChild(lsTask);
    txtTaskName.focus();
  }

  const btnDelete = document.createElement('button');
  btnDelete.classList = 'btn btn-outline-secondary';
  btnDelete.innerHTML = 'Clear all completed ';

  btnDelete.addEventListener('click', () => {
    const arrAux4 = ClearAllCompleted(arr);
    saveLocalStorage(arrAux4);
    const myChilds = window.document.getElementById('ulTask');
    myChilds.innerHTML = `
    <div class="list-group-item list-group-item-action">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">Today's To Do</h5>                          
      </div>                       
    </div>`;

    loadTask(loadLocalStorage(arrAux4));
  });

  ulTask.appendChild(btnDelete);
}

function checkLocalStorage() {
  return JSON.parse(window.localStorage.getItem('MinimalistToDoList'));
}

window.onload = () => {
  if (checkLocalStorage()) {
    const arrOTRLS = loadLocalStorage();
    const arrOTRLS2 = ReorderTask(arrOTRLS);
    loadTask(arrOTRLS2);
  } else {
    saveLocalStorage(arrObjTaskReorder);
    loadTask(arrObjTaskReorder);
  }
};