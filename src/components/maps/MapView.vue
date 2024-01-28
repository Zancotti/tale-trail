<script setup lang="ts">
import { computed } from "vue";
import { useLocationStore } from "@/stores/useLocationStore";
import { GoogleMap, Marker } from "vue3-google-map";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const locationStore = useLocationStore();

const position = computed(() => {
  return { lat: locationStore.latitude, lng: locationStore.longitude };
});

const markerOptions = computed(() => {
  return { position: position.value, label: "H", title: "YOUR LOCATION" };
});
</script>

<template>
  <div>
    <h1>Map</h1>
    <div v-if="locationStore.isLoading">Loading...</div>
    <GoogleMap
      v-else
      :api-key="apiKey"
      style="width: 500px; height: 500px"
      :street-view-control="false"
      :fullscreen-control="false"
      :map-type-control="false"
      :clickable-icons="false"
      :center="position"
      :zoom="15"
    >
      <Marker :options="markerOptions" />
    </GoogleMap>
  </div>
</template>

<style scoped></style>
