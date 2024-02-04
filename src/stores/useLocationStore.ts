import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";

export const useLocationStore = defineStore("useLocationStore", () => {
  const latitude = ref<number>(0);
  const longitude = ref<number>(0);
  const isLoading = ref(false);

  onMounted(() => {
    fetchLocation();
  });

  const fetchLocation = async () => {
    try {
      isLoading.value = true;
      const position: GeolocationPosition = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
      });
      latitude.value = position.coords.latitude;
      longitude.value = position.coords.longitude;
    } catch (error) {
      console.error("Error fetching location:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const isLocationFetched = computed(() => isLoading.value === false && latitude.value !== 0 && longitude.value !== 0);

  return {
    latitude,
    longitude,
    isLoading,
    isLocationFetched,
    fetchLocation,
  };
});
