export default {
  key: 'districts',
  icon: 'clone',
  label: 'Districts',
  // REVIEW can these be calculated from vue deps?
  components: [

    {
      type: 'vertical-table',
      slots: {
        title: "Districts",
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
    },


    {
      type: 'vertical-table',
      slots: {
        title: "Public Safety",
        fields: [
          {
            label: 'Police District',
            value: function(state) {
              return state.geocode.data.properties.police_district;
            }
          },
          {
            label: 'Police Public Service Area',
            value: function(state) {
              return state.geocode.data.properties.police_service_area;
            }
          },
          {
            label: 'Police Division',
            value: function(state) {
              return state.geocode.data.properties.political_division;
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
