import React from 'react';

export const GrillesAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/grilles',
         component: React.lazy(() => import('./GrillesApp'))
      }
   ]
};
