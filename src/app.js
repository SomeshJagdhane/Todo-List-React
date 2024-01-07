import { useState } from "react";

function AddTodoPanel({todoList, setTodoList}){
    let newTodoText;
    function controlAddTodo(event){
      event.preventDefault();
      if(!newTodoText)return;
      const newTodo={
        text:newTodoText,
        checked:false
      }
      const newTodoList = todoList.slice();
      newTodoList.push(newTodo);
      setTodoList(newTodoList);
      event.target.reset();

      persistTodoList(newTodoList);
    }
    return (
        <form className="add-todo-panel" onSubmit={e=>controlAddTodo(e)}>
            <input type="text" className="add-todo-input" onChange={(e)=>newTodoText=e.target.value}></input>
            <button className="btn-add-todo">Add Task</button>
        </form>
    )
}

function Todo({ todoList,setTodoList,todoId }) {
  const todo = todoList[todoId];
  
  let tempText;
  function deleteTodo(id){
    const newTodoList = todoList.slice();
    newTodoList.splice(id,1);
    setTodoList(newTodoList);

    persistTodoList(newTodoList);
  }
  function toggleFinish(id){
    const newTodoList = todoList.slice();
    newTodoList[id].checked = !newTodoList[id].checked;
    setTodoList(newTodoList);
    persistTodoList(newTodoList);
  }
  function submitEditedText(id,newText){
    if(!newText){
      // newText= todo.text;
      return;
    }
    const newTodoList = todoList.slice();
    newTodoList[id].text = newText;
    setTodoList(newTodoList);
    persistTodoList(newTodoList);
  }
  return (
    <li className="todo">
      <div className="todo-left">
        <input
          type="checkbox"
          checked={todo.checked}
          className="todo-check"
          onChange={()=>toggleFinish(todoId)}
        ></input>
        <p className={`todo-text ${todo.checked ? 'finished':''}`} contentEditable onInput={e=>tempText=e.target.innerText} onBlur={()=>submitEditedText(todoId, tempText)}>{todo.text}</p>
      </div>
      <div className="todo-right">
        <button className="btn-todo-delete btn" onClick={()=>deleteTodo(todoId)}>Delete</button>
      </div>
    </li>
  );
}

function TodoList({ todoList, setTodoList }) {
  const todoListEle = [];
  todoList.forEach((todo, todoId) => {
    todoListEle.push(<Todo todoList={todoList} setTodoList={setTodoList} todoId={todoId} key={todoId} />);
  });
  return <ul className="todo-list">{todoListEle}</ul>;
}

const todoListArr = JSON.parse(localStorage.getItem(`todoList`))||[
  {
    text: `Do exercise`,
    checked: false,
  },
  {
    text: `Do Study`,
    checked: true,
  },
  {
    text: `Doctor appointment`,
    checked: false,
  },
];

function Container() {
  const [todoList, setTodoList] = useState(todoListArr);
  return (
    <div className="container">
      <h2 className="heading">My Todo List</h2>
      <AddTodoPanel todoList={todoList} setTodoList={setTodoList}/>
      <TodoList todoList={todoList} setTodoList={setTodoList}/>
    </div>
  );
}
export default function App() {
  return <Container />;
}

function persistTodoList(list){
  localStorage.setItem(`todoList`,JSON.stringify(list));
}
