<template>
  <div class="basemap-panel">
    <div class="option">
      <button
        v-for="item in BASEMAP_OPTIONS"
        :key="item.id"
        @click="changeBasemap(item.id)"
        class="basemap-btn"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MapService } from "../../services/gis/MapService";
import { BASEMAP_OPTIONS } from "../../configs/mapConfig";

const changeBasemap = (id: string) => {
  MapService.switchBasemap(id);
};
</script>
<style scoped>
.basemap-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
}
.options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.basemap-btn {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
