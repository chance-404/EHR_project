
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
    'index.csr.html': {size: 24812, hash: '330e3c0eb207836363cc05a28fcddef5da56317ead0b8d569df31b44db5d975f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17222, hash: 'bc9a3934d1d2f75407ec38c4ad9eca9853afc3188ed8b4f32a0d41104b4ab849', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'logout/index.html': {size: 30891, hash: '9f4a8c407bb789371edc3be38df7cc1fdd36e41d5db3fb7077ce8510eade4cab', text: () => import('./assets-chunks/logout_index_html.mjs').then(m => m.default)},
    'flow-board/index.html': {size: 30891, hash: '298358341a4b1ca24f118bfb7e422bdd74f154f15fe303aa726b819657a6352b', text: () => import('./assets-chunks/flow-board_index_html.mjs').then(m => m.default)},
    'registration/index.html': {size: 30891, hash: '9f4a8c407bb789371edc3be38df7cc1fdd36e41d5db3fb7077ce8510eade4cab', text: () => import('./assets-chunks/registration_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 30891, hash: '7fe97ebf6e12823a1193f7fd40f5d930dd54765445813c039f884526677d9527', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 30891, hash: '9f4a8c407bb789371edc3be38df7cc1fdd36e41d5db3fb7077ce8510eade4cab', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'orders/index.html': {size: 30891, hash: '9f4a8c407bb789371edc3be38df7cc1fdd36e41d5db3fb7077ce8510eade4cab', text: () => import('./assets-chunks/orders_index_html.mjs').then(m => m.default)},
    'styles-ZK3N7HDU.css': {size: 8372, hash: '8/LtCGNtWyg', text: () => import('./assets-chunks/styles-ZK3N7HDU_css.mjs').then(m => m.default)}
  },
};
