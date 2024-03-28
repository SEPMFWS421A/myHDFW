// todo.service.js
const BASE_URL = 'https://imaginary-todos-api.com/api/v1/todos';

export async function fetchTodoList({ token }) {
  return (await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })).json();
}

export async function createTodo({ token, todo }) {
  return (await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })).json();
}

// todos.service.spec.js
import { describe, test, expect, vi } from 'vitest';
import { createTodo, fetchTodoList } from './todo.service';

global.fetch = vi.fn();

function createFetchResponse(data) {
  return {
    json: () => new Promise((resolve) => resolve(data)),
  };
}

describe('Todo Service', () => {
  test('makes a GET request to fetch todo list and returns the result', async () => {
    const todoListResponse = [
      { title: 'Unit test', done: false },
    ];
    const token = 'token';

    fetch.mockResolvedValue(createFetchResponse(todoListResponse));

    const todoList = await fetchTodoList({ token });

    expect(fetch).toHaveBeenCalledWith(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(todoList).toStrictEqual(todoListResponse);
  });
});
