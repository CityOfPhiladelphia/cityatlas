import helpers from '../util/helpers';

export default {
  key: 'deeds',
  icon: 'book',
  label: 'Deeds',
  // TODO uncommenting this causes the no-content view to show up.
  // dataSources: ['dorDocuments'],
  components: [
    {
      type: 'callout',
      slots: {
        text: '\
          Deed information and document transactions for this address.\
          The map faithfully reflects property boundaries as described in \
          recorded deeds including multiple types of easements.\
          The property boundaries displayed on the map are for reference \
          only and should not be used in place of the recorded deeds or \
          land surveys. Source: Department of Records\
        ',
      },
    },
    {
      type: 'collection-summary',
      options: {
        descriptor: 'parcel',
        // this will include zero quantities
        // includeZeroes: true,
        getValue: function(item) {
          return item.properties.STATUS;
        },
        context: {
          singular: function(list){
            return 'There is ' + list + ' at this address.';
          },
          plural: function(list){
            return 'There are ' + list + ' at this address.';
          },
        },
        types: [
          {
            value: 1,
            label: 'active parcel',
          },
          {
            value: 2,
            label: 'inactive parcel',
          },
          {
            value: 3,
            label: 'remainder parcel',
          },
        ],
      },
      slots: {
        items: function(state) {
          // return state.dorParcels.data;
          return state.parcels.dor.data;
        },
      },
    },
    {
      type: 'tab-group',
      options: {
        getKey: function(item) {
          return item.properties.OBJECTID;
        },
        getTitle: function(item) {
          return item.properties.MAPREG;
        },
        getAddress: function(item) {
          var address = helpers.concatDorAddress(item);
          return address;
        },
        activeItem: function(state) {
          return state.parcels.dor.activeParcel;
        },
        // components for the content pane. this essentially a topic body.
        components: [
        //   {
        //     type: 'table-group',
        //     options: {
        //       showBoth: {
        //         mainTable: {
        //           dataSource: null,
        //           id:'dorData',
        //         },
        //         dependentTable: {
        //           dataSource: 'condoList',
        //           id: 'condoList_dor',
        //         }
        //       },
        //       components: [

          {
            type: 'vertical-table',
            options: {
              nullValue: 'None',
              id: 'dorData',
            },
            slots: {
              title: 'Parcel Details',
              fields: [
                {
                  label: 'Map Registry #',
                  value: function(state, item) {
                    return item.properties.MAPREG;
                  },
                },
                {
                  label: 'Parcel Address',
                  value: function(state, item) {
                    return helpers.concatDorAddress(item);
                  },
                },
                {
                  label: 'Status',
                  value: function(state, item) {
                    var status = item.properties.STATUS;
                    var desc;
                    switch(status) {
                    case 1:
                      desc = 'Active';
                      break;
                    case 2:
                      desc = 'Inactive';
                      break;
                    case 3:
                      desc = 'Remainder';
                      break;
                    default:
                      break;
                    }
                    return desc;
                  },
                },
                {
                  label: 'Origination Date',
                  value: function(state, item) {
                    return item.properties.ORIG_DATE;
                  },
                  transforms: [
                    'date',
                  ],
                },
                {
                  label: 'Inactive Date',
                  value: function(state, item) {
                    return item.properties.INACTDATE;
                  },
                  transforms: [
                    'date',
                  ],
                },
                {
                  label: 'Has Air Rights',
                  value: function(state, item) {
                    var suffix = item.properties.SUFFIX;
                    return suffix === 'A' ? 'Yes' : 'No';
                  },
                },
                {
                  label: 'Is Condo',
                  value: function(state, item) {
                    if (!item.properties.CONDOFLAG) {
                      return 'No';
                    }
                    return 'Yes';

                    // return item.properties.CONDOFLAG ? 'Yes' : 'No';
                  },
                  // fieldFunction: function(state, item) {
                  //   console.log('state', state);
                  // }
                },
                {
                  label: 'Perimeter',
                  value: function (state, item) {
                    return (item.properties || {})['TURF_PERIMETER'];
                  },
                  transforms: [
                    'integer',
                    'prettyNumber',
                    'feet',
                  ],
                },
                {
                  label: 'Area',
                  value: function(state, item) {
                    return (item.properties || {})['TURF_AREA'];
                  },
                  transforms: [
                    'integer',
                    'prettyNumber',
                    'squareFeet',
                  ],
                },
              ],
            },  // end slots
          },  // end vertical table
          // {
          //   type: 'horizontal-table',
          //   options: {
          //     topicKey: 'dor',
          //     id: 'condoList',
          //     shouldShowButton: true,
          //     useApiCount: true,
          //     // limit: 100,
          //     fields: [
          //       {
          //         label: 'OPA Account',
          //         value: function(state, item) {
          //           var url = window.location.origin + window.location.pathname + '#/' + item.properties.opa_account_num + '/opa'
          //           return "<a href="+url+">"+item.properties.opa_account_num+" <i class='fa fa-external-link-alt'></i></a>";
          //         },
          //       },
          //       {
          //         label: 'Address',
          //         value: function(state, item) {
          //           var url = window.location.origin + window.location.pathname + '#/' + item.properties.opa_account_num + '/opa'
          //           return "<a href="+url+">"+item.properties.street_address+" <i class='fa fa-external-link-alt'></i></a>";
          //         },
          //       },
          //       {
          //         label: 'Owners',
          //         value: function(state, item) {
          //           var owners = item.properties.opa_owners;
          //           var ownersJoined = owners.join(', ');
          //           return ownersJoined;
          //         }
          //       }
          //     ], // end fields
          //     // sort: {
          //     //   // this should return the val to sort on
          //     //   getValue: function(item) {
          //     //     // return item.attributes.RECORDING_DATE;
          //     //     return item.attributes.DOCUMENT_DATE;
          //     //   },
          //     //   // asc or desc
          //     //   order: 'desc'
          //     // }
          //   },
          //   slots: {
          //     title: 'Condominiums',
          //     highestPageRetrieved: function(state) { return state.sources['condoList'].data.page },
          //     pageCount: function(state) { return state.sources['condoList'].data.page_count },
          //     totalSize: function(state) { return state.sources['condoList'].data.total_size },
          //     items: function(state) {
          //       var data = state.sources['condoList'].data.features;
          //       var rows = data.map(function(row){
          //         var itemRow = row;
          //         return itemRow;
          //       });
          //       return rows;
          //     },
          //   } // end slots
          // },

          //     ]
          //   }
          // },
          // REVIEW this callout should only show up when the condos tab
          // is visible. commenting out for now.
          // {
          //   type: 'callout',
          //   slots: {
          //     text: 'Condominium units associated with this parcel.\
          //       This list may differ from the Condominiums tab above based\
          //       on how the deed was recorded. Source: Department of Records'
          //   },
          // },
          {
            type: 'horizontal-table',
            options: {
              topicKey: 'deeds',
              id: 'dorCondoList',
              defaultIncrement: 10,
              showAllRowsOnFirstClick: true,
              showOnlyIfData: true,
              fields: [
                {
                  label: 'Condo Parcel',
                  value: function(state, item) {
                    return item.recmap + '-' + item.condoparcel;
                  },
                },
                {
                  label: 'Condo Name',
                  value: function(state, item) {
                    // return item.attributes.RECORDING_DATE;
                    return item.condo_name;
                  },
                },
                {
                  label: 'Unit #',
                  value: function(state, item) {
                    return 'Unit #' + item.condounit;
                  },
                },
                // {
                //   label: 'Grantor',
                //   value: function(state, item) {
                //     return item.attributes.GRANTORS;
                //   },
                // },
                // {
                //   label: 'Grantee',
                //   value: function(state, item) {
                //     return item.attributes.GRANTEES;
                //   },
                // },
              ], // end fields
              sort: {
                // this should return the val to sort on
                getValue: function(item) {
                  // return item.attributes.RECORDING_DATE;
                  return item.condounit;
                },
                // asc or desc
                order: 'asc',
              },
            },
            slots: {
              title: 'Deeded Condominiums',
              items: function (state, item) {
                var id = item.properties.OBJECTID,
                  target = state.sources.dorCondoList.targets[id],
                  data = target && target.data,
                  rows = (data && data.rows) || [];

                return rows;
              },
            }, // end slots
          }, // end condos table

          {
            type: 'callout',
            slots: {
              text: 'The list of documents \
                shown below may not be a complete history of title to this \
                parcel. The list is based solely on documents recorded from\
                December 1999 forward where those documents contained street addresses\
                in the original recorded document.\
                <br> <br> \
               Discrepancies are indicated for deed documents from May, 2018 \
               to present. Discrepancy details may be accessed by clicking on \
               the link in the ID field.\
              ',
            },
          },

          {
            type: 'horizontal-table',
            options: {
              topicKey: 'deeds',
              id: 'dorDocuments',
              defaultIncrement: 25,
              fields: [
                {
                  label: 'ID',
                  value: function (state, item) {
                    return "<a target='_blank' href='http://pdx-app01.city.phila.local/recorder/eagleweb/viewDoc.jsp?node=DOCC"+item.attributes.DOCUMENT_ID+"'>"+item.attributes.DOCUMENT_ID+"<i class='fa fa-external-link-alt'></i></a>";
                    // return "<a target='_blank' href='http://pdx-app01.city.phila.local/recorder/eagleweb/viewDoc.jsp?node=DOCC"+item.attributes.R_NUM+"'>"+item.attributes.R_NUM+"<i class='fa fa-external-link-alt'></i></a>"
                  },
                },
                {
                  label: 'Date',
                  value: function (state, item) {
                    // return item.attributes.RECORDING_DATE;
                    return item.attributes.DISPLAY_DATE;
                  },
                  nullValue: 'no date available',
                  transforms: [
                    'date',
                  ],
                },
                {
                  label: 'Type',
                  value: function (state, item) {
                    return item.attributes.DOCUMENT_TYPE;
                  },
                },
                {
                  label: 'Grantor',
                  value: function (state, item) {
                    return item.attributes.GRANTORS;
                  },
                },
                {
                  label: 'Grantee',
                  value: function (state, item) {
                    return item.attributes.GRANTEES;
                  },
                },
                {
                  label: 'Discrepancy',
                  value: function (state, item) {
                    return item.attributes.DISCREPANCY;
                  },
                },
              ], // end fields
              sort: {
                // this should return the val to sort on
                getValue: function (item) {
                  // return item.attributes.RECORDING_DATE;
                  return item.attributes.DISPLAY_DATE;
                },
                // asc or desc
                order: 'desc',
              },
            },
            slots: {
              title: 'Documents',
              // defaultIncrement: 25,
              items: function (state, item) {
                var id = item.properties.OBJECTID;
                if (state.sources.dorDocuments.targets[id]) {
                  return state.sources.dorDocuments.targets[id].data;
                }
                return [];

              },
            }, // end slots

            // slots: {
            //   title: 'Condominiums',
            //   highestPageRetrieved: function(state) { return state.sources['condoList'].data.page },
            //   pageCount: function(state) { return state.sources['condoList'].data.page_count },
            //   totalSize: function(state) { return state.sources['condoList'].data.total_size },
            //   items: function(state) {
            //     var data = state.sources['condoList'].data.features;
            //     var rows = data.map(function(row){
            //       var itemRow = row;
            //       return itemRow;
            //     });
            //     return rows;
            //   },
            // } // end slots

          }, // end docs table
        ], // end parcel tab content comps
      }, // end parcel tab options
      slots: {
        items: function(state) {
          // return state.dorParcels.data;
          return state.parcels.dor.data;
        },
      },
    }, // end dor parcel tab group comp
    {
      type: 'callout',
      slots: {
        text: '\
          Use the buttons below to view images of hard-copy deed maps, some\
          of which have handwritten information that may be useful for\
          historical deed research.\
        ',
      },
    },
    {
      type: 'overlay-toggle-group',
      options: {
        getKey: function(item) {
          return item.properties.RECMAP;
        },
      },
      slots: {
        title: 'Registry Maps',
        items: function(state) {
          return state.sources.regmaps.data;
        },
      },
    },
    // {
    //   type: 'callout',
    //   slots: {
    //     text: 'The property boundaries displayed on the map are for reference only and may not be used in place of recorded deeds or land surveys. Source: Department of Records.'
    //   }
    // }
  ], // end deeds comps
  // basemap: 'dor',
  identifyFeature: 'dor-parcel',
  // identifyFeature: 'address-marker',
  // we might not need this anymore, now that we have identifyFeature
  parcels: 'dor',
  // parcels: 'pwd'
  imageOverlayGroup: 'regmaps',
};
