<script setup lang="ts">
import { useCounter } from "../stores/useCounter";
import { useLocationStore } from "../stores/useLocationStore";

defineProps({
  msg: { type: String, required: true },
});
const emit = defineEmits(["onCounterClick"]);

const { count, increaseCount, internalCount } = useCounter();
const locationStore = useLocationStore();
</script>

<template>
  <h1>{{ msg }}</h1>
  <h2>Could fetch location: {{ locationStore.isLocationFetched }}</h2>
  <div>Your latitude is {{ locationStore.latitude }}, your longitude is {{ locationStore.longitude }}</div>

  <div class="card">
    <button type="button" @click="increaseCount">count is {{ count }} internal count is {{ internalCount }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
