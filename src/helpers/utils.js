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
    Number(parseFloat(time * user.drug_production_rate).toFixed(2));
  let weapons =
    user.weapons_balance +
    Number(parseFloat(time * user.weapon_production_rate).toFixed(2));
  let alcohols =
    user.alcohols_balance +
    Number(parseFloat(time * user.alcohol_production_rate).toFixed(2));
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

const unitValues = (unit, trainings) => {
  let attack = unit.attack;
  let defense = unit.defense;
  const health = unit.health;

  const protection = trainings.find(b => b.training === 'protection');
  const giant = trainings.find(b => b.training === 'giant');
  if (protection) unit.defense = defense + (unit.defense / 200) * protection.lvl;
  if (giant) unit.health = health + (unit.health / 200) * giant.lvl;
  if (unit.type === 'Melee') {
    const closecombat = trainings.find(b => b.training === 'closecombat');
    if (closecombat) attack += (unit.attack / 100) * closecombat.lvl;
  } else {
    const firearms = trainings.find(b => b.training === 'firearms');
    if (firearms) {
      attack += (unit.attack / 100) * firearms.lvl;
    }
  }

  // HOBO
  if (unit.id === 'hobo') {
    const kamikaze = trainings.find(b => b.training === 'spiritwine');
    if (kamikaze) attack += (unit.attack / 100) * kamikaze.lvl;
  }

  // SNIPER
  if (unit.id === 'sniper') {
    const sniping = trainings.find(b => b.training === 'sniping');
    if (sniping) attack += (unit.attack / 100) * sniping.lvl;
  }

  // BAZOOKA
  if (unit.id === 'bazooka') {
    const bomb = trainings.find(b => b.training === 'bomb');
    if (bomb) attack += (unit.attack / 100) * bomb.lvl;
  }

  // WEAPON
  if (unit.id === 'rowdy' || unit.id === 'sniper' || unit.id === 'hitman') {
    const firearms = trainings.find(b => b.training === 'weapon');
    if (firearms) {
      attack += (unit.attack / 100) * firearms.lvl;
    }
  }

  // FIRE
  if (unit.id === 'bazooka' || unit.id === 'gunman') {
    const fire = trainings.find(b => b.training === 'fire');
    if (fire) attack += (unit.attack / 100) * fire.lvl;
  }

  // CHEMICAL
  if (unit.id === 'mercenary' || unit.id === 'knifer') {
    const chemical = trainings.find(b => b.training === 'chemical');
    if (chemical) attack += (unit.attack / 100) * chemical.lvl;
  }

  // ELITE
  if (
    unit.id === 'mercenary' ||
    unit.id === 'knifer' ||
    unit.id === 'big_mama' ||
    unit.id === 'ninja'
  ) {
    const psychological = trainings.find(b => b.training === 'psychological');
    if (psychological) {
      attack += (unit.attack / 200) * psychological.lvl;
      defense += (unit.defense / 200) * psychological.lvl;
    }
  }
  const values = {
    attack: parseFloat(attack).toFixed(0),
    defense: parseFloat(defense).toFixed(0),
    health,
  };
  return values;
};

export { isElectron, isWeb, jsonParse, getBalances, unitValues };
