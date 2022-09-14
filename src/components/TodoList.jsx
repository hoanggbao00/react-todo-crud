import Todo from './Todo';

export default function TodoList({ todoList, onCompletedHandle, onDeleteHandle, onEnter}) {
  

  return (
    <div className="todo-list">
      {todoList.map(item => {
        return <Todo 
                key={item.id}
                todo={item}
                onCompletedHandle={onCompletedHandle}
                onDeleteHandle={onDeleteHandle}
                onEnter={onEnter}
              />
      })}
    </div>
  )
};
