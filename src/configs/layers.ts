export type LayerSourceType = "geojson" | "wms" | "wmts" | "kml" | "feature";

export interface LayerConfig {
  id: string;
  label: string;
  type: LayerSourceType;
  url: string;
  visible?: boolean;
  needsProjection: boolean;
  options?: any; //存放各類型特有參數
}

export const LAYER_REGISTRY: LayerConfig[] = [
  {
    id: "taipei-parks",
    label: "台北市公園分布",
    type: "geojson",
    url: "../../public/GeoJson/TPPark.geojson",
    needsProjection: true,
    options: {
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: [69, 196, 93, 0.3],
          outline: {
            color: [56, 142, 60, 1],
            width: 1,
          },
        },
      },
    },
  },
  {
    id: "reserve",
    label: "野生動物保護區",
    type: "geojson",
    url: "../../public/GeoJson/ReservesMultiPolyNoZ.json",
    needsProjection: true,
    options: {
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: [69, 196, 93, 0.3],
          outline: {
            color: [56, 142, 60, 1],
            width: 1,
          },
        },
      },
    },
  },
  {
    id: "taipei-liquefaction",
    label: "台北土壤液化圖",
    type: "geojson",
    url: "../../public/GeoJson/TPE_liquefaction.json",
    needsProjection: true,
    options: {
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: [25, 109, 167, 0.3],
          outline: {
            color: [11, 57, 89, 1],
            width: 1,
          },
        },
      },
    },
  },
  {
    id: "country-south",
    label: "南區縣市分界圖",
    type: "geojson",
    url: "../../public/GeoJson/County_South.geojson",
    needsProjection: true,
    options: {
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: [256, 256, 256, 0],
          outline: {
            color: [0, 0, 0, 1],
            width: 1,
          },
        },
      },
    },
  },
  {
    id: "nURBAN2",
    label: "非都市土地使用地類別圖",
    type: "wmts",
    url: "https://wmts.nlsc.gov.tw/wmts",
    needsProjection: true,
  },
  {
    id: "village_nationwide",
    label: "村里界",
    type: "wmts",
    url: "https://wmts.nlsc.gov.tw/wmts",
    needsProjection: true,
  },
];
