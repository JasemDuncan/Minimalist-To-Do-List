export function AddNewTask(txtTaskName, arr) {
  for (let x = 0; x < arr.length; x += 1) {
    arr[x].index = x + 1;
  }
  let nextIndex = 0;
  if (arr.length === 0) {
    nextIndex = 1;
  } else {
    nextIndex = Math.max(...arr.map((o) => o.index)) + 1;
  }
  arr.push(
    {
      description: txtTaskName,
      completed: false,
      index: nextIndex,

    },
  );
  return arr;
}

export function DeleteTask(index, arr) {
  for (let k = 0; k < arr.length; k += 1) {
    if (arr[k].index === index) {
      arr.splice(k, 1);
    }
  }
  for (let x = 0; x < arr.length; x += 1) {
    arr[x].index = x + 1;
  }
  return arr;
}

export function UpdateTaskDescription(text, arr, index) {
  for (let j = 0; j < arr.length; j += 1) {
    if (arr[j].index === index) {
      arr[j].description = text;
    }
  }
  return arr;
}

export function ClearAllCompleted(arr) {
  const newArr = arr.filter((e) => e.completed === false);

  for (let x = 0; x < newArr.length; x += 1) {
    newArr[x].index = x + 1;
  }

  return newArr;
}