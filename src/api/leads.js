import { request } from './client.js';

export function getLeads(status) {
  const query = status ? `?status=${encodeURIComponent(status)}` : '';
  return request(`/api/leads${query}`);
}

export function getLeadById(id) {
  return request(`/api/leads/${id}`);
}

export function updateLeadStatus(id, status) {
  return request(`/api/leads/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}