import helpers from '../util/helpers';

const titleCase = function(str) {
  str = str.toLowerCase().split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  });
  return str.join(' ');
};

export default {
  key: 'property',
  icon: 'home',
  label: 'Property Assessments',
  // REVIEW can these be calculated from vue deps?
  dataSources: ['assessmentHist', 'opa', 'zoningBase', 'zoningAppeals', 'zoningOverlay', 'rco'],
  components: [
    {
      type: 'callout',
      slots: {
        text: '\
          Property assessment and sale information for this address. Source: Office of Property Assessments (OPA). OPA was formerly a part of the Bureau of Revision of Taxes (BRT) and some City records may still use that name.\
        '
      }
    },
    {
      type: 'vertical-table',
      slots: {
        fields: [
          {
            label: 'Owners',
            value: function(state) {
              var owners = state.geocode.data.properties.opa_owners;
              var ownersJoined = owners.join(', ');
              return titleCase(ownersJoined);
            }
          },
          {
            label: 'Mailing Address',
            value: function(state) {
              return '<br>'+ titleCase(state.sources.opa.data.mailing_street) +
                     '<br>'+ titleCase(state.sources.opa.data.mailing_city_state) +
                     '<br>'+ state.sources.opa.data.mailing_zip;
            }
          },
        ],
      },
      options: {
        id: 'opaData',
        // requiredSources: ['opa'],
        externalLink: {
          action: function() {
            return 'View the Real Estate Tax Balance';
          },
          href: function() {
            return '//legacy.phila.gov/revenue/realestatetax/';
          }
        }
      }
    },
    {
      type: 'vertical-table',
      slots: {
        title: 'Sales Details',
        fields: [
          {
            label: 'Sales Price',
            value: function(state) {
              return state.sources.opa.data.sale_price;
            },
            transforms: [
              'currency'
            ]
          },
          {
            label: 'Sales Date',
            value: function(state) {
              return state.sources.opa.data.sale_date;
            },
            transforms: [
              'date'
            ]
          },
        ],
      },
    },
    {
      type: 'horizontal-table',
      options: {
        id: 'valueHist',
        fields: [
          {
            label: 'Year',
            value: function(state, item){
              return item.year
            }
          },
          {
            label: 'Market Value',
            value: function(state, item){
              return item.market_value || "$0"
            },
            transforms: ['currency'],
          },
          {
            label: 'Taxable Land',
            value: function(state, item){
              return item.taxable_land || "$0"
            },
            transforms: ['currency'],
          },
          {
            label: 'Taxable Improvement',
            value: function(state, item){
              return item.taxable_building || "$0"
            },
            transforms: ['currency'],
          },
          {
            label: 'Exempt Land',
            value: function(state, item){
              return item.exempt_land || "$0"
            },
            transforms: ['currency'],
          },
          {
            label: 'Exempt Improvement',
            value: function(state, item){
              return item.exempt_building || "$0"
            },
            transforms: ['currency']
          },
        ],
        sort: {
          // this should return the val to sort on
          getValue: function(item) {
            return item.year;
          },
          // asc or desc
          order: 'desc'
        },
      },
      slots: {
        title: 'Valuation History',
        items: function(state) {
          var data = state.sources['assessmentHist'].data.rows;
          var rows = data.map(function(row){
            var itemRow = row;
            return itemRow;
          });
          return rows;
        },
      },
    },
    {
      type: 'vertical-table',
      options: {
        nullValue: 'None',
      },
      slots: {
        title: 'Property Characteristics',
        fields: [
          {
            label: 'OPA Account #',
            value: function(state) {
              return state.geocode.data.properties.opa_account_num;
            }
          },
          {
            label: 'Homestead Exemption',
            value: function(state) {
              if (state.sources.opa.data.homestead_exemption > 0) {
                return state.sources.opa.data.homestead_exemption
              } else {
                return "No"
              }
            },
          },
          {
            label: 'Description',
            value: function(state) {
              return titleCase(state.sources.opa.data.building_code_description);
            },
          },
          {
            label: 'Condition',
            value: function(state) {
              const exterior = state.sources.opa.data.exterior_condition
              const condition =  exterior  == 0 ? 'Not Applicable' :
                                 exterior  == 2 ? 'Newer Construction / Rehabbed' :
                                 exterior  == 3 ? 'Above Average' :
                                 exterior  == 4 ? 'Average' :
                                 exterior  == 5 ? 'Below Average' :
                                 exterior  == 6 ? 'Vacant' :
                                 exterior  == 7 ? 'Sealed / Structurally Compromised, Open to the Weather' :
                                'Not available';
              return condition;
            },
          },
          {
            label: 'Beginning Point',
            value: function(state) {
              return titleCase(state.sources.opa.data.beginning_point);
            },
          },
          {
            label: 'Land Area',
            value: function(state) {
              return state.sources.opa.data.total_area;
            },
            transforms: [
              'integer',
              'prettyNumber',
              'squareFeet',
            ]
          },
          {
            label: 'Improvement Area',
            value: function(state) {
              return state.sources.opa.data.total_livable_area;
            },
            transforms: [
              'integer',
              'prettyNumber',
              'squareFeet',
            ]
          },
        ],
      },
    }, // end table
    {
      type: 'callout',
      slots: {
        text: '\
          Corrections or questions about this information?\
          <br><a href="//opa.phila.gov/opa.apps/Help/CitizenMain.aspx?sch=Ctrl2&s=1&url=search&id=3172000144"\
          target="_blank">Submit an Official Inquiry</a>\
        ',
      },
    },
    {
      type: 'callout',
      slots: {
        title: "Access the Raw Data",
        text: '\
          You can download property assessment data in bulk.\
          <br><a href="//www.opendataphilly.org/dataset/opa-property-assessments"\
          target="_blank">Download the Data</a> from Open Philly\
        ',
      },
    },
  ],
  basemap: 'pwd',
  identifyFeature: 'address-marker',
  // we might not need this anymore, now that we have identifyFeature
  parcels: 'pwd',
  errorMessage: function (state) {
    var data = state.sources.condoList.data;
        // features = data.features;

    if (data) {
      var numCondos = data.total_size;

      if (numCondos > 0) {
        var shouldPluralize = numCondos > 1,
            isOrAre = shouldPluralize ? 'are' : 'is',
            unitOrUnits = shouldPluralize ? 'units' : 'unit',
            message = [
              '<h3>',
              'There ',
              isOrAre,
              // ' <strong>',
              ' ',
              numCondos,
              ' condominium ',
              unitOrUnits,
              // '</strong> at this address.</h3>',
              ' at this address.</h3>',
              // ' at this address. ',
              '<p>You can use the Condominiums tab below to see information for an individual unit.</p>'
              // 'Please select a unit from the Condominiums tab below.'
            ].join('');

        return message;
      }
    } else {
      return 'There is no property assessment record for this address.';
    }
  },
}
