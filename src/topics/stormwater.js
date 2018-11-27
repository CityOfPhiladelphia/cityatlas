export default {
  key: 'stormwater',
  icon: 'tint',
  label: 'Stormwater',
  dataSources: ['stormwater'],
  basemap: 'pwd',
  dynamicMapLayers: [
    'stormwater'
  ],
  identifyFeature: 'pwd-parcel',
  parcels: 'pwd',
  components: [
    {
      type: 'callout',
      slots: {
        text: 'Stormwater billing accounts associated with your search address. The property boundaries displayed on the map for reference only and may not be used in place of recorded deeds or land surveys. Boundaries are generalized for ease of visualization. Source: Philadelphia Water Department'
      }
    },
    {
      type: 'vertical-table',
      options: {},
      slots: {
        title: 'Parcel',
        fields: [
          {
            label: 'Parcel ID',
            value: function(state) {
              // return state.geocode.data.properties.pwd_parcel_id;
              return state.sources.stormwater.data.Parcel.ParcelID;
            }
          },
          {
            label: 'Address',
            value: function(state) {
              return state.sources.stormwater.data.Parcel.Address;
            }
          },
          {
            label: 'Building Type',
            value: function(state) {
              return state.sources.stormwater.data.Parcel.BldgType;
            }
          },
          {
            label: 'Gross Area',
            value: function(state) {
              return state.sources.stormwater.data.Parcel.GrossArea + ' sq ft';
            },
            transforms: [
              'thousandsPlace'
            ]
          },
          {
            label: 'Impervious Area',
            value: function(state) {
              return state.sources.stormwater.data.Parcel.ImpervArea + ' sq ft';
            },
            transforms: [
              'thousandsPlace'
            ]
          },
          {
            label: 'CAP Eligible',
            value: function(state) {
              return state.sources.stormwater.data.Parcel.CAPEligible;
            },
            transforms: [
              'booleanToYesNo'
            ]
          },
        ]
      },
    },
    {
      type: 'horizontal-table',
      options: {
        topicKey: 'water',
        id: 'stormwater',
        // limit: 100,
        // TODO this isn't used yet, but should be for highlighting rows/
        // map features.
        // overlay: '311',
        fields: [
          {
            label: 'Account #',
            value: function(state, item) {
              return item.AccountNumber;
            }
          },
          {
            label: 'Customer',
            value: function(state, item) {
              return item.CustomerName;
            }
          },
          {
            label: 'Status',
            value: function(state, item) {
              return item.AcctStatus;
            }
          },
          {
            label: 'Service Type',
            value: function(state, item) {
              return item.ServiceTypeLabel;
            }
          },
          {
            label: 'Size',
            value: function(state, item) {
              return item.MeterSize;
            }
          },
          {
            label: 'Stormwater',
            value: function(state, item) {
              return item.StormwaterStatus;
            }
          }
        ],
        externalLink: {
          forceShow: true,
          action: function(count) {
            return 'See more at Stormwater Billing';
          },
          name: 'Stormwater Billing',
          href: function(state) {
            var id = state.sources.stormwater.data.Parcel.ParcelID;
            return '//www.phila.gov/water/swmap/Parcel.aspx?parcel_id=' + id;
          }
        }
      },
      slots: {
        title: 'Accounts',
        items: function(state) {
          var data = state.sources['stormwater'].data
          var rows = data.Accounts.map(function(row){
            var itemRow = row;
            // var itemRow = Object.assign({}, row);
            return itemRow;
          });
          return rows;
        }
      }
    }
  ]
}
