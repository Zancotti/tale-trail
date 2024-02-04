<script setup lang="ts">
import { computed, ref } from "vue";
import { useLocationStore } from "@/stores/useLocationStore";
import { GoogleMap } from "vue3-google-map";
import Marker, { MapMarker } from "./Marker.vue";
import MarkerCard from "./MarkerCard.vue";
import { v4 as uuidv4 } from "uuid";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const locationStore = useLocationStore();

const startingPosition = computed(() => {
  return { lat: locationStore.latitude, lng: locationStore.longitude };
});

const markers = ref<MapMarker[]>([]);

let iteration = ref(1);

const addMarker = () => {
  const marker: MapMarker = {
    id: uuidv4(),
    title: {
      title: "Marker",
      label: `M${iteration.value}`,
    },
    location: {
      lat: locationStore.latitude,
      lng: locationStore.longitude,
      locationType: null,
    },
  };
  markers.value.push(marker);
  iteration.value = iteration.value + 1;
};

const selectedMarker = ref<MapMarker | null>(null);

const onMove = (e: any, marker: MapMarker) => {
  const markerToUpdate = markers.value.find((m) => m.id === marker.id);
  if (markerToUpdate) {
    markerToUpdate.location.lat = e.lat;
    markerToUpdate.location.lng = e.lng;
  }
};

const onSelect = (marker: MapMarker) => {
  selectedMarker.value = marker;
};

const onDeselect = () => {
  selectedMarker.value = null;
};

const onRemove = () => {
  markers.value = markers.value.filter((m) => m.id !== selectedMarker.value?.id);
  onDeselect();
};
</script>

<template>
  <div class="mapContainer">
    <div class="text-h3">Adventure Creator</div>
    <v-btn @click="addMarker">Add marker</v-btn>
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
      <Marker
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        @on-move="(e) => onMove(e, marker)"
        @on-select="onSelect(marker)"
      />
    </GoogleMap>
    <MarkerCard
      v-if="selectedMarker"
      :selectedMarker="selectedMarker"
      @on-deselect="onDeselect"
      @on-remove="onRemove"
    />
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
