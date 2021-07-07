
import axios from 'axios';
import React ,{useState,useEffect}from 'react'


import NewListe from './Modal/NewListe'


function NewPlaylist() {


  const [Lists, setLists] = useState([]);
  const userId = localStorage.getItem('UserID');


useEffect(() => {
  
  if (Lists===0) {
return;
  }
  axios.get('List/UsersList/'+userId)
  .then(response => {
      if (response.data ) {

        setLists(response.data)
          console.log(response)
        

      } else {
          alert('Failed to get user')
      }
      

  })
   

  


}, [])


const deleteRow=(id, )=>{  
  console.log(id);  

  axios.delete(`/List/DeleteList/${id}`)  
    .then(res => {  
      console.log(res);  
      console.log(res.data);  
      console.log(id); 
    

   const newList = Lists.filter((item) => item.id !== id);
 
   setLists([newList]);


    })  
  
}



const NameList = Lists.map((listToadd, index) => {
  return (  
  <ol class="list-group list-group-numbered">
  
  <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      
    <a href={`/MyList/${listToadd.listID}`} class="fw-bold">{listToadd.listName}</a>
    </div>
    
    <span class="badge bg-warning rounded-pill" ><svg   
    
    
    key={listToadd.listID}
            value={listToadd.value}
    
    
    
    
    onClick={() => deleteRow(listToadd.listID)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
    </span>
    
   
  </li>
  

    


</ol>
  
)})


    return (
        <div  style={{backgroundcolor:'#000000'}}>
        

 <NewListe/>
 {NameList}
<hr/>



        </div>
    )
}

export default NewPlaylist
