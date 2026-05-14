<template>
  <slot />
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount, shallowRef, watch, markRaw } from "vue";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Graphic from "@arcgis/core/Graphic";
import type MapView from "@arcgis/core/views/MapView";

const props = defineProps<{
  view: MapView;
  visible: boolean;
}>();
const parkLayer = shallowRef<FeatureLayer | null>(null);


const initLayer = async () => {
  try {
    const response = await fetch("/GeoJson/TPPark.geojson");
    const geojson = await response.json();
    const graphics = geojson.features
      .map((feature: any, fi: number) => {
        if (feature.geometry.type === "MultiPolygon") {
          return feature.geometry.coordinates.map(
            (polygon: number[][][], gi: number) =>
              new Graphic({
                geometry: {
                  type: "polygon",
                  rings: polygon, // 每個 polygon 自己的 rings
                  spatialReference: { wkid: 3826 },
                } as any,
                attributes: {
                  ObjectID: fi * 1000 + gi, // 確保 ID 不重複
                  名稱: feature.properties.名稱,
                  面積: feature.properties.面積,
                },
              }),
          );
        } else if (feature.geometry.type === "Polygon") {
          return new Graphic({
            geometry: {
              type: "polygon",
              rings: feature.geometry.coordinates,
              spatialReference: { wkid: 3826 },
            } as any,
            attributes: {
              ObjectID: fi * 1000,
              名稱: feature.properties.名稱,
              面積: feature.properties.面積,
            },
          });
        }
        return [];
      })
      .flat();

    const layer = new FeatureLayer({
      source: graphics,
      objectIdField: "ObjectID",
      spatialReference: { wkid: 3826 },
      title: "台北市公園分布",
      visible: props.visible,
      fields: [
        { name: "ObjectID", type: "oid" },
        { name: "名稱", type: "string" },
        { name: "面積", type: "string" },
      ],
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: [34, 139, 34, 0.5],
          outline: {
            style: "dash",
            width: 1,
            color: [34, 139, 34],
          },
        },
      } as any,
      popupTemplate: {
        title: "{名稱}",
        content: "面積:{面積}平方公尺",
      },
    });
    parkLayer.value = markRaw(layer);
    props.view.map?.add(parkLayer.value);
  } catch (error) {
    console.error("❌ initLayer 錯誤:", error);
  }
};
watch(
  () => props.visible,
  (newVal) => {
    if (parkLayer.value) {
      parkLayer.value.visible = newVal;
      if (newVal) {
        parkLayer.value.when(() => {
          parkLayer.value!.queryExtent().then((result) => {
            if (result.extent) {
              props.view.goTo(result.extent);
            }
          });
        });
      }
    }
  },
);

onMounted(() => {
  if (props.view) {
    initLayer();
  }
});
onBeforeUnmount(() => {
  if (parkLayer.value) {
    props.view.map?.remove(parkLayer.value);
  }
});
</script>
