<script setup lang="ts">
import { Location } from "./Marker.vue";

interface LocationTypeSelectProps {
  location: Location;
}
defineProps<LocationTypeSelectProps>();

const locationTypes: string[] = [
  "Monster Den",
  "Wizard´s tower",
  "Enchanting forest",
  "Ancient Ruins",
  "Underground Caverns",
  "Haunted Mansion",
  "Lost Temple",
  "Timeless Library",
  "Pirate Cove",
  "Mystical Oasis",
];
</script>

<template>
  <v-select v-model="location.locationType" chips label="Location Type" :items="locationTypes"></v-select>
</template>

<style scoped></style>
