<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  data: {
    type: Array, // your data is an array of objects
    required: true
  },
  onBack: {
    type: Function,
    required: true
  }
})

function handleBack() {
  props.onBack()
}
</script>

<template>
  <div>
    <button @click="handleBack" class="mb-4 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition cursor-pointer">
      Back
    </button>
    <div class="p-4 max-h-[90vh] overflow-y-auto">


      <div v-for="(value, index) in data" :key="index"
        class="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
        <h2 class="text-xl font-bold mb-2">{{ value.name }}</h2>
        <p class="mb-2">{{ value.description }}</p>
        <p class="mb-2 text-sm text-gray-600">Latitude: {{ value.latitude }}, Longitude: {{ value.longitude }}</p>
        <a :href="value.linkMaps || '#'" target="_blank" class="text-blue-500 hover:underline">
          View on Maps
        </a>

        <div class="mt-4 flex justify-center flex-wrap gap-2">
          <div v-for="(photo, photoIndex) in value.photos" :key="photoIndex" class="flex flex-col items-center">
            <img v-if="photo.authorAttributions?.[0]?.photoUri" :src="photo.authorAttributions?.[0]?.photoUri"
              :alt="`Photo ${photoIndex + 1} of ${value.name}`" class="w-18 h-18 rounded object-cover"
              loading="eager" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: scrollbar styling */
.p-4::-webkit-scrollbar {
  width: 6px;
}

.p-4::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.4);
  border-radius: 3px;
}
</style>
