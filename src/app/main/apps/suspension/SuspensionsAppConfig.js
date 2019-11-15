import React from 'react';

export const SuspensionsAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/suspensions',
         component: React.lazy(() => import('./SuspensionsApp'))
      }
   ]
};
