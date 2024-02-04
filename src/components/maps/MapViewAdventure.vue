<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useLocationStore } from "@/stores/useLocationStore";
import { GoogleMap } from "vue3-google-map";
import Marker, { MapMarker } from "./Marker.vue";
import { v4 as uuidv4 } from "uuid";
import { useStorage } from "@vueuse/core";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const locationStore = useLocationStore();

const startingPosition = computed(() => {
  return { lat: locationStore.latitude, lng: locationStore.longitude };
});

const markers = useStorage<MapMarker[]>("AdventureMap", []);

let locationInterval: number | undefined;

onMounted(() => {
  // Start fetching the user's location every 10 seconds
  locationInterval = setInterval(locationStore.fetchLocation, 10000);
});

onUnmounted(() => {
  // Clear the interval when the component is unmounted
  if (locationInterval !== undefined) {
    clearInterval(locationInterval);
  }
});

const userLocation = ref({
  id: uuidv4(),
  title: {
    title: "Your Location",
    label: ` `,
  },
  location: {
    lat: locationStore.latitude,
    lng: locationStore.longitude,
    locationType: null,
  },
});
</script>

<template>
  <div class="mapContainer">
    <div class="text-h3">Adventure Map</div>
    <div v-if="locationStore.isLoading">Loading...</div>
    <GoogleMap
      v-else
      :api-key="apiKey"
      style="width: 100%; height: 50dvh"
      :street-view-control="false"
      :fullscreen-control="false"
      :map-type-control="false"
      :clickable-icons="false"
      :center="startingPosition"
      :zoom="15"
    >
      <Marker v-for="marker in markers" :key="marker.id" :marker="marker" :is-edit-mode="false" />
      <Marker :key="userLocation.id" :marker="userLocation" :is-edit-mode="false" />
    </GoogleMap>
  </div>
</template>

<style scoped>
.mapContainer {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}
</style>
