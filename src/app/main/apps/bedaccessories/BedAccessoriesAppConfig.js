import React from 'react';

export const BedAccessoriesAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/bedaccessories',
         component: React.lazy(() => import('./BedAccessoriesApp'))
      }
   ]
};
