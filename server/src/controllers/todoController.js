const db = require('../db');

// Convert the SQLite integer (0/1) representation of `completed`
// into a real boolean before sending it to the client.
function serialize(todo) {
  return { ...todo, completed: !!todo.completed };
}

function getAllTodos(req, res) {
  const todos = db
    .prepare('SELECT * FROM todos ORDER BY created_at DESC')
    .all();
  res.json(todos.map(serialize));
}

function createTodo(req, res) {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const stmt = db.prepare('INSERT INTO todos (title) VALUES (?)');
  const info = stmt.run(title.trim());

  const todo = db
    .prepare('SELECT * FROM todos WHERE id = ?')
    .get(info.lastInsertRowid);

  res.status(201).json(serialize(todo));
}

function updateTodo(req, res) {
  const { id } = req.params;
  const { title, completed } = req.body;

  const existing = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const newTitle = title !== undefined ? title : existing.title;
  const newCompleted =
    completed !== undefined ? (completed ? 1 : 0) : existing.completed;

  db.prepare('UPDATE todos SET title = ?, completed = ? WHERE id = ?').run(
    newTitle,
    newCompleted,
    id
  );

  const updated = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
  res.json(serialize(updated));
}

function deleteTodo(req, res) {
  const { id } = req.params;

  const existing = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  db.prepare('DELETE FROM todos WHERE id = ?').run(id);
  res.status(204).send();
}

module.exports = { getAllTodos, createTodo, updateTodo, deleteTodo };