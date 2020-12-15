import store from '@/store';
import axios from 'axios';
import Promise from 'bluebird';
import { buildings } from 'drugwars';
const isElectron = () => navigator.userAgent.toLowerCase().indexOf('electron') > -1;
const isWeb = () => !isElectron();

function jsonParse(input) {
  try {
    return JSON.parse(input);
  } catch (err) {
    return {};
  }
}

const calculateProductionRate = function (building_level, placeholder, multiplicator) {
  return ((placeholder.production_rate * multiplicator) * building_level * placeholder.coeff) + ((placeholder.production_rate * multiplicator) * building_level * placeholder.coeff) / 100 * building_level;
}

const calculateCap = function (building_level) {
  if (building_level)
    return 10000 + (18000 * building_level * (Math.sqrt(building_level) / 100)) * building_level;
  else return 10000
}

const getCapPerBase = (base) => {
  let drugCap = 10000
  let weaponCap = 10000
  let alcoholCap = 10000
  base.buildings.forEach(building => {
    if (buildings[building.name]) {
      if (buildings[building.name].id === 'drug_storage') {
        drugCap = calculateCap(building.level);
      }
      if (buildings[building.name].id === 'weapon_storage') {
        weaponCap = calculateCap(building.level);
      }
      if (buildings[building.name].id === 'alcohol_storage') {
        alcoholCap = calculateCap(building.level);
      }
    }
  })
  return {
    drug_storage: drugCap,
    weapon_storage: weaponCap,
    alcohol_storage: alcoholCap,
  };
}

const getProdPerBase = (base) => {
  let drugProd = 0
  let weaponProd = 0
  let alcoholProd = 0
  let multiplicator = 1;
  const date = new Date().getTime() / 1000;
  let booster = false;
  if (store.state.game.user.user.booster > 0) {
    booster = Number(store.state.game.user.user.booster) > Number(date);
  }
  if (booster)
    multiplicator = 2
  base.buildings.forEach(building => {
    if (buildings[building.name]) {
      if (buildings[building.name].production_type === 'drugs') {
        drugProd += calculateProductionRate(building.level, buildings[building.name], multiplicator);
      }
      if (buildings[building.name].production_type === 'weapons') {
        weaponProd += calculateProductionRate(building.level, buildings[building.name], multiplicator);
      }
      if (buildings[building.name].production_type === 'alcohol') {
        alcoholProd += calculateProductionRate(building.level, buildings[building.name], multiplicator);
      }
    }
  })
  return {
    drug_production_rate: drugProd,
    weapon_production_rate: weaponProd,
    alcohol_production_rate: alcoholProd,
  };
}

const getBalances = (base, ocLvl, labLvl, weaponLvl, aSchoolLvl) => {
  const now = new Date();
  let drugs = 0;
  let weapons = 0;
  let alcohols = 0;
  let drugCap = 10000
  let weaponCap = 10000
  let alcoholCap = 10000
  let multiplicator = 1;
  const date = new Date().getTime() / 1000;
  let booster = false;
  if (store.state.game.user.user.booster > 0) {
    booster = Number(store.state.game.user.user.booster) > Number(date);
  }
  if (booster)
    multiplicator = 2

  base.buildings.forEach(building => {
    if (buildings[building.name]) {
      const time = (now.getTime() - building.ts);
      if (buildings[building.name].production_type === 'drugs') {
        drugs += base.d + Number(parseFloat(time * (calculateProductionRate(building.level, buildings[building.name], multiplicator))).toFixed(2));
      }
      if (buildings[building.name].production_type === 'weapons') {
        weapons += base.w + Number(parseFloat(time * (calculateProductionRate(building.level, buildings[building.name], multiplicator))).toFixed(2));
      }
      if (buildings[building.name].production_type === 'alcohol') {
        alcohols += base.a + Number(parseFloat(time * (calculateProductionRate(building.level, buildings[building.name], multiplicator))).toFixed(2));
      }
      if (buildings[building.name].id === 'drug_storage') {
        drugCap = calculateCap(building.level);
      }
      if (buildings[building.name].id === 'weapon_storage') {
        weaponCap = calculateCap(building.level);
      }
      if (buildings[building.name].id === 'alcohol_storage') {
        alcoholCap = calculateCap(building.level);
      }
    }
  })

  return {
    drugs: drugs > drugCap ? drugCap : parseFloat(drugs).toFixed(3),
    weapons: weapons > weaponCap ? weaponCap : parseFloat(weapons).toFixed(3),
    alcohols: alcohols > alcoholCap ? alcoholCap : parseFloat(alcohols).toFixed(3),
  };
}

// return {
//   drugs: drugs > 10000 ? 10000 : parseFloat(drugs).toFixed(2),
//   weapons: weapons > 10000 ? 10000 : parseFloat(weapons).toFixed(2),
//   alcohols: alcohols > 10000 ? 10000 : parseFloat(alcohols).toFixed(2),
// };
// };

const unitValues = (unit, trainings) => {
  let attack = unit.attack;
  let defense = unit.defense;
  let health = unit.health;

  let protection = trainings.find(b => b.training === 'protection');
  let giant = trainings.find(b => b.training === 'giant');
  if (protection) unit.health = health + (unit.health / 100) * protection.lvl;
  if (giant) unit.health = health + (unit.health / 100) * giant.lvl; // eslint-disable-line no-param-reassign
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
    health: parseFloat(health).toFixed(0),
  };
  return values;
};

const loadDoc = (value) => {
  return new Promise((resolve, reject) => {
    var url = "https://raw.githubusercontent.com/FutureShockco/drugwars.doc/master/" + value + ".json";
    axios.get(url)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  })
}


export { isElectron, isWeb, jsonParse, getBalances, getProdPerBase, getCapPerBase, unitValues, loadDoc };
