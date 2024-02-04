<script setup lang="ts">
import { watch } from "vue";
import { MapMarker } from "./Marker.vue";
import { ref } from "vue";
import EditableCardTitle from "../EditableCardTitle.vue";
import LocationTypeSelect from "./LocationTypeSelect.vue";

interface MarkerCardProps {
  selectedMarker: MapMarker;
}
const props = defineProps<MarkerCardProps>();
const isOpen = ref(props.selectedMarker !== null);

watch(isOpen, (value) => {
  if (value === false) emit("onDeselect");
});

const emit = defineEmits(["onDeselect", "onRemove"]);
</script>

<template>
  <v-bottom-sheet v-model="isOpen">
    <v-card class="markerCard">
      <EditableCardTitle :cardTitle="selectedMarker.title" />
      <v-card-subtitle>{{ selectedMarker.title.label }}</v-card-subtitle>
      <v-card-text>
        <LocationTypeSelect :location="selectedMarker.location" />
      </v-card-text>
      <v-card-actions>
        <v-list-item class="w-100">
          <template v-slot:prepend>
            <v-btn @click="emit('onDeselect')">Close</v-btn>
          </template>
          <template v-slot:append>
            <v-btn @click="emit('onRemove')">Delete</v-btn>
          </template>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
</template>

<style scoped></style>
