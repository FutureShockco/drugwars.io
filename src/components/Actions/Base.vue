<template>
    <div v-if="items">
        <div v-for="item in items" v-if="item.lvl !== 0" :key="item.building" class="d-block text-left">
            <div v-for="building in placeholder_buildings" :key="building.id">
                <BuildingProductionCompact v-if="building.id === item.building" :building="building" />
            </div>
        </div>
        <h5>
            <div>PRODUCTION PER DAY</div>
            {{total_drugs * 60 * 60 * 24 | amount}}
            <Icon name="drug" size="20" /> {{total_weapons * 60 * 60 * 24 | amount}}
            <Icon name="weapon" size="20" /> {{total_alcohol * 60 * 60 * 24 | amount}}
            <Icon name="alcohol" size="20" />
        </h5>
    </div>
</template>

<script>
import { buildings } from 'drugwars';

export default {
    props: ['items'],
    data() {
        return {
            placeholder_buildings: buildings,
        };
    },
    computed: {
        total_drugs() {
            let total_drugs = 0;
            this.items.forEach(element => {
                if (this.placeholder_buildings[element.building]) {
                    const b = this.placeholder_buildings[element.building]
                    if (element.lvl && b.production_rate && b.production_type === 'drugs')
                        total_drugs += (b.production_rate * Number(element.lvl) * b.coeff) + (b.production_rate * Number(element.lvl) * b.coeff) / 100 * Number(element.lvl);
                }
            })
            return total_drugs;
        },
        total_weapons() {
            let total_weapons = 0;
            this.items.forEach(element => {
                if (this.placeholder_buildings[element.building]) {
                    const b = this.placeholder_buildings[element.building]
                    console.log(b)
                    if (element.lvl && b.production_rate && b.production_type === 'weapons')
                        total_weapons += (b.production_rate * Number(element.lvl) * b.coeff) + (b.production_rate * Number(element.lvl) * b.coeff) / 100 * Number(element.lvl);
                }
            })
            return total_weapons;
        },
        total_alcohol() {
            let total_drugs = 0;
            this.items.forEach(element => {
                if (this.placeholder_buildings[element.building]) {
                    const b = this.placeholder_buildings[element.building]
                    if (element.lvl && b.production_rate && b.production_type === 'alcohol')
                        total_drugs += (b.production_rate * Number(element.lvl) * b.coeff) + (b.production_rate * Number(element.lvl) * b.coeff) / 100 * Number(element.lvl);
                }
            })
            return total_drugs;
        }
    }
};
</script>
