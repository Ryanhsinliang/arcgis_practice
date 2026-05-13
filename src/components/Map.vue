<template>
  <div class="toolbar">
    <button @click="showPark = !showPark">
      {{ showPark ? "關閉公園圖層" : "顯示台北市公園" }}
    </button>
  </div>
  <div class="map-container">
    <arcgis-map
      basemap="streets-vector"
      :center="center"
      :zoom="zoom"
      @arcgisViewReadyChange="handleViewReady"
    >
      <TPPark v-if="mapView" :view="mapView" :visible="showPark" />
    </arcgis-map>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, markRaw } from "vue";
import "@arcgis/map-components/dist/components/arcgis-map";
import type MapView from "@arcgis/core/views/MapView";
import TPPark from "./TPPark.vue";

const center = ref([121.51722, 25.04778]);
const zoom = ref(14);
const mapView = shallowRef<MapView | null>(null);
const showPark = ref<boolean>(false);

const handleViewReady = (event: any) => {
  const el = event.target as any;
  if (el?.view) {
    mapView.value = markRaw(el.view);
  }
};
</script>

<style scoped>
.map-container {
  height: 100vh;
  width: 100%;
}
arcgis-map {
  height: 100%;
}
</style>
