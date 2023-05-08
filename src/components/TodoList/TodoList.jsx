import React, { useEffect, useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from './../Todo/Todo';
import styles from './TodoList.module.css';

export default function TodoList({ filter }) {
  const [todos, setTodos] = useState(() => {
    return localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos'))
      : [];
  });

  const handleAdd = (todo) =>
    // 새로운 투두를 todos 배열에 업데이트
    setTodos([...todos, todo]);

  const handleUpdate = (update) =>
    setTodos(todos.map((t) => (t.id === update.id ? update : t)));

  const handleDelete = (deleted) =>
    setTodos(todos.filter((t) => t.id !== deleted.id));

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filtered = getFilteredItems(todos, filter);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}

function getFilteredItems(todos, filter) {
  if (filter === 'all') return todos;
  return todos.filter((t) => t.status === filter);
}
