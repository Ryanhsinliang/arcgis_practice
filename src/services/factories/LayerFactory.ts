import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import WMSLayer from "@arcgis/core/layers/WMSLayer";
import WMTSLayer from "@arcgis/core/layers/WMTSLayer";
import KMLLayer from "@arcgis/core/layers/KMLLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { type LayerConfig } from "../../configs/layers";
import proj4 from "proj4";

const TWD97 =
  "+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=m +no_defs";
const WGS84 = "EPSG:4326";

export class LayerFactory {
  static async createLayer(config: LayerConfig) {
    const { type, id, label, url, options } = config;
    const baseProps = { url, id, title: label, ...options };
    switch (type) {
      case "geojson":
        return await this.createGeoJSON(config);
      case "wms":
        return new WMSLayer(baseProps);
      case "wmts":
        return new WMTSLayer(baseProps);
      case "kml":
        return new KMLLayer(baseProps);
      case "feature":
        return new FeatureLayer(baseProps);
      default:
        throw new Error(`不支援圖層格式:${type}`);
    }
  }
  //處理多層的json物件，要將層層陣列剝到經緯度單元
  private static transformRecursive(item: any): any {
    //因為有多層，所以如果是陣列就要找到最底層的座標
    if (Array.isArray(item[0])) {
      return item.map((subItem: any) => this.transformRecursive(subItem));
    }
    const [x, y] = item;
    if (typeof x === "number" && x > 180) {
      return proj4(TWD97, WGS84, [x, y]);
    }
    return [x, y];
  }

  private static async createGeoJSON(
    config: LayerConfig,
  ): Promise<GeoJSONLayer> {
    try {
      const res = await fetch(config.url);
      const data = await res.json();

      // 1. 移除 CRS
      if (data.crs) {
        delete data.crs;
      }

      //處理MultiPolygon
      if (data.features) {
        data.features.forEach((feature: any) => {
          if (feature.geometry && feature.geometry.coordinates) {
            feature.geometry.coordinates = this.transformRecursive(
              feature.geometry.coordinates,
            );
          }
        });
      }
      //轉成Blob
      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      const blobUrl = URL.createObjectURL(blob);

      return new GeoJSONLayer({
        url: blobUrl,
        title: config.label,
        id: config.id,
        ...config.options,
        popupTemplate: {
          title: config.popupTemplate?.title,
          content: config.popupTemplate?.content,
        },
      });
    } catch (err) {
      console.error(`GeoJSON載入失敗:${config.label}`, err);
      throw err;
    }
  }

  private static createKML(config: LayerConfig): KMLLayer {
    return new KMLLayer({
      url: config.url,
      title: config.label,
      id: config.id,
      ...config.options,
    });
  }
}
