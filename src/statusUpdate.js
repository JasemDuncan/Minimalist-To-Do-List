export function statusUpdate(arr, index) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].index === index) {
      arr[i].completed = !arr[i].completed;
    }
  }
  return arr;
}

export default statusUpdate;