export default {
  stormwater: {
    options: {
      topics: [ 'stormwater' ],
      showWithBaseMapOnly: false,
      marginBottom: '40px',
    },
    data: {
      'Roof': {
        'background-color': '#FEFF7F',
        'font-size': '12px',
      },
      'Other Impervious Surface': {
        'background-color': '#F2DCFF',
        'font-size': '12px',
      },
    },
  },
  deeds: {
    options: {
      topics: [ 'deeds', 'zoning' ],
      showWithBaseMapOnly: true,
      marginBottom: '40px',
    },
    data: {
      'Easements': {
        'border-color': 'rgb(255, 0, 197)',
        'border-style': 'solid',
        'border-weight': '1px',
        'width': '12px',
        'height': '12px',
        'font-size': '10px',
      },
      'Trans Parcels': {
        'border-color': 'rgb(0, 168, 132)',
        'border-style': 'solid',
        'border-weight': '1px',
        'width': '12px',
        'height': '12px',
        'font-size': '10px',
      },
      'Rights of Way': {
        'border-color': 'rgb(249, 147, 0)',
        'border-style': 'solid',
        'border-weight': '1px',
        'width': '12px',
        'height': '12px',
        'font-size': '10px',
      },
    },
  },
};
