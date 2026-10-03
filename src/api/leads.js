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

export function timeAgo(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return '';
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}
