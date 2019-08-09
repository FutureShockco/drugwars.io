<template>
  <div>
    <ContractsTabs/>

    <div v-for="(contract, index) in contracts" :key="contract.id" class="item width-full  text-center border-bottom">
    		 <Avatar 
          class="mx-2"
            :size="40"
            :username="contract.nickname"
            :picture="contract.picture"
          />
          <h5 class="text-center name mt-1 pt-1 ">
            {{contract.nickname}}   {{index+1}} 
          </h5>
              <ul class="columns list-style-none user-balances ">
                          <h5 class="text-center">
           Total Pledged
          </h5>
      <li class="column col-3">
        <Icon name="drug"/>
        <div class="text-red">
          <div>{{ contract.drugs | amount }}</div>
        </div>
      </li>
      <li class="column col-3">
        <Icon name="weapon"/>
        <div class="text-red">
          <div>{{ contract.weapons | amount }}</div>
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
    </div>
  </div>
</template>

<script>
import client from '@/helpers/client';

export default {
  data() {
    return {
      isLoading: false,
      contracts: [],
    };
  },
  created() {
    this.isLoading = true;
    client.requestAsync('get_contracts', null).then(result => {
      this.contracts = result;
      this.isLoading = false;
    });
  },
};
</script>
