import React,{useState} from 'react'
import { Button, Input } from 'antd';
import axios from 'axios';
import SingleComment from './SingleComment';



const { TextArea } = Input;
function Comments(props) {

    const user = localStorage.getItem('UserID');
 console.log(user);
    const [Comment, setComment] = useState("")
    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }
   
    const onSubmit = (e) => {
        e.preventDefault();

        const comments = { 
            body: Comment,
            userID: user,
            videoID: props.postId   
         }

        axios.post('Comment/SaveComment',comments ) 
        .then(response=> {
            if(response.data) {
               console.log(response.data)
                setComment("")
                props.refreshFunction(response.data.body)
                
               
            } else {
                alert('Failed to save Comment')
            }
        })
    
}


    return (
        <div>
        
         
    
         
            {props.CommentLists && props.CommentLists.map((comments, index) =>(
 <React.Fragment>
 <SingleComment Comment={comments} videoID= {props.postId} refreshFunction={props.refreshFunction}/>
</React.Fragment>

            ))}

     
            <form style={{ display: 'flex' }}   onSubmit={onSubmit}>
                <TextArea 
                name='commenter'
                    style={{ width: '100%', height: '30px',borderRadius: '20px'}}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="Ecrire un commentaire"
                    required="true"
                />
                
                <br />
                <Button style={{ width: '22%', height: '33px' ,background:'#FFB111', borderRadius: '25px'}} onClick={onSubmit}>Envoyer</Button>
            </form>
        </div>
    )
}

export default Comments
