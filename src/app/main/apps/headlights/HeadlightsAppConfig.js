import React from 'react';

export const HeadlightsAppConfig = {
   settings: {
      layout: {
         config: {}
      }
   },
   routes  : [
      {
         path     : '/headlights',
         component: React.lazy(() => import('./HeadlightsApp'))
      }
   ]
};
