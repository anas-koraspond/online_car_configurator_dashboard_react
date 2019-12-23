import React from 'react';

export const LogosAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/logos',
         component: React.lazy(() => import('./LogosApp'))
      }
   ]
};
