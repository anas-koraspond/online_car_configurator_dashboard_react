import React from 'react';

export const HoodsAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/hoods',
         component: React.lazy(() => import('./HoodsApp'))
      }
   ]
};
