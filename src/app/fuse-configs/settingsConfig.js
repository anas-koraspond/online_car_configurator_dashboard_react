const settingsConfig = {
   layout: {
      style: 'layout1', // layout-1 layout-2 layout-3
      config: {} // checkout default layout configs at app/fuse-layouts for example  app/fuse-layouts/layout1/Layout1Config.js
   },
   customScrollbars: true,
   theme: {
      main: 'default',
      navbar: 'mainThemeDark',
      toolbar: 'mainThemeLight',
      footer: 'mainThemeDark'
   },
   // apiServerURL: 'http://54.172.22.179:4000' // Production Environment
   apiServerURL: 'http://localhost:4000' // Test Environment
};

export default settingsConfig;