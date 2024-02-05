import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";

export const useLocationStore = defineStore("useLocationStore", () => {
  const latitude = ref<number>(0);
  const longitude = ref<number>(0);
  const isLoading = ref(false);

  const accuracy = ref(0);

  onMounted(async () => {
    isLoading.value = true;
    await fetchLocation();
    isLoading.value = false;
  });

  const fetchLocation = async () => {
    try {
      const position: GeolocationPosition = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
      });
      latitude.value = position.coords.latitude;
      longitude.value = position.coords.longitude;
      accuracy.value = position.coords.accuracy;
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const isLocationFetched = computed(() => isLoading.value === false && latitude.value !== 0 && longitude.value !== 0);

  return {
    latitude,
    longitude,
    isLoading,
    isLocationFetched,
    fetchLocation,
    accuracy,
  };
});
