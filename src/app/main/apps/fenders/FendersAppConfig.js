import React from 'react';

export const FendersAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/fenders',
         component: React.lazy(() => import('./FendersApp'))
      }
   ]
};
