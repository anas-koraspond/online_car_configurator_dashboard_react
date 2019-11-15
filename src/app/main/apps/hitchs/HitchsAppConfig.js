import React from 'react';

export const HitchsAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/hitchs',
         component: React.lazy(() => import('./HitchsApp'))
      }
   ]
};
