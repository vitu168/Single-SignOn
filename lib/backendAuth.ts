const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? 'https://note-app-backend-1-6y7y.onrender.com';

export interface BackendAuthResponse {
  userId: string;
  email: string | null;
  name: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error ?? data?.message ?? 'Request failed');
  return data as T;
}

export const backendAuth = {
  signIn: (email: string, password: string) =>
    post<BackendAuthResponse>('/api/auth/signin', { email, password }),

  signUp: (email: string, password: string, name: string) =>
    post<BackendAuthResponse>('/api/auth/signup', { email, password, name }),
};
