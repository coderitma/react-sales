const itemIsDuplicatedInArrayObject = (item, by, array) => {
  let isDuplicate = false;
  for (let obj of array) {
    if (item[by] === obj[by]) {
      isDuplicate = true;
    }
  }

  return isDuplicate;
};

export default {
  itemIsDuplicatedInArrayObject,
};
