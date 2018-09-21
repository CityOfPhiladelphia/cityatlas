/*
_________ .__  __            _____   __  .__
\_   ___ \|__|/  |_ ___.__. /  _  \_/  |_|  | _____    ______
/    \  \/|  \   __<   |  |/  /_\  \   __\  | \__  \  /  ___/
\     \___|  ||  |  \___  /    |    \  | |  |__/ __ \_\___ \
 \______  /__||__|  / ____\____|__  /__| |____(____  /____  >
        \/          \/            \/               \/     \/
*/

import accounting from 'accounting';
import axios from 'axios';
import moment from 'moment';
import mapboard from '@cityofphiladelphia/mapboard';


// General Config Modules
import helpers from './util/helpers';
import map from './general/map';
import parcels from './general/parcels';
import legendControls from './general/legendControls';
import transforms from './general/transforms';
import imageOverlayGroups from './general/imageOverlayGroups';
import greeting from './general/greeting';

// data sources
import threeOneOne from './data-sources/311';
import threeOneOneCarto from './data-sources/311-carto';
import condoList from './data-sources/condo-list';
import crimeIncidents from './data-sources/crime-incidents';
import dorCondoList from './data-sources/dor-condo-list';
import dorDocuments from './data-sources/dor-documents';
import liBusinessLicenses from './data-sources/li-business-licenses';
import liInspections from './data-sources/li-inspections';
import liPermits from './data-sources/li-permits';
import liPermitsAdditional from './data-sources/li-permits-additional';
import liViolations from './data-sources/li-violations';
import nearbyZoningAppeals from './data-sources/nearby-zoning-appeals';
import opa from './data-sources/opa';
import rco from './data-sources/rco';
import regmaps from './data-sources/regmaps';
import stormwater from './data-sources/stormwater';
import vacantBuilding from './data-sources/vacant-building';
import vacantIndicatorsPoints from './data-sources/vacant-indicator-points';
import vacantLand from './data-sources/vacant-land';
import zoningAppeals from './data-sources/zoning-appeals';
import zoningBase from './data-sources/zoning-base';
import zoningDocs from './data-sources/zoning-docs';
import zoningOverlay from './data-sources/zoning-overlay';

// Topics
import property from './topics/property';
import condos from './topics/condos';
import deeds from './topics/deeds';
import li from './topics/li';
import zoning from './topics/zoning';
import threeOneOneTopic from './topics/311';
import stormwaterTopic from './topics/stormwater';
import nearby from './topics/nearby';


// styles
// TODO move all styles here (that have a npm package)
import 'leaflet-measure/dist/leaflet-measure.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-easybutton/src/easy-button.css';

// turn off console logging in production
// TODO come up with better way of doing this with webpack + env vars
const { hostname='' } = location;
if (hostname !== 'localhost' && !hostname.match(/(\d+\.){3}\d+/)) {
  console.log = console.info = console.debug = console.error = function () {};
}

var BASE_CONFIG_URL = 'https://cdn.rawgit.com/ajrothwell/mapboard-base-config/ede6913302cd65ef32d7d24d4e7793b1b28f7566/config.js';

// configure accounting.js
accounting.settings.currency.precision = 0;

mapboard({
  // DEV
  // defaultAddress: '1234 MARKET ST',
  panels: [
    'topics',
    'map'
  ],
  router: {
    enabled: true
  },
  geolocation: {
    enabled: false
  },
  addressInput: {
    width: 415,
    position: 'right',
    autocompleteEnabled: false,
    autocompleteMax: 15,
    placeholder: 'Search the map',
  },
  // addressInputLocation: 'map',
  rootStyle: {
    position: 'absolute',
    bottom: 0,
    // top: '78px',
    top: '118px',
    left: 0,
    right: 0,
  },
  gatekeeperKey: helpers.GATEKEEPER_KEY,
  map,
  baseConfig: BASE_CONFIG_URL,
  parcels,
  imageOverlayGroups,
  legendControls,
  cyclomedia: {
    enabled: true,
    measurementAllowed: true,
    popoutAble: true,
  },
  pictometry: {
    enabled: true,
  },
  transforms,
  greeting,
  dataSources: {
    threeOneOne,
    threeOneOneCarto,
    condoList,
    crimeIncidents,
    dorCondoList,
    dorDocuments,
    liBusinessLicenses,
    liInspections,
    liPermits,
    liPermitsAdditional,
    liViolations,
    nearbyZoningAppeals,
    opa,
    rco,
    regmaps,
    stormwater,
    vacantBuilding,
    vacantIndicatorsPoints,
    vacantLand,
    zoningAppeals,
    zoningBase,
    zoningDocs,
    zoningOverlay,
  },
  topics: [
    property,
    condos,
    deeds,
    li,
    zoning,
    threeOneOneTopic,
    stormwaterTopic,
    nearby,
  ],
  components: [
    {
      type: 'topic-set',
      options: {
        defaultTopic: 'property'
      }
    },
  ],
});