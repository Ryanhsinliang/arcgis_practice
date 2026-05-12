<script setup lang="ts">
import { ref } from "vue";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-zoom";

const center = ref([121.5, 25.0]);
const zoom = ref(12);

const handleViewReady = (event: any) => {
  console.log("地圖已就緒！", event.detail.view);
};
</script>

<template>
  <div class="map-container">
    <arcgis-map basemap="streets-vector" :center="center" :zoom="zoom">
    </arcgis-map>
  </div>
</template>

<style scoped>
.map-container {
  height: 500px;
  width: 100%;
}
arcgis-map {
  height: 100%;
}
</style>
