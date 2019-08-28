<template>
	<div class="columns width-full mt-3">
	
		<div class="column col-6">
			<h5 class="ml-2">OFFENSIVE</h5>
			<div class="column  item-skill text-center">
				<Icon :name="'skills/'+unit.dmg_type" size="32" />
				<h5>ATTACK </h5>
				<h5 class="mt-0 mb-0 skill-detail">{{modifiedValues.attack}}</h5>
			</div>
	
			<div class="column  item-skill text-center">
				<Icon name="skills/health" size="32" />
				<h5>HEALTH </h5>
				<h5 class="mt-0 mb-0 skill-detail">{{modifiedValues.health}}</h5>
			</div>
	
			<div class="column  item-skill text-center">
				<Icon name="skills/carry" size="32" />
				<h5>CARRY </h5>
				<h5 class="mt-0 mb-0 skill-detail">{{unit.capacity }}</h5>
			</div>
	
			<div class="column  item-skill text-center">
				<Icon name="skills/speed" size="32" />
				<h5>SPEED </h5>
				<h5 class="mt-0 mb-0 skill-detail">{{speed | ms }}</h5>
			</div>
	
		</div>
		<div class="column col-6">
			<h5 class="ml-2">RESISTANCE</h5>
			<div class="column  item-skill text-center">
				<Icon name="skills/physical" size="32" />
				<h5>PHYSICAL </h5>
				<h5 class="skill-detail">{{modifiedValues.defense}}</h5>
			</div>
	
			<div class="column  item-skill text-center">
				<Icon name="skills/weapon" size="32" />
				<h5>BULLET </h5>
				<h5 class="skill-detail">{{unit.weapon_defense}}</h5>
			</div>
	
			<div class="column  item-skill text-center">
				<Icon name="skills/fire" size="32" />
				<h5>FIRE </h5>
				<h5 class="skill-detail">{{unit.fire_defense}}</h5>
			</div>
	
			<div class="column  item-skill text-center">
				<Icon name="skills/chemical" size="32" />
				<h5>CHEMICAL </h5>
				<h5 class="skill-detail">{{unit.chemical_defense}}</h5>
			</div>
	
		</div>
	</div>
</template>

<script>
export default {
  props: ['unit', 'modifiedValues', 'speed'],
};
</script>


<style scoped lang="less">
.item-skill {
  background: rgba(0, 0, 0, 0.5);
  padding: 5px;
  border-radius: 5px;
  margin: 2px;
}

h5 {
  font-size: 13px;
  margin: 0px;
}

.column {
  font-size: 10px;
  padding: 5px;
}

.skill-detail {
  color: white;
}
</style>
