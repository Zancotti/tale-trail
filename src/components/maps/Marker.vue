<script setup lang="ts">
import { computed, ref } from "vue";
import { Marker } from "vue3-google-map";

export interface Title {
  title: string;
  label: string;
}

export interface Location {
  lat: number;
  lng: number;
  locationType: string | null;
}

export interface MapMarker {
  id: number;
  title: Title;
  location: Location;
}

export interface MarkerProps {
  marker: MapMarker;
}

const props = defineProps<MarkerProps>();
const emit = defineEmits(["onSelect", "onMove"]);

const lat = ref(props.marker.location.lat);
const lng = ref(props.marker.location.lng);

const options = computed(() => {
  return {
    position: { lat: lat.value, lng: lng.value },
    label: props.marker.title.label,
    title: props.marker.title.title,
    draggable: true,
  };
});

const dragEnd = (e: google.maps.MapMouseEvent) => {
  lat.value = e.latLng?.lat() ?? lat.value;
  lng.value = e.latLng?.lng() ?? lng.value;

  emit("onMove", { lat: lat.value, lng: lng.value });
};
</script>

<template>
  <Marker @click="emit('onSelect')" @dragend="dragEnd" :options="options" />
</template>

<style scoped></style>
