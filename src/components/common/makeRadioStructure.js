export function makeRadioStructure(array, perm) {
  let sportsRadio = {
    value: array,
    selected: perm,
  };
  return sportsRadio;
}

export default {
  makeRadioStructure,
};
