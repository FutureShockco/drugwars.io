const isElectron = () => navigator.userAgent.toLowerCase().indexOf('electron') > -1;

const isWeb = () => !isElectron();

function jsonParse(input) {
  try {
    return JSON.parse(input);
  } catch (err) {
    return {};
  }
}

function calculateBuildingCost(amount, level) {
  return !amount
    ? 0
    : level
      ? (amount * (level + 1 * (level + 1) * (2 * (level + 1)))) / 5
      : ((amount * 2) / 5) * 2.5;
}

export { isElectron, isWeb, jsonParse, calculateBuildingCost };
