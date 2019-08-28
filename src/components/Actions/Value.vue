<template>
	<div>
		<div v-if="!lose">
			<span>
				Supply:
				{{result.supply}} |
			</span>
			<span>
				Power:
				{{result.power}} |
			</span>
			<span>
				Size:
				{{result.size}}
			</span>
		</div>
		<div>
			<div v-if="lose">
				Value of losses:
				<div v-if="result.cost.drug_cost">DRUGS: <span class="text-red">{{lose.cost.drug_cost-result.cost.drug_cost | amount}}</span></div>
				<div v-if="result.cost.weapon_cost">WEAPONS: <span class="text-red">{{lose.cost.weapon_cost-result.cost.weapon_cost | amount}}</span></div>
				<div v-if="result.cost.alcohol_cost">ALCOHOL: <span class="text-red">{{lose.cost.alcohol_cost-result.cost.alcohol_cost | amount}}</span></div>
			</div>
			<div v-else>
				Value:
				<div v-if="result.cost.drug_cost">DRUGS: {{result.cost.drug_cost | amount}}</div>
				<div v-if="result.cost.weapon_cost">WEAPONS: {{result.cost.weapon_cost | amount}}</div>
				<div v-if="result.cost.alcohol_cost">ALCOHOL: {{result.cost.alcohol_cost | amount}}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  props: ['result', 'lose'],
};
</script>
