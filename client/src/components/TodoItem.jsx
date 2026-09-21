import { Trash } from 'lucide-react';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="group flex items-center gap-3 px-5  py-3">
      <button
        onClick={() => onToggle(todo)}
        aria-label={todo.completed ? 'Mark as not done' : 'Mark as done'}
        className={`h-4 w-4 shrink-0  border transition-colors ${
          todo.completed
            ? 'bg-ink/60 border-accent'
            : 'border-line hover:border-accent'
        }`}
      />

      <span
        className={`flex-1 text-[15px] ${
          todo.completed ? 'text-ink-soft line-through' : 'text-ink'
        }`}
      >
        {todo.title}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
        className="text-ink-soft/60 opacity-0 transition-opacity hover:text-danger group-hover:opacity-100"
      >
        <Trash size={16}/>
      </button>
    </li>
  );
}