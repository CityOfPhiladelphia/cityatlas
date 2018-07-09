export default {
  id: 'stormwater',
  type: 'http-get',
  url: 'https://api.phila.gov/stormwater',
  options: {
    params: {
      search: function(feature){ return feature.properties.street_address; }
    },
    success: function(data) {
      return data[0];
    }
  }
}
