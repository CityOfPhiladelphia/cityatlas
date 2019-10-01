export default {
  id: 'stormwater',
  type: 'http-get',
  url: 'https://stormwater.phila.gov/PwdWebApi/api/v1/parcel/',
  // url: 'https://api.phila.gov/stormwater',
  options: {
    params: {
      urlAddition: function(feature){ return feature.properties.pwd_parcel_id + '/cap'; }
    },
    success: function(data) {
      return data[0];
    }
  }
}
