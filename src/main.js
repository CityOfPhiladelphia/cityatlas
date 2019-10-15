/*
_________ .__  __            _____   __  .__
\_   ___ \|__|/  |_ ___.__. /  _  \_/  |_|  | _____    ______
/    \  \/|  \   __<   |  |/  /_\  \   __\  | \__  \  /  ___/
\     \___|  ||  |  \___  /    |    \  | |  |__/ __ \_\___ \
 \______  /__||__|  / ____\____|__  /__| |____(____  /____  >
        \/          \/            \/               \/     \/
*/

// import * as Sentry from '@sentry/browser';
// Sentry.init({ dsn: 'https://bbd37729e48142faaefba93ff32e3c14@sentry.io/1331835' });

// turn off console logging in production
const { hostname='' } = location;
if (hostname !== 'localhost' && !hostname.match(/(\d+\.){3}\d+/)) {
  console.log = console.info = console.debug = console.error = function () {};
}

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDotCircle } from '@fortawesome/free-regular-svg-icons/faDotCircle';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook';
import { faWrench } from '@fortawesome/free-solid-svg-icons/faWrench';
import { faUniversity } from '@fortawesome/free-solid-svg-icons/faUniversity';
import { faGavel } from '@fortawesome/free-solid-svg-icons/faGavel';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import { faLandmark } from '@fortawesome/free-solid-svg-icons/faLandmark';
import { faBuilding } from '@fortawesome/free-solid-svg-icons/faBuilding';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faTint } from '@fortawesome/free-solid-svg-icons/faTint';
import { faClone } from '@fortawesome/free-solid-svg-icons/faClone';
library.add(faDotCircle, faHome, faBook, faWrench, faUniversity, faGavel, faMapMarkerAlt, faLandmark, faBuilding, faPhone, faTint, faClone);

import accounting from 'accounting';
import mapboard from '@philly/mapboard/src/main.js';

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
import assessmentHist from './data-sources/assessment-history';
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
import sanitationCenters from './data-sources/sanitation-centers';
import streetClosures from './data-sources/street-closures';
import stormwater from './data-sources/stormwater';
import stormwaterCap from './data-sources/stormwater-cap';
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

var BASE_CONFIG_URL = 'https://cdn.jsdelivr.net/gh/cityofphiladelphia/mapboard-default-base-config@6126861722cee9384694742363d1661e771493b9/config.js';

// configure accounting.js
accounting.settings.currency.precision = 0;

let pictApiKey, pictSecretKey;
const host = window.location.hostname;
if (host === 'cityatlas-dev.phila.gov') {
  pictApiKey = process.env.VUE_APP_DEV_PICTOMETRY_API_KEY;
  pictSecretKey = process.env.VUE_APP_DEV_PICTOMETRY_SECRET_KEY;
} else {
  pictApiKey = process.env.VUE_APP_PICTOMETRY_API_KEY;
  pictSecretKey = process.env.VUE_APP_PICTOMETRY_SECRET_KEY;
}

mapboard({
  // defaultAddress: '1234 MARKET ST',
  panels: [
    'topics',
    'map',
  ],
  router: {
    enabled: true,
  },
  defaultAddressTextPlaceholder: {
    // text: "Search Address or 9-digit OPA Property Number",
    wideStyle: {
      'max-width': '100%',
      'font-size': '24px',
      'line-height': '28px',
    },
    narrowStyle: {
      'max-width': '100%',
      'font-size': '20px',
      'line-height': '24px',
    },
  },
  geolocation: {
    enabled: false,
    icon: [ 'far', 'dot-circle' ],
  },
  addressInput: {
    width: 415,
    mapWidth: 300,
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
    recordingsUrl: 'https://atlas.cyclomedia.com/Recordings/wfs',
    username: process.env.VUE_APP_CYCLOMEDIA_USERNAME,
    password: process.env.VUE_APP_CYCLOMEDIA_PASSWORD,
    apiKey: process.env.VUE_APP_CYCLOMEDIA_API_KEY,
  },
  pictometry: {
    enabled: true,
    iframeId: 'pictometry-ipa',
    apiKey: pictApiKey,
    secretKey: pictSecretKey,
  },
  transforms,
  greeting,
  dataSources: {
    threeOneOne,
    threeOneOneCarto,
    assessmentHist,
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
    sanitationCenters,
    streetClosures,
    stormwater,
    stormwaterCap,
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
    districts,
  ],
  components: [
    {
      type: 'topic-set',
      options: {
        defaultTopic: 'property',
      },
    },
  ],
});
