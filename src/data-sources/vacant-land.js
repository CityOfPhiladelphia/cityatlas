export default {
  id: 'vacandLand',
  type: 'esri',
  url: 'https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/Vacant_Indicators_Land/FeatureServer/0',
  options: {
    relationship: 'contains',
  },
  // params: {
  //   query: feature => L.esri.query({url: 'https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/Vacant_Indicators_Land/FeatureServer/0'}).contains(feature)
  // },
  success: function(data) {
    return data;
  },
};
