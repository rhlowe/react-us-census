export function sortObjects(data, key, reverseSort = false) {
  return data.sort((leftObj, rightObj) => {
    if (reverseSort) {
      return leftObj[key] < rightObj[key];
    }

    return leftObj[key] > rightObj[key];
  });
}