const titleCase = function(str) {
  str = str.toLowerCase().split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  });
  return str.join(' ');
};

export default {
  key: 'voting',
  icon: 'gavel',
  label: 'Voting',
  dataSources: ['divisions', 'elections'],
  components: [
    {
      type: 'vertical-table',
      options: {
        nullValue: 'None',
        externalLink: {
          action: function() {
            return 'Learn about your voting options if you cannot vote in person on Election Day';
          },
          href: function(state) {
            return '//www.philadelphiavotes.com/en/voters/absentee-and-alternative-ballots';
          }
        }
      },
      slots: {
        title: 'Polling Place',
        fields: [
          {
            label: 'Location',
            value: function(state) {
                   function nth(n){return n + ([,'st','nd','rd'][n%100>>3^1&&n%10]||'th')};
                   return "<b>"+ nth(state.geocode.data.properties.council_district_2016) + " Council District\
                   <br>Ward " + state.sources.elections.data.ward +
                   ", Division " + state.sources.elections.data.division + "</b><br>" +
                   titleCase(state.sources.elections.data.location) + "<br>" +
                   titleCase(state.sources.elections.data.display_address) + "<br>\
                   All locations are open on Election Day <br>from 7am to 8pm.";
                  },
          },
          {
            label: 'Accessibility',
            value: function(state) {
              const answer = state.sources.elections.data.building == "F" ? 'Building Fully Accessible' :
                             state.sources.elections.data.building == "B" ? 'Building Substantially Accessible' :
                             state.sources.elections.data.building == "M" ? 'Building Accessibilty Modified' :
                             state.sources.elections.data.building == "R" ? 'Building Accessible With Ramp' :
                             state.sources.elections.data.building == "N" ? 'Building Not Accessible' :
                            'Information not available';
              return '<a href="//www.philadelphiavotes.com/en/voters/polling-place-accessibility"\
                      target="_blank">'+answer+'</a>';
            },
          },
          {
            label: 'Parking',
            value: function(state) {
              const parking = state.sources.elections.data.parking == "N" ? 'No Parking' :
                              state.sources.elections.data.parking == "G" ? 'General Parking' :
                              state.sources.elections.data.parking == "L" ? 'Loading Zone' :
                              'Information not available';
              return parking;
            },
          },
        ]
      },
    }
  ],
  zoomToShape: ['geojson', 'marker'],
  geojson: {
    path: ['divisions', 'data'],
    key: 'id',
    style: {
      fillColor: '#42f459',
      color: '#42f459',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.3
    }
  },
  marker: {
    path: ['elections', 'data'],
    lat: 'lat',
    lng: 'lng',
    key: 'display_address',
    color: '#42f459',
    icon: {
      prefix: 'fas',
      icon: 'check',
      shadow: true,
      size: 50,
    }
  },
  basemap: 'pwd',
  identifyFeature: 'address-marker',
  parcels: 'pwd'
}
