export function makeCbStructure(array, parameter) {
  let temp = array.map((n1) => ({
    id: n1.id,
    val: n1.val,
    isSelected: false,
  }));
  let cnames = parameter.split(",");
  for (let i = 0; i < cnames.length; i++) {
    let obj = temp.find((n1) => n1.val === cnames[i]);
    if (obj) obj.isSelected = true;
  }
  return temp;
}

export default {
  makeCbStructure,
};
