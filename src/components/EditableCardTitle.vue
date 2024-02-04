<script setup lang="ts">
import { nextTick } from "vue";
import { ref } from "vue";
import { VTextField } from "vuetify/components";
import { Title } from "./maps/Marker.vue";

interface EditableCardTitleProps {
  cardTitle: Title;
}
defineProps<EditableCardTitleProps>();

const titleInputRef = ref<InstanceType<typeof VTextField> | null>(null);
const editingTitle = ref(false);

const enableEdit = () => {
  editingTitle.value = !editingTitle.value;

  if (editingTitle.value) {
    nextTick(() => {
      titleInputRef.value?.focus();
    });
  }
};
</script>

<template>
  <v-card-title @click="enableEdit">
    <v-text-field
      v-if="editingTitle"
      ref="titleInputRef"
      variant="underlined"
      density="compact"
      v-model="cardTitle.title"
      outlined
      hide-details
      class="cardTitleInput"
      @blur="editingTitle = false"
      @keyup.enter="editingTitle = false"
    />
    <div v-else class="cardTitle">
      <span>{{ cardTitle.title }}</span>
      <v-icon size="x-small" icon="$edit"></v-icon>
    </div>
  </v-card-title>
</template>

<style scoped>
.cardTitle {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 0.5rem;
  padding-top: 6px;
}

:deep(.v-field) {
  font-size: 1.25rem;
  font-weight: 500;
}
</style>
