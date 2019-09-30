export default {
  id: 'stormwater',
  type: 'http-get',
  url: 'https://stormwater.phila.gov/PwdWebApi/api/v1/search/',
  // url: 'https://api.phila.gov/stormwater',
  options: {
    params: {
      q: function(feature){ return feature.properties.street_address; }
    },
    success: function(data) {
      return data[0];
    }
  }
}
