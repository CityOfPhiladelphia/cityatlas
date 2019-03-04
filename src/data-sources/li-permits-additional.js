export default {
  id: 'liPermitsAdditional',
  type: 'http-get',
  url: 'http://gis-int.databridge.phila.gov/arcgis/rest/services/Atlas/GIS_LNI_LI_PERMITS_PLANNING/MapServer/0/query?',
  // url: 'http://ase.phila.gov/arcgis/rest/services/GSG/GIS_LNI_LI_PERMITS_PLANNING/FeatureServer/0/query?',
  options: {
    params: {
      where: function(feature) {
        return "ADDRESS = '" + feature.properties.street_address + "' OR ADDRESSKEY = '" + feature.properties.li_address_key + "'"
      },
      outFields: '*',
      f: 'json'
    },
    success: function(data) {
      return data.features;
    },
  },
}
