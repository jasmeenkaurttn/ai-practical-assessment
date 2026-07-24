import type { ApiError } from '@shared/types';

const API_BASE = '/api';

export class ApiRequestError extends Error {
  statusCode: number;
  details?: string[];

  constructor(message: string, statusCode: number, details?: string[]) {
    super(message);
    this.name = 'ApiRequestError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();

  if (!text) {
    throw new ApiRequestError(
      response.ok
        ? 'Empty response from server'
        : 'API server is unavailable. Run npm run dev from the project root.',
      response.status || 503
    );
  }

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new ApiRequestError('Invalid response from server', response.status);
  }

  if (!response.ok) {
    const error = data as ApiError;
    throw new ApiRequestError(
      error.error?.message ?? 'Request failed',
      error.error?.statusCode ?? response.status,
      error.error?.details
    );
  }

  return data as T;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE}${path}`, init);
  } catch {
    throw new ApiRequestError(
      'Cannot reach API server. Make sure npm run dev is running.',
      0
    );
  }

  return handleResponse<T>(response);
}

export async function apiGet<T>(path: string): Promise<T> {
  return request<T>(path);
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export async function apiDelete(path: string): Promise<void> {
  return request<void>(path, { method: 'DELETE' });
}
