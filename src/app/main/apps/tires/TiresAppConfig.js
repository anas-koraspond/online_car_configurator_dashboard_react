import React from 'react';

export const TiresAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/tires',
         component: React.lazy(() => import('./TiresApp'))
      }
   ]
};
