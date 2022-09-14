import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { v4 } from 'uuid'
import './App.css';
import TodoList from './components/TodoList';

const TODO_APP_STORAGE = 'TODO_APP'

function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    const todoListStorage = localStorage.getItem(TODO_APP_STORAGE);
    if(todoListStorage)
      setTodoList(JSON.parse(todoListStorage));
  }, [])

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE,JSON.stringify(todoList));
  }, [todoList])

  const onChangeHandle = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const handleClick = useCallback((e) => {
    setTodoList([...todoList, {id: v4(), title: textInput, isCompleted: false}]);
    setTextInput('');
  }, [textInput]);

  const onCompletedHandle = useCallback((id) => {
   setTodoList(prevState => 
    prevState.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo)
   );
  }, []);

  const onDeleteHandle = useCallback((id) => {
    setTodoList(prevState => prevState.filter(todo => todo.id !== id))
  }, [todoList]);

  const onEnter = useCallback((id,title) => {
    setTodoList(prevState => 
      prevState.map(todo => todo.id === id ? {...todo, title: title} : todo)
     );
  }, [todoList]);

  return (
    <div className="App">
      <div className="input-button">
        <input
        type="text"
        id="todo-input"
        value={textInput}
        onChange={onChangeHandle}/>
        <button onClick={handleClick}>Add</button>
      </div>
      <TodoList
        todoList={todoList}
        onCompletedHandle={onCompletedHandle}
        onDeleteHandle={onDeleteHandle}
        onEnter={onEnter}
      />
    </div>
  )
}

export default App
