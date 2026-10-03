import { request } from './client.js';

export function startScout(form) {
  return request('/api/scout', {
    method: 'POST',
    body: JSON.stringify(form),
  });
}

// Add more endpoints here as the backend team shares them, for example:
// export function getOpportunities(scoutId) {
//   return request(`/api/scout/${scoutId}/opportunities`);
// }
