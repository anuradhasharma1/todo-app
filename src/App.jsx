import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { RiEditBoxLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';



function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)

  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id == id;

    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }



  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-pink-200 min-h-[80vh] md:w-[35%]">
        <h1 className=' font-extrabold text-center text-3xl bg-pink-300 text-black rounded-3xl  py-6 '>TɨckIt-Add tasks, track progress </h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className=' text-2xl font-bold hover:underline '>Add a Task+</h2>
          <div className=' flex'>
            <input onChange={handleChange} value={todo} type="text"
              className='bg-white rounded-full w-full px-5 py-2' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className=' bg-black hover:bg-white  text-sm text-white  hover:text-black disabled:bg-black disabled:text-white p-4 py-2  font-bold cursor-pointer mx-2 rounded-full '>Save</button>
          </div>
        </div>
        <input className=' my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Completed Tasks 
        <hr />
        <h2 className=' text-lg font-bold my-4'>Your Daily Tasks </h2>

        <div className="todos ">
          {todos.length === 0 && <div className=' m-5'>No Tasks To Display </div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex items-center  my-3 justify-between">
              <div className=' flex gap-6'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id='' />
                <div className={item.isCompleted ? "line-through" : ""}> {item.todo} </div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className=' bg-black hover:bg-white p-2 py-1 text-sm text-white rounded-md hover:text-black   font-bold  mx-1 cursor-pointer '><RiEditBoxLine /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className=' bg-black hover:bg-white p-2 py-1 text-sm text-white rounded-md hover:text-black   font-bold  mx-1 cursor-pointer' ><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
