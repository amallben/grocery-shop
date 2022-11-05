import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import Navbar from './Navbar';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }
}
function App() {
  const [name,setName] = useState('');
  const [list,setList] = useState(getLocalStorage());
  const [isEditing,setIsEditing] = useState(false);
  const [editID,setEditID] = useState(null);
  const [alert,setAlert] = useState({show:false,msg:'',type:''});

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){ //bcs empty string is always a false value
    //display alert if value is empty
    
    showAlert(true,'danger','please enter value');
   
    
    } 
    else if(name && isEditing){
    // change value if editing
    showAlert(true,'success','itsem edited');
    setList(list.map((item)=>{
      if(item.id === editID) {
        return{...item,title:name}
      }else{
      return item}
    }))

    setEditID(null)
    setName('')
    setIsEditing(false)
    }
    else{
    //show alert success
    showAlert(true,'success','itsem added');

    //add item
      const newItem = {id:new Date().getTime().toString(),title:name};
      setList([...list,newItem]);
      setName('');
    }

  }

  const showAlert= (show=false,type="",msg="") => {//if now value is passed for show it will be false es6
    setAlert({show,type,msg});

  }

  const deleteItems = () => {
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true,'danger','item removed')
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item)=> item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)

  }

  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])
  return (
    <>
    <Navbar/>
  <section className='section-center'>
    
    <form className='grocery-form' onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} 
      list={list}/>}
      <h3>grocery list</h3>
      <div className='form-control'>
        <input type='text' className='grocery' placeholder='e.g. eggs'
        value={name} onChange={(e)=>{setName(e.target.value)}}/>
        <button type='submit' className='submit-btn'>
          {isEditing ? 'edit' : 'submit'}
        </button>
      </div>
    </form>
    {list.length > 0 && 
    <div className='grocery-container'>
     <List items={list} removeItem={removeItem} editItem={editItem}/>
     <button className='clear-btn' onClick={deleteItems}> clear items</button>
   </div>}
   
  
  </section>
  </>)
}

export default App
