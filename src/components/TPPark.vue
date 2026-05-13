<template>
<slot />
</template>
<script setup lang="ts">
import {onMounted,onBeforeUnmount,shallowRef,watch,markRaw}from "vue"
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import type MapView from "@arcgis/core/views/MapView"

const props = defineProps<{
    view: MapView,
    visible: boolean
}>()
const parkLayer = shallowRef<GeoJSONLayer|null>(null)

const initLayer = ()=>{
    const layer = new GeoJSONLayer({
        url:"/GeoJson/TPPark.geojson",
        title:"台北市公園分布",
        visible:props.visible,
        spatialReference: { wkid: 3826 } as any,
        renderer:{
            type:"simple",
            symbol:{
                type:"simple-fill",
                color: [34, 139, 34, 0.5],
                outline:{
                    style:"dash",
                    width:1,
                    color:[34,139,34]
                }
                
            }
        },
        popupTemplate:{
            title:"{名稱}",
            content:"面積:{面積}平方公尺"

        }
    });
    parkLayer.value = markRaw(layer);
    props.view.map.add(parkLayer.value)
}

watch(()=>props.visible,(newVal)=>{
    if(parkLayer.value){
        parkLayer.value.visible = newVal
        if(newVal){
            parkLayer.value.when(()=>{
                parkLayer.value!.queryExtent().then((result) => {
                    if (result.extent) {
                        props.view.goTo(result.extent)
                    }
                })
            })
        }
    }
})
onMounted(()=>{
    if(props.view){
        initLayer()
    }
})
onBeforeUnmount(()=>{
    if(parkLayer.value){
        props.view.map.remove(parkLayer.value)
    }
})
</script>