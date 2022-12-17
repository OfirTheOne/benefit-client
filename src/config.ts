import { browserRequirementsConfigsType } from './types/browser-requirements/browsers-requirments';

// user OS && browser minimum requirements
const browsersMinVersions: browserRequirementsConfigsType = {
  mac: {
    safari: 13,
    chrome: 78,
  },
  windows: {
    chrome: 78,
    firefox: 67,
    edge: 18,
  },
  ios: {
    safari: 13,
    chrome: 78,
  },
  android: {
    chrome: 78
  }
};

if (!window.env) {
  window.env = {
    C3PO_HOST: 'http://localhost',
    C3PO_PORT: '4000',
    ROUTER_BASE_PREFIX: '/',
    API_VERSION: 'api/v1',
    BROWSER_REQUIREMENTS: browsersMinVersions
  };
}
const c3poBaseUrl = `${window.env.C3PO_HOST}:${window.env.C3PO_PORT}${window.env.ROUTER_BASE_PREFIX}${window.env.API_VERSION}`;

const Config = {
  routerBasePrefix: window.env.ROUTER_BASE_PREFIX,
  c3poHost: window.env.C3PO_HOST,
  c3poPort: window.env.C3PO_PORT,
  c3poBaseUrl,
  sendLogsApi: `${c3poBaseUrl}/client-logger/logs`,
  teamsApi: `${c3poBaseUrl}/groups`,
  userProfileApi: `${c3poBaseUrl}/users`,
  incidentsApi: `${c3poBaseUrl}/incidents`,
  respondersApi: `${c3poBaseUrl}/users`,
  messagesApi: `${c3poBaseUrl}/messages`,
  loginApi: `${c3poBaseUrl}/login`,
  workspacesApi: `${c3poBaseUrl}/workspaces`,
  remoteLogLevel: window.env.REMOTE_LOG_LEVEL || 'debug',
  logLevel: window.env.LOG_LEVEL || 'debug',
  myProfileUrl: 'https://profilemgt.firstnet.att.com/icam-firstnet/my-profile-view-only',
  protectedResourcesApi: '/mocks/protected-resources.json',
  browsersMinVersions: window.env.BROWSER_REQUIREMENTS
};
export default Config;

declare global {
  export interface Window {
    env: {
      ROUTER_BASE_PREFIX: string;
      BROWSER_REQUIREMENTS: browserRequirementsConfigsType;
      C3PO_HOST?: string;
      C3PO_PORT?: string;
      API_VERSION?: string;
      REMOTE_LOG_LEVEL?: string;
      LOG_LEVEL?: string;
    };
  }
}
