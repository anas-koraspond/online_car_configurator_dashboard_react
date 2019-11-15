import React from 'react';

export const AdditionalLightsAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/additionallights',
         component: React.lazy(() => import('./AdditionalLightsApp'))
      }
   ]
};
