<template>
  <div class="toolbar">
    <button @click="showPark = !showPark">
      {{ showPark ? '關閉公園圖層' : '顯示台北市公園' }}
    </button>
  </div>
  <div class="map-container">
    <arcgis-map 
      basemap="streets-vector" 
      :center="center" 
      :zoom="zoom"
      @arcgisViewReady="handleMapReady"
    >
      <TPPark v-if="mapView" :view="mapView" :visible="showPark" />
    </arcgis-map>
  </div>
</template>

<script setup lang="ts">
import { ref,shallowRef, markRaw } from "vue";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-zoom";
import '@arcgis/map-components/dist/components/arcgis-layer-list';
import type MapView from "@arcgis/core/views/MapView"
import TPPark from './TPPark.vue';


const center = ref([121.51722,25.04778]);
const zoom = ref(14);
const mapView = shallowRef<MapView|null>(null)
const showPark = ref<boolean>(false)

const handleMapReady = (event:any)=>{
  // 使用 markRaw 確保 MapView 不會被 Vue 變成 Proxy 物件
  mapView.value = markRaw(event.detail.view)
}



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
