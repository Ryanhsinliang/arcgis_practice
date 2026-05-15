// 在此擴充可選底圖清單
export const BASEMAP_OPTIONS = [
  { id: "streets-vector", label: "街道圖", icon: "road" },
  { id: "hybrid", label: "衛星影像", icon: "satellite" },
  { id: "dark-gray-vector", label: "深色模式", icon: "moon" },
  { id: "topo-vector", label: "地形圖", icon: "mountain" },
];

export const MAP_CONFIG = {
  basemap: "streets-vector",
  center: [121.5, 25.0] as [number, number],
  zoom: 12,
  constraints: {
    minZoom: 5,
    maxZoom: 18,
  },
};
