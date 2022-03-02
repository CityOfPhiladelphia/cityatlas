export default {
  id: 'threeOneOne',
  type: 'esri-nearby',
  url: 'https://services.arcgis.com/fLeGjb7u4uXqeF9q/ArcGIS/rest/services/SALESFORCE_CASES_1YEAR/FeatureServer/0',
  options: {
    geometryServerUrl: 'https://gis-utils.databridge.phila.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer/',
    distances: 800,
    calculateDistance: true,
    where: function() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear() - 1;
      let lastYear = yyyy + '-' + mm + '-' + dd;
      return "REQUESTED_DATETIME > DATE '" + lastYear + "'";
    },
  },
};
