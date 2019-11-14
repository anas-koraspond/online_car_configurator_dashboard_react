import React from 'react';

export const WheelsAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/wheels',
         component: React.lazy(() => import('./WheelsApp'))
      }
   ]
};
