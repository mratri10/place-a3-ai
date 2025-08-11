<script setup>
import dataCategory from './assets/category.json';
import { ref, computed, watch } from 'vue';
import { usePostsSearch } from './store/usePostsStore';
import LocationDetail from './LocationDetail.vue';


const selectedCategory = ref("");
const nameLocation = ref("");
const typeLocation = ref("");
const radius = ref(500);
const searchLoading = ref(false);
const isDetailPage = ref(false);


const { postSearch, state } = usePostsSearch()

const enableSearch = computed(() => {
  return selectedCategory.value !== "" &&
    nameLocation.value.trim() !== "" &&
    typeLocation.value !== "";
});
watch(() => state.loading, (newValue) => {
  searchLoading.value = newValue;
});

watch(() => state.error, (newValue) => {
  if (newValue) {
    alert("Lokasi tidak ditemukan");
  }
});
watch(() => state.search, (newValue) => {
  if (newValue.length > 0) {
    isDetailPage.value = true;
  } else {
    isDetailPage.value = false;
  }
});

const handleSearch = () => {
  if (enableSearch.value) {
    postSearch({
      "address": typeLocation.value + " " + nameLocation.value,
      "category": selectedCategory.value,
      "radius": radius.value
    });
  }
}

</script>
<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div v-if="!isDetailPage"
      class="absolute top-0 bottom-0 bg-white w-[375px] shadow-lg overflow-hidden border border-gray-300">
      <!-- Top Bar -->
      <div class="bg-blue-500 text-white p-4 text-center font-bold">
        Place AI
      </div>

      <!-- Content -->
      <div class="p-4">
        <label class="block mb-2 text-gray-700">Category Place</label>
        <select class="w-full p-2 border border-gray-300 rounded-lg mb-4" v-model="selectedCategory">
          <option v-for="(item, index) in dataCategory" v-bind:key="index" :value="item.value">{{ item.name }}</option>
        </select>

        <div class="flex flex-row place-items-end">
          <div class="flex flex-col">
            <label class="block mb-2 text-gray-700">Name Location</label>
            <input v-model="nameLocation" type="text" placeholder="Name Location"
              class="w-full p-2 border border-gray-300 rounded-lg mr-2" />
          </div>
          <div class="flex flex-col">
            <label class="block mb-2 text-gray-700">Type</label>
            <select v-model="typeLocation" class="w-full p-2 border border-gray-300 rounded-lg ml-2">
              <option v-for="(value, index) in ['', 'Provinsi', 'Kota/Kabupaten', 'Kecamatan', 'Kelurahan', 'Desa']"
                v-bind:key="index" :value="value">
                {{ value == '' ? 'Pilih Type' : value }}</option>
            </select>
          </div>
        </div>
        <div class="flex flex-col mt-4 justify-center items-center">
          <p>Radius</p>
          <!-- Button mutiple for select radius -->
          <div class="flex flex-row justify-center items-center mt-2">
            <button
              :class="`ml-2 px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-300 ${radius === 500 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}`"
              @click="radius = 500">500m</button>
            <button
              :class="`ml-2 px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-300 ${radius === 1000 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`"
              @click="radius = 1000">1km</button>
            <button
              :class="`ml-2 px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-300 ${radius === 5000 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`"
              @click="radius = 5000">5km</button>
            <button
              :class="`ml-2 px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-300 ${radius === 10000 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`"
              @click="radius = 10000">10km</button>
          </div>
        </div>
      </div>

      <!-- Bottom Navigation -->
      <div class="absolute bottom-0 w-[375px] justify-self-center left-0 right-0 bg-gray-200 p-4 text-center">
        <button :onclick="handleSearch"
          class="px-10 py-2 bg-blue-500 text-white rounded-lg cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed"
          :disabled="!enableSearch" type="button">
          Search
        </button>
      </div>
    </div>
    <div v-else class="absolute top-0 bottom-0 bg-white w-[375px] shadow-lg overflow-hidden border border-gray-300">
      <location-detail :data="state.search" :onBack="() => { isDetailPage = false }" />
    </div>

    <div v-if="searchLoading" class="flex w-full justify-center items-center min-h-screen">
      <div class="absolute top-0 bottom-0 w-[375px] inset-0 bg-gray-800 flex justify-self-center z-50 opacity-85">
      </div>
      <div
        class="flex flex-col justify-self-center z-52 items-center justify-center bg-white p-4 max-h-500 max-w-80 overflow-y-auto shadow-lg rounded-lg">
        <div class="text-gray-500">
          Loading data, please wait...
        </div>

      </div>
    </div>
  </div>
</template>

<style>
/* Optional: Hide scrollbar for clean look */
::-webkit-scrollbar {
  display: none;
}
</style>
