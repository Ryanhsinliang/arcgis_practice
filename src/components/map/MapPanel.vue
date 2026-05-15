<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map-view"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import { MapService } from "../../services/gis/MapService";
import "@arcgis/core/assets/esri/themes/light/main.css";

const mapContainer = shallowRef<HTMLDivElement | null>(null);

onMounted(() => {
  if (mapContainer.value) {
    MapService.initMap(mapContainer.value);
  }
});
</script>
<style scoped>
.map-wrapper {
  width: 100%;
  height: 100vh;
}
.map-view {
  width: 100%;
  height: 100%;
}
</style>
