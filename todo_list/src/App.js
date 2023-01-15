import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing ] = React.useState(null);
  const [editingText, setEditingText] = React.useState(""); 

  React.useEffect(()=>{
      const json = localStorage.getItem('todos');
      const loadedTodos = JSON.parse(json);

      if(loadedTodos)
        setTodos(loadedTodos);
  },[]);

  React.useEffect(()=>{
      const json = JSON.stringify(todos);
      localStorage.setItem('todos',json);
  },[todos]);

  function handleSubmit(e){
      e.preventDefault();

      const newTodo = {
          id: new Date().getTime(),
          text:todo.trim(),
          completed:false
      };

      if(newTodo.text.length > 0){
          setTodos([...todos].concat(newTodo));
          setTodo("");
      }else{
          alert("Enter Valid Task");
          setTodo("");
      }
  }

  function deleteTask(id){
      setTodos([...todos].filter(item=>item.id !== id));
  }

  function toggleComplete(id){
      setTodos([...todos].map(todo=>
        {
            if(todo.id === id)
                todo.completed = !todo.completed;
            return todo;
        }))
  }

  function editTask(id){
      setTodos([...todos].map(todo=>{
          if(todo.id === id && editingText.length > 0){
              todo.text = editingText;
              //setEditingText('');
          }
          return todo;
      }));

      setTodoEditing(null);
  }


return(
<div id ="todo-list">
    <h1>Todo List</h1>
    <form onSubmit={handleSubmit}>
        <input 
            type ="text"
            onChange = {e => setTodo(e.target.value)}
            placeholer = 'Add a new task'
            value = {todo}
        />
        <button type ="submit">Add Todo</button>
    </form>
    {todos.map(todo => (
      <div key={todo.id} className='todo'>
          <div className='todo-text'>
            <input type='checkbox' id='completed' checked={todo.completed} onChange={()=>toggleComplete(todo.id)}></input>
            {todo.id === todoEditing?
              (<input type='text' onChange = {e=> setEditingText(e.target.value)}/>)
              : (<div>{todo.text}</div>)}
          </div>
          <div className='todo-actions'>
              {todo.id === todoEditing ? 
              (<button onClick={()=>editTask(todo.id)}>Submit Edits</button>)
              :
              (<button onClick={()=> setTodoEditing(todo.id)}>Edit</button>)
              }
             <button onClick= {()=> deleteTask(todo.id)}>Delete</button>
         </div>
      </div>
    ))}
   </div>
  );
};

export default App;
