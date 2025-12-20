
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/registration"
  },
  {
    "renderMode": 2,
    "route": "/orders"
  },
  {
    "renderMode": 2,
    "route": "/flow-board"
  },
  {
    "renderMode": 0,
    "route": "/patient-info/*"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/logout"
  },
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 24812, hash: 'feb2d9ad46361bb75b4ea42541c52d139132a8cc275fef22caef1a62d21a1c61', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17222, hash: 'b80570b8ed0b3c4053a65d31b807ff2a288db9f71170b68a937828bcbef5a768', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'orders/index.html': {size: 31207, hash: 'fb0b263bcd619c185f2cbb6795077e0fb63a60f602e86baaf5d446d665e73714', text: () => import('./assets-chunks/orders_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 31207, hash: '2902d4c9b871832542707616bca5c65c5e4db8fd050d6a1502ffc2944145af20', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'flow-board/index.html': {size: 31207, hash: '398c70b047ad90516457a797f5a2a99f12b57677e1d541e258ba45aa0167faf9', text: () => import('./assets-chunks/flow-board_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 31207, hash: 'fb0b263bcd619c185f2cbb6795077e0fb63a60f602e86baaf5d446d665e73714', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'registration/index.html': {size: 31207, hash: 'fb0b263bcd619c185f2cbb6795077e0fb63a60f602e86baaf5d446d665e73714', text: () => import('./assets-chunks/registration_index_html.mjs').then(m => m.default)},
    'logout/index.html': {size: 31207, hash: 'fb0b263bcd619c185f2cbb6795077e0fb63a60f602e86baaf5d446d665e73714', text: () => import('./assets-chunks/logout_index_html.mjs').then(m => m.default)},
    'styles-ZK3N7HDU.css': {size: 8372, hash: '8/LtCGNtWyg', text: () => import('./assets-chunks/styles-ZK3N7HDU_css.mjs').then(m => m.default)}
  },
};
