import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { MAP_CONFIG } from "../../configs/mapConfig";

export class MapFactory {
  /**
   * 建立地圖實例
   */
  static createMap() {
    return new Map({
      basemap: MAP_CONFIG.basemap,
    });
  }

  /**
   * 建立視圖實例
   * @param container 綁定的 DOM 元素 (HTMLDivElement)
   * @param map 關聯的地圖物件
   */
  static createMapView(container: HTMLDivElement, map: Map) {
    return new MapView({
      container: container,
      map: map,
      center: MAP_CONFIG.center,
      zoom: MAP_CONFIG.zoom,
      constraints: MAP_CONFIG.constraints,
    });
  }
}
