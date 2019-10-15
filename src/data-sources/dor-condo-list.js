export default {
  id: 'dorCondoList',
  type: 'http-get',
  targets: {
    get: function(state) {
      return state.parcels.dor.data;
    },
    getTargetId: function(target) {
      return target.properties.OBJECTID;
    },
  },
  url: 'https://phl.carto.com/api/v2/sql',
  options: {
    params: {
      q: function(feature, state){
        // console.log(state.parcels.dor.data[0].properties, 'mapreg', state.parcels.dor.data[0].properties.MAPREG);
        return "select * from condominium where mapref = '" + state.parcels.dor.data[0].properties.MAPREG + "'\
                                          and status in (1,3)";
      },// + "' or addresskey = '" + feature.properties.li_address_key.toString() + "'",
    },
  },
};
