
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
    'index.csr.html': {size: 24812, hash: 'a962996437ec1c048215bdf1425a6227d3aadcf2a23f226a8dc8577b3c666d3f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17222, hash: '7d88aa8b5d8eb2656a347aab38a9695a66e7899351f99119bb8ddfe08d49447b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'logout/index.html': {size: 30891, hash: '28550af9098dae0dffeb0d51a89f7bc3399110e1b071a3dfdf0fce029217c69f', text: () => import('./assets-chunks/logout_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 30891, hash: '28550af9098dae0dffeb0d51a89f7bc3399110e1b071a3dfdf0fce029217c69f', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'flow-board/index.html': {size: 30891, hash: 'eb17b43c588f00ff56ae07019992778e4450648cb172491dd968511757463a8a', text: () => import('./assets-chunks/flow-board_index_html.mjs').then(m => m.default)},
    'registration/index.html': {size: 30891, hash: '28550af9098dae0dffeb0d51a89f7bc3399110e1b071a3dfdf0fce029217c69f', text: () => import('./assets-chunks/registration_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 30891, hash: 'eb17b43c588f00ff56ae07019992778e4450648cb172491dd968511757463a8a', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'orders/index.html': {size: 30891, hash: '28550af9098dae0dffeb0d51a89f7bc3399110e1b071a3dfdf0fce029217c69f', text: () => import('./assets-chunks/orders_index_html.mjs').then(m => m.default)},
    'styles-ZK3N7HDU.css': {size: 8372, hash: '8/LtCGNtWyg', text: () => import('./assets-chunks/styles-ZK3N7HDU_css.mjs').then(m => m.default)}
  },
};
