const mappingData = data.numberOrder.split(', ');
let tmpOrder = [];
mappingData.map((value) => {
  let item = {
    orderNumber: value,
    image: '',
    uploaded: false,
  };
  tmpOrder.push(item);
});
setPoNumber(tmpOrder);


