import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function TodoForm({ onAdd }) {
    const [title, setTitle] = useState('');
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const trimmed = title.trim();
        if (!trimmed) return;

        setSubmitting(true);
        try {
            await onAdd(trimmed);
            setTitle('');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex items-center gap-3 border- border-line pb-4'>
            <span className='text-ink-soft'>
                <Plus />
            </span>

            <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a task"
                disabled={submitting}
                className='flex-1 bg-transparent outline-none placeholder:text-ink-soft/60 text-[15px]'
            />
        </form>
    );
}
