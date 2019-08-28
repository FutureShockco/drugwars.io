<template>
    <div>
        <Header title="About" />
        <div class="p-4">
            <h2>{{ pkg.name }}</h2>
            <p v-if="pkg.description">{{ pkg.description }}</p>
            <p v-if="pkg.version[0] === '0'" class="text-red">
                Early access
            </p>
            <p>Version: {{ pkg.version }}</p>
            <p>
                <a href="/img/drugwars.svg" target="_blank">
              Download DrugWars logo 
            </a>
            </p>
            <p v-if="pkg.bugs">
                <a :href="pkg.bugs.url" target="_blank">
              Report a bug
            </a>
            </p>
            <div v-if="changelog.length > 0">
                <h3>Changelog</h3>
                <ul class="changelog">
                    <li :key="key" v-for="(change, key) in changelog">
                        {{ change }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import pkg from '@/../package.json';
import changelog from '@/../changelog.json';

export default {
  data() {
    return {
      pkg,
      changelog,
    };
  },
};
</script>

<style scoped lang="less">
.changelog {
  li {
    font-size: 16px;
  }
}

.egg {
  float: right;
}
</style>
