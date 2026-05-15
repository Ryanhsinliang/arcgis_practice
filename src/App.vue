<script setup lang="ts">
import MapPanel from "./components/map/MapPanel.vue";
import BasemapSwitcher from "./components/common/BasemapSwitcher.vue";
import LayerToggle from "./components/common/LayerToggle.vue";
</script>

<template>
  <MapPanel />
  <BasemapSwitcher />
  <LayerToggle />
</template>
