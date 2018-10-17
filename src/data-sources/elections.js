export default {
  id: 'elections',
  url: 'https://apis.philadelphiavotes.com/pollingplaces/',
  type: 'http-get',
  options: {
    params: {
      urlAddition: function(feature) {return feature.properties.election_precinct}
    },
    success(data) {
      return data.features.attributes[0];
    }
  }
}
