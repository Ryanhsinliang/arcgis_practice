import { MapFactory } from "../factories/MapFactory";
import MapView from "@arcgis/core/views/MapView";
import type Layer from "@arcgis/core/layers/Layer";
import { LayerFactory } from "../factories/LayerFactory";
import { LAYER_REGISTRY } from "../../configs/layers";

export class MapService {
  private static view: MapView | null = null;
  private static laodedLayers: Map<string, Layer> = new Map();

  //   初始化地圖：建立map、建立view、存進static view、回傳出去
  static initMap(container: HTMLDivElement) {
    const map = MapFactory.createMap();
    this.view = MapFactory.createMapView(container, map);

    this.view.when(() => {
      console.log("Arcgis地圖已載入");
    });

    return this.view;
  }

  static switchBasemap(basemapId: string) {
    if (this.view && this.view.map) {
      this.view.map.basemap = basemapId;
    }
  }

  // 之後其他功能（如畫圖、圖層管理、popup、定位、query）都需要同一份view，但不應重新init，不然會重掛DOM
  static getView() {
    return this.view;
  }

  /**
   * 根據 ID 動態切換或載入圖層
   */
  static async toggleLayer(layerId: string, visible: boolean) {
    if (!this.view) return;

    //檢查圖層是否已經載入
    let layer = this.laodedLayers.get(layerId);

    //沒有載入過的話就從設定檔裡面對應
    if (!layer) {
      const config = LAYER_REGISTRY.find((i) => i.id === layerId);
      if (!config) return;

      layer = await LayerFactory.createLayer(config);
      this.view.map?.add(layer);
      this.laodedLayers.set(layerId, layer);
    }

    //控制顯示，隱藏
    layer.visible = visible;

    //如果是載入新圖層，自動飛過去
    if (visible && layer.type !== "kml") {
      //kml處理比較不同
      await this.view.whenLayerView(layer);

      //   if (layer.fullExtent) {
      //     this.view.goTo(layer.fullExtent);
      //   } else {
      //     console.warn(`圖層 ${layer.id} 沒有定義 fullExtent`);
      //   }
    }
  }
}
