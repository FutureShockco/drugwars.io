const isElectron = () => navigator.userAgent.toLowerCase().indexOf('electron') > -1;

const isWeb = () => !isElectron();

function jsonParse(input) {
  try {
    return JSON.parse(input);
  } catch (err) {
    return {};
  }
}

const getBalances = (user, ocLvl, timestamp) => {
  const time = (timestamp - new Date(user.last_update).getTime()) / 1000;
  let drugs =
    (user.drugs_balance -
    user.drugs_pending) +
    Number(parseFloat(time * user.drug_production_rate).toFixed(2));
  let weapons =
    (user.weapons_balance -
    user.weapons_pending) +
    Number(parseFloat(time * user.weapon_production_rate).toFixed(2));
  let alcohols =
    (user.alcohols_balance -
    user.alcohols_pending) +
    Number(parseFloat(time * user.alcohol_production_rate).toFixed(2));
  if (ocLvl > 0) {
    drugs += (ocLvl + time * user.drug_production_rate) * 0.005;
    weapons += (ocLvl + time * user.weapon_production_rate) * 0.005;
    alcohols += (ocLvl + time * user.alcohol_production_rate) * 0.005;
  }
  return {
    drugs: drugs > user.drug_storage ? user.drug_storage : parseFloat(drugs).toFixed(0),
    weapons: weapons > user.weapon_storage ? user.weapon_storage : parseFloat(weapons).toFixed(0),
    alcohols:
      alcohols > user.alcohol_storage ? user.alcohol_storage : parseFloat(alcohols).toFixed(0),
  };
};

export { isElectron, isWeb, jsonParse, getBalances };
