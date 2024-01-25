import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounter = defineStore("useCounter", () => {
  const internalCount = ref<number>(0);

  const increaseCount = () => {
    internalCount.value = internalCount.value + 1;
  };

  const count = computed(() => internalCount);

  return { count, internalCount, increaseCount };
});
