export default {
  id: 'assessmentHist',
  type: 'http-get',
  url: 'https://phl.carto.com/api/v2/sql',
  options: {
    params: {
      q: function(feature){
        return "select * from assessments where parcel_number = '" + feature.properties.opa_account_num +"'";
      },
    },
  },
};
