export type LayerSourceType = "geojson" | "wms" | "wmts" | "kml" | "feature";

export interface LayerConfig {
  id: string;
  label: string;
  type: LayerSourceType;
  url: string;
  visible?: boolean;
  needsProjection: boolean;
  popupTemplate?: {
    title: string;
    content: string;
  };
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
    id: "permeable-pave",
    label: "透水鋪面",
    type: "geojson",
    url: "../../public/GeoJson/PermeablePave.geojson",
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
    id: "EMAP2",
    label: "臺灣通用電子地圖透明",
    type: "wmts",
    url: "https://wmts.nlsc.gov.tw/wmts",
    needsProjection: true,
    options: {
      activeLayer: {
        id: "EMAP2",
      },
    },
  },
  {
    id: "village_nationwide",
    label: "村里界",
    type: "wmts",
    url: "https://wmts.nlsc.gov.tw/wmts",
    needsProjection: true,
    options: {
      activeLayer: {
        id: "Village",
      },
    },
  },
  {
    id: "restaurant",
    label: "觀光資料標準（餐飲）",
    type: "kml",
    url: "https://media.taiwan.net.tw/XMLReleaseALL_public/Restaurant_C_f.kml",
    needsProjection: true,
  },
  {
    id: "activity",
    label: "觀光資料標準（活動）",
    type: "kml",
    url: "https://media.taiwan.net.tw/XMLReleaseALL_public/Activity_C_f.kml",
    needsProjection: true,
  },
  {
    id: "MB5000",
    label: "1/5000圖幅框",
    type: "wms",
    url: "http://localhost:5173/nlsc-wms-proxy/wms",
    needsProjection: true,
    options: {
      // WMSLayer 需要指定顯示哪一個 sublayers
      sublayers: [
        {
          name: "MB5000",
        },
      ],
    },
  },
  {
    id: "road",
    label: "道路路網",
    type: "wms",
    url: "http://localhost:5173/nlsc-wms-proxy/wms",
    needsProjection: true,
    options: {
      // WMSLayer 需要指定顯示哪一個 sublayers
      sublayers: [
        {
          name: "ROAD",
        },
      ],
    },
  },
  {
    id: "school",
    label: "各級學校範圍圖",
    type: "wms",
    url: "http://localhost:5173/nlsc-wms-proxy/wms",
    needsProjection: true,
    options: {
      // WMSLayer 需要指定顯示哪一個 sublayers
      sublayers: [
        {
          name: "SCHOOL",
        },
      ],
    },
  },
];
