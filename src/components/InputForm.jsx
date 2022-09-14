

const handleClick = () => {
  
}

export default function InputForm(params) {
  return (
    <div className="input-button">
        <input type="text" name="todo-input" id="todo-input" />
        <button onClick={handleClick}>Add</button>
    </div>
  )
};
