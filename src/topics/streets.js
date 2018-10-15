import transforms from '../general/transforms';

export default {
  key: 'streets',
  icon: 'road',
  label: 'Streets',
  // REVIEW can these be calculated from vue deps?
  dataSources: ['opa'],
  components: [
    {
      type: 'vertical-table',
      slots: {
        title: "Streets",
        fields: [
          {
            label: 'Highway District',
            value: function(state) {
              return state.geocode.data.properties.highway_district;
            }
          },
          {
            label: 'Highway Section',
            value: function(state) {
              return state.geocode.data.properties.highway_section;
            }
          },
          {
            label: 'Highway Subsection',
            value: function(state) {
              return state.geocode.data.properties.highway_subsection;
            }
          },
          {
            label: 'Street Light Routes',
            value: function(state) {
              return state.geocode.data.properties.street_light_route;
            }
          },
          {
            label: 'Traffic District',
            value: function(state) {
              return state.geocode.data.properties.traffic_district;
            }
          },
          {
            label: 'Traffic PM District',
            value: function(state) {
              return state.geocode.data.properties.traffic_pm_district;
            }
          },
        ],
      },
      options: {}
    },
    {
      type: 'vertical-table',
      slots: {
        title: "Trash and Recycling",
        fields: [
          {
            label: 'Trash and Recycling Day',
            value: function(state) {
              return transforms.dayofweek.transform(state.geocode.data.properties.rubbish_recycle_day);
            }
          },
          {
            label: 'Leaf COllection Day',
            value: function(state) {
              return state.geocode.data.properties.leaf_collection_area;
            }
          },
          {
            label: 'Sanitation Area',
            value: function(state) {
              return state.geocode.data.properties.sanitation_area;
            }
          },
          {
            label: 'Sanitation District',
            value: function(state) {
              return state.geocode.data.properties.sanitation_district;
            }
          },
        ],
      },
    }
  ],
  basemap: 'pwd',
  identifyFeature: 'address-marker',
  parcels: 'pwd',
}