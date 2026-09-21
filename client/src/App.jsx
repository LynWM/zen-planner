import { useState, useEffect } from 'react';
import * as api from './api/todos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getTodos()
      .then(setTodos)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(title) {
    const newTodo = await api.createTodo(title);
    setTodos((prev) => [newTodo, ...prev]);
  }

  async function handleToggle(todo) {
    const nextCompleted = !todo.completed;
    setTodos((prev) => 
      prev.map((t) => (t.id === todo.id ? { ...t, completed: nextCompleted} : t))
    );

    try {
      await api.updateTodo(todo.id, { completed: nextCompleted });
    } catch (err) {
      setTodos((prev) => 
        prev.map((t) => (t.id === todo.id ? { ...t, completed: todo.completed} : t))  
      );
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    const previous = todos;
    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      await api.deleteTodo(id);
    } catch (err) {
      setTodos(previous);
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex justify-center px-6 py-20 bg-accent/55">
      
      <div className='w-full max-w-lg'>
        <header className='mb-10'>
          <h1 className='font-display text-4xl font-medium'>
            My Day
          </h1>
          <p className='mt-1 text-ink-soft text-base'>
            in a nutshell!
          </p>
        </header>

        <div className='rounded-2xl bg-surface/80 px-6 shadow-sm'>
          <div className='pt-4'>
            <TodoForm onAdd={handleAdd} />
          </div>
        </div>

        <div className='rounded-2xl bg-surface/80 py-2 shadow-sm mt-10'>
          {loading ? (
            <p className='py-8 text-center text-ink-soft text-base'>
              Loading...
            </p>
          ) : (
            <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
          )}
        </div>

        {error && (
          <p className='mt-4 text-base text-danger'>
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
