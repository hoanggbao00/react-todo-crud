import { useEffect, useCallback, useState, useRef } from "react";


export default function Todo({ todo, onCompletedHandle,onDeleteHandle, onEnter }) {

  const [editState, setEditState] = useState(false);

  const newText = useRef();
  const prevText = useRef();

  
  useEffect(() => {
    newText.current.value = prevText.current.textContent;
    prevText.current.classList.toggle('editing');
    newText.current.classList.toggle('editing');
    if(!prevText.current.classList.contains('editing')) return;
    newText.current.focus();
  }, [editState])

  const onDblClick = useCallback(() => {
    setEditState(true);
  }, [])

  const onBlurHandle = () => {
    setEditState(false)
  }

  return (
    <div className="item">
      <p
        ref={prevText}
        iscompleted={todo.isCompleted ? '' : 'false'}
        onClick={() => {
          onCompletedHandle(todo.id);
        }}
        onDoubleClick={() => {
          onDblClick()
        }}
      >
        {todo.title}
      </p>
      <input
        type="text" ref={newText}
        onKeyDown={(e) => {
          if(e.code != 'Enter') return;
          onEnter(todo.id, newText.current.value);
          setEditState(false);
        }}
        onBlur={onBlurHandle}
        />
      <span onClick={() => {
        onDeleteHandle(todo.id)
      }}>
        {"X"}
      </span>
    </div>
  )
};
