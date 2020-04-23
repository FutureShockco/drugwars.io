<template>
    <div>
        <BootcampTabs/>
        <div class="p-4 container-lg clearfix anim-fade-in text-center">
                        <h3 class="mb-0 mt-0">How it works</h3>
                        <h6 class="mb-0 mt-0">Units with lowest number get hit first at each round following this order.</h6>
            <h3 class="mb-0">Priority of units in fight</h3>
            <div class="units" >
               <ArmyByPriority :units="unitsByPriority" :disableicon="true" />
            </div>
                        <h6 class="mb-0 mt-0">Reminder : Knifers does not respect this.</h6>

            <h3 class="mb-0">Priority of npcs in fight</h3>
            <div class="units" >
               <ArmyByPriority :units="npcByPriority" :disableicon="true" />
            </div>
        </div>
    </div>
</template>

<script>
import { units } from 'drugwars';

export default {
  data() {
    return {
      units,
    };
  },
  computed: {
      unitsByPriority(){
          let allunits =[];
          for (let [key, value] of Object.entries(units)) {
                value.key = key
                if(!value.npc)
                allunits.push(value)
            }
          return allunits.sort((a, b) => a.priority - b.priority);
      },
      npcByPriority(){
          let allunits =[];
          for (let [key, value] of Object.entries(units)) {
                value.key = key
                if(value.npc)
                allunits.push(value)
            }
          return allunits.sort((a, b) => a.priority - b.priority);
      }
  },
};
</script>
