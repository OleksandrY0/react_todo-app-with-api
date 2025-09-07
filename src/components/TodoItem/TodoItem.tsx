import React from 'react';
import { Todo } from '../../types/Todo';
import '../../styles/spinner.scss';

interface Props {
  todo: Todo;
  handleDelete: (todo: Todo) => void;
  deletingIds: number[];
  handleToggle: (todo: Todo) => void;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  editingTitle: string;
  setEditingTitle: (title: string) => void;
  handleChangeTodo: (todo: Todo, editingTitle: string) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  handleDelete,
  deletingIds,
  handleToggle,
  editingId,
  setEditingId,
  editingTitle,
  setEditingTitle,
  handleChangeTodo,
}) => {
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleChangeTodo(todo, editingTitle);
      setEditingId(null);
    }

    if (event.key === 'Escape') {
      setEditingId(null);
      setEditingTitle('');
    }
  };

  return (
    <div
      data-cy="Todo"
      className={`todo ${todo.completed ? 'completed' : ''} ${todo.loading || deletingIds.includes(todo.id) ? 'loading' : ''}`}
    >
      <label
        className="todo__status-label"
        htmlFor={`todo-${todo.id}`}
        aria-labelledby={`todo-title-${todo.id}`}
      >
        <input
          id={`todo-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleToggle(todo)}
          // readOnly
        />
      </label>

      {editingId === todo.id ? (
        <input
          value={editingTitle}
          onChange={event => setEditingTitle(event.target.value)}
          onBlur={() => handleChangeTodo(todo, editingTitle)}
          onKeyDown={event => handleOnKeyDown(event)}
          autoFocus
          className="todoapp__new-todo todo__title"
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            setEditingId(todo.id);
            setEditingTitle(todo.title);
          }}
        >
          {todo.title}
        </span>
      )}

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => handleDelete(todo)}
      >
        ×
      </button>

      {(todo.loading || deletingIds.includes(todo.id)) && (
        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}
    </div>
  );
};
