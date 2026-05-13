import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@arcgis/map-components/dist/components/arcgis-map';
import '@arcgis/map-components/dist/components/arcgis-zoom';
import "@arcgis/core/assets/esri/themes/light/main.css";

createApp(App).mount('#app')
