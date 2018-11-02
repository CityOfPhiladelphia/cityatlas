export default {
  key: 'districts',
  icon: 'clone',
  label: 'Districts',
  dataSources: ['opa'],
  // REVIEW can these be calculated from vue deps?
  components: [

    {
      type: 'callout',
      slots: {
        text: '\
          Districts related to police, L+I, city planning, streets, \
          census, and commerce for this address. Sources: Department \
          of Streets, Licenses and Inspections, Planning and Development,\
          & Philadelphia Police Dept.\
        ',
      }
    },
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
    },
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
      type: 'external-link',
      options:{
        data: 'See more districts in OpenMaps',
        href: function() {
          return '//openmaps.phila.gov/';
        }
      }
    }
  ],
  basemap: 'pwd',
  identifyFeature: 'address-marker',
  parcels: 'pwd',
}
