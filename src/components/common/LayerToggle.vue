<template>
  <div class="layer-control">
    <h3>圖層套疊</h3>
    <div v-for="layer in LAYER_REGISTRY" :key="layer.id" class="layer-item">
      <input
        type="checkbox"
        :id="layer.id"
        @change="onToggle(layer.id, $event)"
      />
      <label :for="layer.id"
        >{{ layer.label }}{{ layer.type.toUpperCase() }}</label
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { MapService } from "../../services/gis/MapService";
import { LAYER_REGISTRY } from "../../configs/layers";

const onToggle = (id: string, event: Event) => {
  const isChecked = (event.target as HTMLInputElement).checked;
  MapService.toggleLayer(id, isChecked);
};
</script>
<style scoped>
/* 面板本體 */
.layer-control {
  position: absolute;
  top: 100px;
  right: 20px;
  width: 240px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px); /* 背景模糊，增加質感 */
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #e2e8f0;
  z-index: 100;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* 標題樣式 */
h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1a202c;
  border-bottom: 2px solid #3b82f6; /* 增加一個代表科技感的藍色底線 */
  padding-bottom: 8px;
}

/* 圖層項目容器 */
.layer-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 6px 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.layer-item:hover {
  background-color: rgba(59, 130, 246, 0.1); /* 滑過時淡藍色反白 */
}

/* 複選框樣式 */
input[type="checkbox"] {
  cursor: pointer;
  width: 16px;
  height: 16px;
  margin-right: 12px;
  accent-color: #3b82f6; /* 修改 Checkbox 勾選後的顏色 */
}

/* 文字標籤樣式 */
label {
  cursor: pointer;
  font-size: 14px;
  color: #4a5568;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

/* 圖層類型標籤 (Tag) */
label::after {
  content: attr(data-type); /* 稍微進階的作法，或直接用 HTML 裡的標籤 */
  font-size: 10px;
  background-color: #edf2f7;
  color: #718096;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
  text-transform: uppercase;
  font-weight: bold;
}
</style>
