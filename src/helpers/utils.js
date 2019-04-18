const isElectron = () => navigator.userAgent.toLowerCase().indexOf('electron') > -1;

const isWeb = () => !isElectron();

function jsonParse(input) {
  try {
    return JSON.parse(input);
  } catch (err) {
    return {};
  }
}

const getBalances = (user, ocLvl) => {
  const now = new Date();
  const time = (now.getTime() - new Date(user.last_update).getTime()) / 1000;
  let drugs =
    user.drugs_balance +
    Number(parseFloat(time * user.drug_production_rate).toFixed(2)) -
    user.drugs_pending;
  let weapons =
    user.weapons_balance +
    Number(parseFloat(time * user.weapon_production_rate).toFixed(2)) -
    user.weapons_pending;
  let alcohols =
    user.alcohols_balance +
    Number(parseFloat(time * user.alcohol_production_rate).toFixed(2)) -
    user.alcohols_pending;
  if (ocLvl > 0) {
    drugs += Number(parseFloat(time * user.drug_production_rate).toFixed(2) * (ocLvl * 0.005));
    weapons += Number(parseFloat(time * user.weapon_production_rate).toFixed(2) * (ocLvl * 0.005));
    alcohols += Number(
      parseFloat(time * user.alcohol_production_rate).toFixed(2) * (ocLvl * 0.005),
    );
  }
  return {
    drugs: drugs > user.drug_storage ? user.drug_storage : parseFloat(drugs).toFixed(0),
    weapons: weapons > user.weapon_storage ? user.weapon_storage : parseFloat(weapons).toFixed(0),
    alcohols:
      alcohols > user.alcohol_storage ? user.alcohol_storage : parseFloat(alcohols).toFixed(0),
  };
};

export { isElectron, isWeb, jsonParse, getBalances };
