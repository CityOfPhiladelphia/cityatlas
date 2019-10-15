export default {
  key: '311',
  icon: 'phone',
  label: '311',
  dataSources: [ 'threeOneOne' ],
  basemap: 'pwd',
  identifyFeature: 'address-marker',
  parcels: 'pwd',
  components: [
    {
      type: 'callout',
      slots: {
        text: 'A more detailed look at 311 service requests near your \
          search address. This includes sensitive information, such as \
          request descriptions and records marked private by the customer,\
          that cannot be shared with the public.\
        ',
      },
    },
    {
      type: 'horizontal-table',
      options: {
        topicKey: '311',
        id: '311',
        sort: {
          select: true,
          sortFields: [
            'distance',
            'date',
          ],
          getValue: function(item, sortField) {
            var val;

            if (sortField === 'date' || !sortField) {
              val = item.properties.REQUESTED_DATETIME;
            } else if (sortField === 'distance') {
              val = item._distance;
            }
            return val;
          },
          order: function(sortField) {
            var val;
            if (sortField === 'date') {
              val = 'desc';
            } else {
              val = 'asc';
            }
            return val;
          },
        },
        filters: [
          {
            type: 'time',
            getValue: function(item) {
              return item.properties.REQUESTED_DATETIME;
            },
            label: 'From the last',
            values: [
              {
                label: '30 days',
                value: '30',
                unit: 'days',
                direction: 'subtract',
              },
              {
                label: '90 days',
                value: '90',
                unit: 'days',
                direction: 'subtract',
              },
              {
                label: 'year',
                value: '1',
                unit: 'years',
                direction: 'subtract',
              },
            ],
          },
        ],
        filterByText: {
          label: 'Filter by',
          fields: [
            'DESCRIPTION',
            'SUBJECT',
            'ADDRESS',
          ],
        },
        mapOverlay: {
          marker: 'circle',
          style: {
            radius: 6,
            fillColor: '#ff3f3f',
            color: '#ff0000',
            weight: 1,
            opacity: 1,
            fillOpacity: 1.0,
          },
          hoverStyle: {
            radius: 6,
            fillColor: 'yellow',
            color: '#ff0000',
            weight: 1,
            opacity: 1,
            fillOpacity: 1.0,
          },
        },
        fields: [
          {
            label: 'Date',
            value: function(state, item) {
              return item.properties.REQUESTED_DATETIME;
            },
            nullValue: 'no date available',
            transforms: [
              'date',
            ],
          },
          {
            label: 'Address',
            value: function(state, item) {
              return item.properties.ADDRESS;
            },
          },
          {
            label: 'Subject',
            value: function(state, item) {
              if (item.properties.MEDIA_URL) {
                return '<a target="_blank" href='+item.properties.MEDIA_URL+'>'+item.properties.SUBJECT+'</a>';
              }
              return item.properties.SUBJECT;

            },
          },
          {
            label: 'Description (not shared with the public)',
            value: function(state, item) {
              return item.properties.DESCRIPTION;
            },
          },
          {
            label: 'Distance',
            value: function(state, item) {
              // return `${item._distance} ft`;
              return item._distance + ' ft';
            },
          },
        ],
      },
      slots: {
        title: 'Nearby Service Requests',
        data: 'threeOneOne',
        items: function(state) {
          var data = state.sources['threeOneOne'].data;
          var rows = data.map(function(row){
            var itemRow = row;
            // var itemRow = Object.assign({}, row);
            // itemRow.DISTANCE = 'TODO';
            return itemRow;
          });
          return rows;
        },
      },
    },
  ],
};
