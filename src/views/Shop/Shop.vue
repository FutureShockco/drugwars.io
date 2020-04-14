<template>
    <div>
        <ShopTabs/>
        <div class="p-2 text-center anim-fade-in">
            <h2>DEALER SHOP</h2>
            <div class="columns">
                <ShopItem v-for="item in items" :item="item" :key="item.name" :price="item.price" />
            </div>
        </div>
    </div>
</template>


<script>
import { shop } from 'drugwars';

export default {
  data() {
    return {
      items: [
        {
          icon: 'shield',
          name: 'shield',
          type: '48 hours',
          price: 100,
          desc: 'The shield will protect you from any attacks.',
          enabled:true,
        },
        {
          icon: 'machine_gun',
          name: 'booster',
          type: '48 hours',
          price: 100,
          desc: 'This will double your overall production.',
          enabled:true,
        },
        // {icon:"shield",name:"free jobs",type:"48 hours",price:100,desc:"This will double the limit of your daily jobs."},
        // {icon:"shield",name:"defense pass",type:"48 hours",price:100,desc:"With this pass, you will only lose 50% of your units when attacked."},
        // {icon:"shield",name:"small army surgery",type:"1 time use",price:100,desc:"With this pass, you will only lose 50% of your units when attacking (up to 5000 units)."},
        // {icon:"shield",name:"middle army surgery",type:"1 time use",price:100,desc:"With this pass, you will only lose 50% of your units when attacking (up to 10000 units)."},
        // {icon:"shield",name:"large army surgery",type:"1 time use",price:100,desc:"With this pass, you will only lose 50% of your units when attacking (up to 20000 units)."},
        //  {icon:"shield",name:"prestigitator",type:"48 hours",price:100,desc:"With this pass, you will double your prestige gain."},
        //  {icon:"shield",name:"crazy fighter",type:"48 hours",price:100,desc:"With this pass, you will pay twice less your actions."}
      ],
    };
  },
};
</script>

<style scoped lang="less">
</style>
