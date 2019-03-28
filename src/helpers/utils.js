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
  let drugs = 0;
  let weapons = 0;
  let alcohols = 0;
  if (user.pending_drugs || user.pending_weapons || user.pending_alcohol) {
    drugs = user.pending_drugs + Number(parseFloat(time * user.drug_production_rate).toFixed(2));
    weapons =
      user.pending_weapons + Number(parseFloat(time * user.weapon_production_rate).toFixed(2));
    alcohols =
      user.pending_alcohol + Number(parseFloat(time * user.alcohol_production_rate).toFixed(2));
  } else {
    drugs = user.drugs_balance + Number(parseFloat(time * user.drug_production_rate).toFixed(2));
    weapons =
      user.weapons_balance + Number(parseFloat(time * user.weapon_production_rate).toFixed(2));
    alcohols =
      user.alcohols_balance + Number(parseFloat(time * user.alcohol_production_rate).toFixed(2));
  }
  if (ocLvl > 0) {
    drugs += (ocLvl + time * user.drug_production_rate) * 0.005;
    weapons += (ocLvl + time * user.weapon_production_rate) * 0.005;
    alcohols += (ocLvl + time * user.alcohol_production_rate) * 0.005;
  }
  return {
    drugs: drugs > user.drug_storage ? user.drug_storage : drugs,
    weapons: weapons > user.weapon_storage ? user.weapon_storage : weapons,
    alcohols: alcohols > user.alcohol_storage ? user.alcohol_storage : alcohols,
  };
};

export { isElectron, isWeb, jsonParse, getBalances };
