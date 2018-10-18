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
import transforms from './general/transforms';
import parcels from './general/parcels';
import legendControls from './general/legendControls';
import imageOverlayGroups from './general/imageOverlayGroups';
import greeting from './general/greeting';

// data sources
import threeOneOne from './data-sources/311';
import threeOneOneCarto from './data-sources/311-carto';
import charterSchools from './data-sources/charter-schools';
import condoList from './data-sources/condo-list';
import crimeIncidents from './data-sources/crime-incidents';
import divisions from './data-sources/divisions';
import dorCondoList from './data-sources/dor-condo-list';
import dorDocuments from './data-sources/dor-documents';
import elections from './data-sources/elections';
import fireStation from './data-sources/fire-station';
import liBusinessLicenses from './data-sources/li-business-licenses';
import liInspections from './data-sources/li-inspections';
import liPermits from './data-sources/li-permits';
import liPermitsAdditional from './data-sources/li-permits-additional';
import liViolations from './data-sources/li-violations';
import nearbyZoningAppeals from './data-sources/nearby-zoning-appeals';
import opa from './data-sources/opa';
import policeDistr from './data-sources/police-distr';
import policePSA from './data-sources/police-psa';
import rco from './data-sources/rco';
import regmaps from './data-sources/regmaps';
import sanitationCenters from './data-sources/sanitation-centers';
import streetClosures from './data-sources/street-closures';
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
import districts from './topics/districts';
import safety from './topics/public-safety';
import schools from './topics/schools';
import streets from './topics/streets';
import trash from './topics/trash';
import voting from './topics/voting';

// styles
// TODO move all styles here (that have a npm package)
import 'leaflet/dist/leaflet.css';
import 'leaflet-easybutton/src/easy-button.css';
import 'leaflet-measure/dist/leaflet-measure.css';

// turn off console logging in production
// TODO come up with better way of doing this with webpack + env vars
const { hostname='' } = location;
if (hostname !== 'localhost' && !hostname.match(/(\d+\.){3}\d+/)) {
  console.log = console.info = console.debug = console.error = function () {};
}

var BASE_CONFIG_URL = 'https://cdn.jsdelivr.net/gh/ajrothwell/mapboard-base-config@74cf4692237e16757681f6860b936efd734c27d8/config.js';

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
  rootStyle: {
    position: 'absolute',
    bottom: 0,
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
    charterSchools,
    condoList,
    crimeIncidents,
    divisions,
    dorCondoList,
    dorDocuments,
    elections,
    fireStation,
    liBusinessLicenses,
    liInspections,
    liPermits,
    liPermitsAdditional,
    liViolations,
    nearbyZoningAppeals,
    opa,
    policeDistr,
    policePSA,
    rco,
    regmaps,
    sanitationCenters,
    streetClosures,
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
    safety,
    schools,
    trash,
    voting,
    streets,
    districts,
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
