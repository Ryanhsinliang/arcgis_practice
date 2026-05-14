<template>
  <slot />
</template>
<script setup lang="ts">
import { onMounted,onBeforeUnmount, shallowRef,watch,markRaw} from 'vue';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Graphic from "@arcgis/core/Graphic";
import type MapView from "@arcgis/core/views/MapView";

const props = defineProps<{
   view:MapView;
   visible:boolean;
}>()
const paveLayer = shallowRef<FeatureLayer|null>(null)

const initLLayer = async()=>{
    try{
        const response = await fetch("/GeoJson/PermeablePave")
        const geojson = await response.json()
        const graphics = geojson.features.map((feature:any,))
    }catch(err){}
}
</script>
