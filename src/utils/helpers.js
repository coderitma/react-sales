const itemIsDuplicatedInArrayObject = (item, by, array) => {
  let isDuplicate = false;
  for (let obj of array) {
    if (item[by] === obj[by]) {
      isDuplicate = true;
    }
  }

  return isDuplicate;
};

const helperReadableDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let d = new Date(Date.parse(date));
  return d.toLocaleDateString("id-ID", {
    timeZone: "Asia/Jakarta",
    ...options,
  });
};

const helperReadableCurrency = (num) => {
  let n = parseInt(num).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return n;
};

export {
  itemIsDuplicatedInArrayObject,
  helperReadableDate,
  helperReadableCurrency,
};
