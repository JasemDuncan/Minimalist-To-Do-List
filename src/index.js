import { orderBy } from 'lodash';
import './style.css';

const arrObjTask=[
    {
      description: "wash the dishes",
      completed: true,
      index: 3,
    },
    {
      description: "complete to do list PR",
      completed: false,
      index: 1,
    },
    {
      description: "wash my clothes",
      completed: false,
      index: 2,
    }
];


function loadTask(arr){
    const ulTask=document.getElementById('ulTask');
    
    const lsTaskInsert= document.createElement('li');
    lsTaskInsert.classList="list-group-item";    
    ulTask.appendChild(lsTaskInsert);

    const itemGroupInsert=document.createElement('div');
    itemGroupInsert.classList="input-group";
    lsTaskInsert.appendChild(itemGroupInsert);

    const txtTaskName=document.createElement('input');
    txtTaskName.classList="form-control fw-lighter";
    txtTaskName.placeholder="Add to your list ...";
    itemGroupInsert.appendChild(txtTaskName);

    const btnInsertTask=document.createElement('button');
    btnInsertTask.classList="btn btn-outline-secondary";    
    itemGroupInsert.appendChild(btnInsertTask);

    const iconInsert=document.createElement('i');
    iconInsert.classList="bi bi-arrow-down";
    btnInsertTask.appendChild(iconInsert);

    
    
    for(let i=0; i < arr.length; i++){
      const lsTask= document.createElement('li');
      lsTask.classList="list-group-item";
      
      const itemGroup=document.createElement('div');
      itemGroup.classList="input-group";

      const itemGroupText=document.createElement('div');
      itemGroupText.classList="input-group-text";
      
      const chkCompleted=document.createElement('input');
      chkCompleted.type="checkbox";      
      chkCompleted.checked=arr[i].completed;
      chkCompleted.classList="form-check-input mt-0";
      

      const txtDescription=document.createElement('input');
      txtDescription.value=arr[i].description;
      txtDescription.classList="form-control"

      const btnDeleteItem=document.createElement('button');      
      btnDeleteItem.classList="btn btn-outline-secondary";

      const iconTrash=document.createElement('i');
      iconTrash.classList="bi bi-trash"
  
      lsTask.appendChild(itemGroup);
      itemGroup.appendChild(itemGroupText);
      itemGroupText.appendChild(chkCompleted);
      itemGroup.appendChild(txtDescription);
      itemGroup.appendChild(btnDeleteItem);
      btnDeleteItem.appendChild(iconTrash);
      
      document.getElementById('ulTask').appendChild(lsTask);
      
    };

    const btnDelete=document.createElement('button');
    btnDelete.classList="btn btn-outline-secondary";
    btnDelete.innerHTML="Clear all completed ";
    
    
    ulTask.appendChild(btnDelete);
};


function ReorderTask(arrObjTask ){
  return _.sortBy(arrObjTask, 'index');
};

const arrObjTaskReorder=ReorderTask(arrObjTask);


loadTask(arrObjTaskReorder);
