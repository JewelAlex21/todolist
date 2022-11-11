import { UserAuth } from '../context/AuthContext'
import {  useNavigate } from 'react-router-dom'
import { set, ref, onValue, remove, update } from 'firebase/database'
import { useEffect, useRef, useState } from 'react'
import { auth, db } from '../firebase'
import { uid } from 'uid'
import './dashboard.css'

const Dashboard = () => {


  const [todo, setTodo] = useState("");
  const [desc, setDesc] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [tempUid, setTempUid] = useState("");
  const [value,setValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          console.log(data);
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);



  const { user, logOut } = UserAuth()
  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error);
    }
  }

  const writeToDatabase = async (e) => {
    e.preventDefault()
    if(todo === '' || desc === ''){
      alert('Please enter the fields');
      return
    }
    const userid = uid();
    await set(ref(db, `/${auth.currentUser.uid}/${userid}`), {
      todo: todo,
      desc: desc,
      userid: userid
    })

    setTodo("");
    setDesc("");
  }

  const handleUpdate = (todo) => {
    setEdit(true);
    setTodo(todo.todo);
    setDesc(todo.desc);
    setTempUid(todo.userid);
  }

  const handleEditConfirm = async (e) => {
    e.preventDefault();
    if(todo === '' || desc === ''){
      alert('Please enter the fields');
      return
    }
    await update(ref(db, `/${auth.currentUser.uid}/${tempUid}`), {
      todo: todo,
      desc: desc,
      tempUid: tempUid
    });

    setTodo("");
    setDesc("");
    setEdit(false);
  };

  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`))
  }

  const searchTodo = (e) =>{
    e.preventDefault();
    setTodos(todos.filter((todos)=>
      todos.todo.toLowerCase().includes(value.toLowerCase())  
    ))
  }


  return (

    // left
    <div className='dashboard'>
      <div className='logo'>
        <img src="https://i.postimg.cc/Kzc3MP3H/Vector.png" alt="" />
      </div>
      <div className='logout'>{user?.displayName ? <button className='btn btn-primary' onClick={handleSignOut} >LogOut</button> : <h1></h1>}</div>

     <div>
        <h1 className='heading'>TODO</h1>
        <p className='lorem'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non error et, enim earum ut laudantium ex inventore. 
          Pariatur odio, tempore vel, quisquam aspernatur saepe omnis possimus perferendis alias vitae fugit dignissimos!
        </p>
     </div>
      <form onSubmit={writeToDatabase}>
            <input type="text" 
            placeholder='Title'
            required
            className='title'
            value={todo} onChange={(e) => setTodo(e.target.value)} 
            />
          <input type="text" 
          placeholder='Description'
          required
          className='desc' 
          value={desc} onChange={(e) => setDesc(e.target.value)} 
         />
         {edit ? (
          <div>
            <button type='submit' className='add' onClick={handleEditConfirm}>Update</button>
          </div>
        ) : (
          <div>
            <button type='submit' className='add' >Add</button>
          </div>
        )}
      </form>
      <div className='line'></div>
    

      {/* right */}
     <div>
        <h1 className='todolist'>TODO LIST</h1>
       {/* <SearchList/> */}
       <form onSubmit={searchTodo}>
          <div className='boxContainer'>
              <table className='elementsContainer' >
                 <tr>
                    <td>
                      <input type="text"
                        className='search'
                        placeholder='Search Title'
                        onChange={(e) => setValue(e.target.value)}
                       />
                    </td> 
                    <td>
                      <button className='btn btn-white' type='submit'><i class="fa-solid fa-magnifying-glass"></i></button> 
                    </td>   
                      
                 </tr>
                 
                </table>
           </div>
           
           {todos.map((todo) =>(
                  <div className='todo'>
                  <div className=''><h5 >{todos.todo}</h5></div>
                  </div>
                  ))}
                  
          
        </form>
        

       <select class="filter">
        <option selected>Filter By</option>
        <option value="1">Completed</option>
        <option value="2">Favorite</option>
        <option value="3">Deleted</option>
      </select>
        {
          todos.map((todo) => (
            <div className='todo'>
              <div className='todotitle'><h5 >{todo.todo}</h5></div>
              <div className='tododesc'><h6 className=''>{todo.desc}</h6></div>
              <div className='hrline'></div>
              <div className='dropdown'> 
              <button className='update' onClick={() => handleUpdate(todo)} ><i class="fa-solid fa-pen-to-square"></i></button>
              <button className='delete' onClick={() => handleDelete(todo.userid)}><i class="fa-solid fa-trash"></i></button>
              </div>
              <div class="input-group mb-3">
              <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input"/>
              </div>
            </div>
            
          ))
        }
       
      </div>
     </div>
  )
}

export default Dashboard