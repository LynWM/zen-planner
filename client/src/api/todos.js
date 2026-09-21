const BASE_URL = import.meta.env.VITE_API_URL;

// Small helper so every function doesn't repeat the same
// "check response.ok, throw if not, parse JSON" dance.
async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }

  // DELETE returns 204 No Content — nothing to parse.
  if (res.status === 204) return null;

  return res.json();
}

export function getTodos() {
  return request('/api/todos');
}

export function createTodo(title) {
  return request('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
}

export function updateTodo(id, updates) {
  return request(`/api/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export function deleteTodo(id) {
  return request(`/api/todos/${id}`, {
    method: 'DELETE',
  });
}