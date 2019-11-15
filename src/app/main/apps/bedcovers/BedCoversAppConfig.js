import React from 'react';

export const BedCoversAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/bedcovers',
         component: React.lazy(() => import('./BedCoversApp'))
      }
   ]
};
