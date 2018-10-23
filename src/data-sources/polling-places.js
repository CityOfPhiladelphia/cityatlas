export default {
id: 'pollingPlaces',
 type: 'http-get',
 url: '//services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/POLLING_PLACES/FeatureServer/0/query',
 options: {
   params: {
     where: function(feature) {
       return "PRECINCT = '" + feature.properties.election_precinct + "'";
     },
     outFields: "WARD, DIVISION, PRECINCT, PLACENAME,\
                 STREET_ADDRESS, ZIP_CODE, ACCESSIBILITY_CODE, PARKING_CODE,\
                 LAT, LON",
     returnDistinctValues: 'true',
     returnGeometry: 'false',
     f: 'json'
   },
   success: function(data) {
     console.log('seg.js success, data:', data);
     return data.features;
   }
 }
}

// export default {
//   id: 'pollingPlaces',
//   url: 'https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/POLLING_PLACES/FeatureServer/0',
//   type: 'esri',
//   options: {
//     relationship: 'where',
//     where: function(feature) {
//       return "PRECINCT = '" + feature.properties.election_precinct + "'";
//     }
//
// };
//
//
