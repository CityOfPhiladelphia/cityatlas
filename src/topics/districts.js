export default {
  key: 'districts',
  icon: 'clone',
  label: 'Districts',
  // REVIEW can these be calculated from vue deps?
  components: [

    {
      type: 'vertical-table',
      slots: {
        fields: [
          {
            label: 'Planning',
            value: function(state) {
              return state.geocode.data.properties.planning_district;
            }
          },
          {
            label: 'L+I',
            value: function(state) {
              return state.geocode.data.properties.li_district;
            }
          },
          {
            label: 'Census Tract (2010)',
            value: function(state) {
              return state.geocode.data.properties.census_tract_2010;
            }
          },
          {
            label: 'Census Block Group (2010)',
            value: function(state) {
              return state.geocode.data.properties.census_block_group_2010;
            }
          },
          {
            label: 'Commercial Corridor',
            value: function(state) {
              if(state.geocode.data.properties.commercial_corridor.length > 0) {
                return state.geocode.data.properties.commercial_corridor;
              } else {
                return "n/a"
              }
            }
          },
        ],
      },
      options: {

      }
    }
  ],
  basemap: 'pwd',
  identifyFeature: 'address-marker',
  parcels: 'pwd',
}
