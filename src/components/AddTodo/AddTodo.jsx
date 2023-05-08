import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './AddTodo.module.css';

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 사용자가 아무 값도 입력하지 않으면 추가되지 않도록 검사
    if (text.trim().length === 0) return;

    onAdd({ id: uuidv4(), text, status: 'active' });
    setText('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type='text'
        placeholder='Add Todo'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className={styles.button}>Add</button>
    </form>
  );
}
