import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  /* prerendering this caused ng build to error:
  The 'patient-info/:mrn' route uses prerendering and includes parameters, but 'getPrerenderParams' is missing. 
  Please define 'getPrerenderParams' function for this route in your server routing configuration 
  or specify a different 'renderMode'. */
  {
    path: 'patient-info/:mrn',
    renderMode: RenderMode.Server 
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
