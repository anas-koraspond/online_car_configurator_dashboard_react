import React from 'react';

export const ShocksAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/shocks',
         component: React.lazy(() => import('./ShocksApp'))
      }
   ]
};
