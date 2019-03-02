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
  if (!amount) {
    return 0;
  }
  return level
    ? (amount * (level + 1 * (level + 1) * (2 * (level + 1)))) / 5
    : ((amount * 2) / 5) * 2.5;
}

function calculateTimeToBuild(id, coeff, level, hqLevel) {
  return id === 'headquarters'
    ? 2500 * ((Math.sqrt(625 + 100 * (level * 250)) - 25) / 50) * 1000
    : ((coeff * 2000 * ((Math.sqrt(625 + 100 * (level * 250)) - 25) / 50)) / hqLevel) * 1000;
}

function calculateTimeToRecruit(coeff, level, amount) {
  return ((coeff * 80)-(level*10/100) * amount) *1000
}

export {
  isElectron,
  isWeb,
  jsonParse,
  calculateBuildingCost,
  calculateTimeToBuild,
  calculateTimeToRecruit,
};
