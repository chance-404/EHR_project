
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
    'index.csr.html': {size: 24812, hash: '39aa7041b7656f78adf9871e601a2aa2df26fe45dd92cbe1ca95db48e06c3f9d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17222, hash: '746da48f3a56666db44f610b6f28c8f25a4e752bb65e25d871ed292128ca6ed2', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'registration/index.html': {size: 31207, hash: '631bb50c5bb3b4ed397da8fa3f1dbe861459bfef28223ae37dd9d5af29e06e62', text: () => import('./assets-chunks/registration_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 31207, hash: '631bb50c5bb3b4ed397da8fa3f1dbe861459bfef28223ae37dd9d5af29e06e62', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 31207, hash: 'eab7e3a0170aa0858aec30e31e0b354bbde7c8b2ef55ca67e58223f7c414cf1c', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'flow-board/index.html': {size: 31207, hash: 'eab7e3a0170aa0858aec30e31e0b354bbde7c8b2ef55ca67e58223f7c414cf1c', text: () => import('./assets-chunks/flow-board_index_html.mjs').then(m => m.default)},
    'logout/index.html': {size: 31207, hash: '631bb50c5bb3b4ed397da8fa3f1dbe861459bfef28223ae37dd9d5af29e06e62', text: () => import('./assets-chunks/logout_index_html.mjs').then(m => m.default)},
    'orders/index.html': {size: 31207, hash: '631bb50c5bb3b4ed397da8fa3f1dbe861459bfef28223ae37dd9d5af29e06e62', text: () => import('./assets-chunks/orders_index_html.mjs').then(m => m.default)},
    'styles-ZK3N7HDU.css': {size: 8372, hash: '8/LtCGNtWyg', text: () => import('./assets-chunks/styles-ZK3N7HDU_css.mjs').then(m => m.default)}
  },
};
