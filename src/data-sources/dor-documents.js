import helpers from '../util/helpers';

export default {
  id: 'dorDocuments',
  type: 'http-get',
  targets: {
    get: function(state) {
      return state.parcels.dor.data;
    },
    getTargetId: function(target) {
      return target.properties.OBJECTID;
    },
  },
  // url: '//gis.phila.gov/arcgis/rest/services/DOR/rtt_service/MapServer/0/query',
  url: '//services.arcgis.com/fLeGjb7u4uXqeF9q/ArcGIS/rest/services/RTT_SUMMARY/FeatureServer/0/query',
  options: {
    params: {
      where: function (feature, state) {
        // METHOD 1: via address
        var parcelBaseAddress = helpers.concatDorAddress(feature);
        var geocode = state.geocode.data.properties;

        // REVIEW if the parcel has no address, we don't want to query
        // WHERE ADDRESS = 'null' (doesn't make sense), so use this for now
        if (!parcelBaseAddress || parcelBaseAddress === 'null'){
          var where = "MATCHED_REGMAP = '" + state.parcels.dor.data[0].properties.BASEREG + "'";
        } else {
          var addressLow = state.geocode.data.properties.address_low,
              addressFloor = Math.floor(addressLow / 100, 1) * 100,
              addressRemainder = addressLow - addressFloor,
              where = "((ADDRESS_LOW = " + addressLow
                    + " OR (ADDRESS_LOW >= " + addressFloor + " AND ADDRESS_LOW <= " + addressLow + " AND ADDRESS_HIGH >= " + addressRemainder + " ))"
                    + " AND STREET_NAME = '" + geocode.street_name
                    + "' AND STREET_SUFFIX = '" + geocode.street_suffix
                    + "'"
          if (geocode.street_predir != '') {
            where += " AND STREET_PREDIR = '" + geocode.street_predir + "'";
          }
          if (geocode.address_low_suffix != '') {
            where += " AND ADDRESS_LOW_SUFFIX = '" + geocode.address_low_suffix + "'";
          }
          // this is hardcoded right now to handle DOR address suffixes that are actually fractions
          if (geocode.address_low_frac === '1/2') {
            where += " AND ADDRESS_LOW_SUFFIX = '2'" //+ geocode.address_low_frac + "'";
          }
          if (geocode.street_postdir != '') {
            where += " AND STREET_POSTDIR = '" + geocode.street_postdir + "'";
          }

          // check for unit num
          var unitNum = helpers.cleanDorAttribute(feature.properties.UNIT),
              unitNum2 = geocode.unit_num;
          if (unitNum) {
            where += " AND UNIT_NUM = '" + unitNum + "'";
          } else if (unitNum2 != '') {
            where += " AND UNIT_NUM = '" + unitNum2 + "'";
          }

          where += ") or MATCHED_REGMAP = '" + state.parcels.dor.data[0].properties.BASEREG + "'";
          // where += " or REG_MAP_ID = '" + state.parcels.dor.data[0].properties.BASEREG + "'";
          // where += ") OR (STREET_ADDRESS='" + parcelBaseAddress + "'";
          // if (unitNum) {
          //   where +="AND UNIT_NUM = '" + unitNum + "'";
          // }
          // where += ")"
        }

        // METHOD 2: via parcel id - the layer doesn't have mapreg yet, though
        // var mapreg = feature.properties.MAPREG;
        // var where = `MAPREG = '${mapreg}'`;

        // console.log('dor docs where', where);

        return where;
      },
      outFields: "R_NUM, DISPLAY_DATE, DOCUMENT_TYPE, GRANTORS, GRANTEES, DISCREPANCY",
      returnDistinctValues: 'true',
      returnGeometry: 'false',
      f: 'json'
    },
    success: function(data) {
      return data.features;
    }
  },
}
