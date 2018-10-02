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
      options: {}
    }

  ],
  basemap: 'pwd',
  identifyFeature: 'address-marker',
  parcels: 'pwd',
}
