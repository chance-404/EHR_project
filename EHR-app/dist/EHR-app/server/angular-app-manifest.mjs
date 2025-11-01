
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
    'index.csr.html': {size: 24812, hash: 'd5de937ea9cc801167fe909e72ed98530606f274e106a441b3209beb9a033f18', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17222, hash: 'fc0f7cb8d72439ecf7a957959aebff2562cb5b0a67f5e6cfd0a5be4495bc6117', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 31207, hash: '5ff07bb27f3c8e0af307192646830a159abc73b896d78abbdd065c4922f85290', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 31207, hash: '9f6441e777458eb4a701ac11dd8ec316f7a9014f7c99c96244df4f8e2b53dd68', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'registration/index.html': {size: 31207, hash: '5ff07bb27f3c8e0af307192646830a159abc73b896d78abbdd065c4922f85290', text: () => import('./assets-chunks/registration_index_html.mjs').then(m => m.default)},
    'logout/index.html': {size: 31207, hash: '5ff07bb27f3c8e0af307192646830a159abc73b896d78abbdd065c4922f85290', text: () => import('./assets-chunks/logout_index_html.mjs').then(m => m.default)},
    'orders/index.html': {size: 31207, hash: '5ff07bb27f3c8e0af307192646830a159abc73b896d78abbdd065c4922f85290', text: () => import('./assets-chunks/orders_index_html.mjs').then(m => m.default)},
    'flow-board/index.html': {size: 31207, hash: '7abef1dc95e2edf251530ca76ce5a9a5443a46c3b8dc04102ec63487806d7599', text: () => import('./assets-chunks/flow-board_index_html.mjs').then(m => m.default)},
    'styles-ZK3N7HDU.css': {size: 8372, hash: '8/LtCGNtWyg', text: () => import('./assets-chunks/styles-ZK3N7HDU_css.mjs').then(m => m.default)}
  },
};
