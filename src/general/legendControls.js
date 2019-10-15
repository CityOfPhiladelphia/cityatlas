export default {
  stormwater: {
    options: {
      topics: [ 'stormwater' ],
      showWithBaseMapOnly: false,
    },
    data: {
      'Roof': {
        'background-color': '#FEFF7F',
      },
      'Other Impervious Surface': {
        'background-color': '#F2DCFF',
      },
    },
  },
  deeds: {
    options: {
      topics: [ 'deeds', 'zoning' ],
      showWithBaseMapOnly: true,
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
