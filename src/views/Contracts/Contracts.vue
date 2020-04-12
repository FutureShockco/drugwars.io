<template>
  <div>
    <ContractsTabs/>
    <div v-for="contract in contracts" :key="contract" class="item width-full  text-center border-bottom">
      {{contract}}
    		 <Avatar 
          class="mx-2"
            :size="40"
            :username="contract.nickname"
            :picture="contract.picture"
          />
          <h5 class="text-center name mt-1 pt-1 ">
            {{contract.nickname}} 
          </h5>
              <ul class="columns list-style-none user-balances ">
                          <h5 class="text-center">
           Total Pledged
          </h5>
      <li class="column col-3">
        <Icon name="drug"/>
        <div class="text-red">
          <div>{{ contract.drug | amount }}</div>
        </div>
      </li>
      <li class="column col-3">
        <Icon name="weapon"/>
        <div class="text-red">
          <div>{{ contract.weapon | amount }}</div>
        </div>
      </li>
      <li class="column col-3">
        <Icon name="alcohol"/>
        <div class="text-red">
          <div>{{ contract.alcohol | amount }} </div>
        </div>
      </li>
      <li class="column col-3">
        <Icon name="dwd"/>
        <div class="text-red">
          <div>{{ contract.dwd | amount }} </div>
        </div>
      </li>
    </ul>
    <div>Supply to kill : {{ contract.supply | amount }} </div>
        <div v-for="contractor in contract.contractors" :key="contractor">Contractors : {{ contractor }} </div>
    </div>
  </div>
</template>

<script>
import client from '@/helpers/client';

export default {
  data() {
    return {
      isLoading: false,
      contracts: {},
    };
  },
  mounted() {
    this.isLoading = true;
    client.requestAsync('get_contracts', null).then(result => {
      result.forEach(element => {
        if (this.contracts[element.nickname]) {
          this.contracts[element.nickname].drug += element.drug;
          this.contracts[element.nickname].weapon += element.weapon;
          this.contracts[element.nickname].alcohol += element.alcohol;
          this.contracts[element.nickname].dwd += element.dwd;
          this.contracts[element.nickname].supply += element.supply;

          this.contracts[element.nickname].contractors.push(element.contractor);
        } else {
          this.contracts[element.nickname] = element;
          this.contracts[element.nickname].contractors = [];
          if (element.contractor)
            this.contracts[element.nickname].contractors.push(element.contractor);
        }
      });
      this.isLoading = false;
    });
  },
};
</script>
