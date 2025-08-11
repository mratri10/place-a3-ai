<template>
  <div id="app">
    <!-- Route content -->
    <router-view />
  </div>
</template>

<script setup>
// App.vue should not directly use useRouter() in watchers.
// Put page-specific logic in page components instead.
</script>

<style>
/* optional styling */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
