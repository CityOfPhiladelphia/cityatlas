export default {
  id: 'threeOneOne',
  type: 'esri-nearby',
  url: 'https://gis-int.databridge.phila.gov/arcgis/rest/services/Atlas/GIS311_365DAYS/MapServer/0',
  options: {
    geometryServerUrl: 'https://gis-utils.databridge.phila.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer/',
    distances: 800,
    calculateDistance: true,
  },
};
