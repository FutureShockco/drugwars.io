const isElectron = () => navigator.userAgent.toLowerCase().indexOf('electron') > -1;

const isWeb = () => !isElectron();

function jsonParse(input) {
  try {
    return JSON.parse(input);
  } catch (err) {
    return {};
  }
}

const getBalances = (building, ocLvl, labLvl, weaponLvl, aSchoolLvl) => {
  const now = new Date();
  let drugs = 0;
  let weapons = 0;
  let alcohols = 0;
  if (building) {
    const time = (now.getTime() - new Date(Date.parse(building.last_update)).getTime()) / 1000;
    drugs =
      building.drug_balance + Number(parseFloat(time * building.drug_production_rate).toFixed(2));
    weapons =
      building.weapon_balance +
      Number(parseFloat(time * building.weapon_production_rate).toFixed(2));
    alcohols =
      building.alcohol_balance +
      Number(parseFloat(time * building.alcohol_production_rate).toFixed(2));
    if (ocLvl > 0) {
      drugs += Number(
        parseFloat(time * building.drug_production_rate).toFixed(2) * (ocLvl * 0.005),
      );
      weapons += Number(
        parseFloat(time * building.weapon_production_rate).toFixed(2) * (ocLvl * 0.005),
      );
      alcohols += Number(
        parseFloat(time * building.alcohol_production_rate).toFixed(2) * (ocLvl * 0.005),
      );
    }
    if (labLvl > 0) {
      drugs += Number(
        parseFloat(time * building.drug_production_rate).toFixed(2) * (labLvl * 0.0025),
      );
    }

    if (weaponLvl > 0) {
      weapons += Number(
        parseFloat(time * building.weapon_production_rate).toFixed(2) * (weaponLvl * 0.005),
      );
    }

    if (aSchoolLvl > 0) {
      alcohols += Number(
        parseFloat(time * building.alcohol_production_rate).toFixed(2) * (aSchoolLvl * 0.005),
      );
    }

    return {
      drugs: drugs > building.drug_storage ? building.drug_storage : parseFloat(drugs).toFixed(3),
      weapons:
        weapons > building.weapon_storage
          ? building.weapon_storage
          : parseFloat(weapons).toFixed(3),
      alcohols:
        alcohols > building.alcohol_storage
          ? building.alcohol_storage
          : parseFloat(alcohols).toFixed(3),
    };
  }
  return {
    drugs: drugs > 10000 ? 10000 : parseFloat(drugs).toFixed(2),
    weapons: weapons > 10000 ? 10000 : parseFloat(weapons).toFixed(2),
    alcohols: alcohols > 10000 ? 10000 : parseFloat(alcohols).toFixed(2),
  };
};

const unitValues = (unit, trainings) => {
  let attack = unit.attack;
  let defense = unit.defense;
  const health = unit.health;

  const protection = trainings.find(b => b.training === 'protection');
  const giant = trainings.find(b => b.training === 'giant');
  if (protection) unit.defense = defense + (unit.defense / 200) * protection.lvl;
  if (giant) unit.health = health + (unit.health / 200) * giant.lvl; // eslint-disable-line no-param-reassign
  if (unit.type === 'Melee') {
    const closecombat = trainings.find(b => b.training === 'closecombat');
    if (closecombat) attack += (unit.attack / 100) * closecombat.lvl; // eslint-disable-line no-param-reassign
  } else {
    const firearms = trainings.find(b => b.training === 'firearms');
    if (firearms) {
      attack += (unit.attack / 100) * firearms.lvl; // eslint-disable-line no-param-reassign
    }
  }

  // HOBO
  if (unit.id === 'hobo') {
    const kamikaze = trainings.find(b => b.training === 'spiritwine');
    if (kamikaze) attack += (unit.attack / 100) * kamikaze.lvl; // eslint-disable-line no-param-reassign
  }

  // SNIPER
  if (unit.id === 'sniper') {
    const sniping = trainings.find(b => b.training === 'sniping');
    if (sniping) attack += (unit.attack / 100) * sniping.lvl; // eslint-disable-line no-param-reassign
  }

  // BAZOOKA
  if (unit.id === 'bazooka') {
    const bomb = trainings.find(b => b.training === 'bomb');
    if (bomb) attack += (unit.attack / 100) * bomb.lvl; // eslint-disable-line no-param-reassign
  }

  // WEAPON
  if (unit.id === 'rowdy' || unit.id === 'sniper' || unit.id === 'hitman') {
    const firearms = trainings.find(b => b.training === 'weapon');
    if (firearms) {
      attack += (unit.attack / 100) * firearms.lvl; // eslint-disable-line no-param-reassign
    }
  }

  // FIRE
  if (unit.id === 'bazooka' || unit.id === 'gunman') {
    const fire = trainings.find(b => b.training === 'fire');
    if (fire) attack += (unit.attack / 100) * fire.lvl; // eslint-disable-line no-param-reassign
  }

  // CHEMICAL
  if (unit.id === 'mercenary' || unit.id === 'knifer') {
    const chemical = trainings.find(b => b.training === 'chemical');
    if (chemical) attack += (unit.attack / 100) * chemical.lvl; // eslint-disable-line no-param-reassign
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
      attack += (unit.attack / 200) * psychological.lvl; // eslint-disable-line no-param-reassign
      defense += (unit.defense / 200) * psychological.lvl; // eslint-disable-line no-param-reassign
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
