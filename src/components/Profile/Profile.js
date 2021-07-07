import axios from 'axios';
import React,{useEffect,useState,useContext} from 'react';
import "./Profile.scss";
import { Button } from 'react-bootstrap';
import moment from 'moment'
import Comments from './../views/LandingPage/Comments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Like from '../views/LandingPage/Like';
import { Dropdown } from 'react-bootstrap';
import Subscriber from './Subscriber';
import { Redirect } from 'react-router-dom';

const Profile  = ()=>{
    const [ProfileUser, setProfileUser] = useState([]);
    const userId = localStorage.getItem('UserID');
    const ObserverId = localStorage.getItem('UserID');
useEffect(() => {
    axios.get('Account/'+userId)
    .then(response => {
        if (response.data) {

            setProfileUser(response.data)
            console.log(response.data)


        } else {
            alert('Failed to get user')
        }

    })
}, [])

const [afiicheImage, setafiicheImage] = useState(0);
const [afiicheVideo, setafiicheVideo] = useState(1);
const [count, setCount] = useState(0);
const [Videos, setVideos] = useState([]);
const [CommentLists, setCommentLists] = useState([])
const [show, setShow] = useState(0);


const handleClose = () => setShow(0);
const handleShow = () => setShow(0);

const [posts , setposts ] = useState([]);
 
useEffect(() => {
    axios.get('Video/UsersVideos/'+userId )
        .then(response => {
            if (response.data) {

                setVideos(response.data)
                console.log(response.data)
                // const posts = response.data;  
                // setposts({ posts });  

            } else {
                alert('Failed to Videos')
            }

        })

}, [])

const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment))
}



let changeTovideo = (id, idV, idB) => {
    // setafiicheImage(1);
    // console.log('You clicked: ', this.state.baction);
    document.getElementById(idB).hidden = true;
    document.getElementById(id).hidden = true;
    document.getElementById(idV).hidden = false;
    let video = document.getElementById(idV);


    axios.get('Video/' + id)
        .then(response => {
            if (response.data) {
console.log(response.data) ;              
 video.src = response.data.urLvideo;
                video.play();
                

            } else {
                alert('Failed to Videos')
            }

        })

    console.log(idV)

}

    
const deleteRow=(id, e)=>{  
    console.log(id);  
    console.log(e); 
    axios.delete(`Video/DeleteVideo/${id}`)  
      .then(res => {  
        console.log(res);  
        console.log(res.data);  
        console.log(id); 
        const o = Videos.filter(item => item.id !== id);  
     let n= setVideos({ Videos });   
      })  
    
  } 
const renderCardsv = Videos.map((video, index) => {
    
    const Toggle = () => {
        const [show, toggleShow] = React.useState(false);
        
        return (
            <div >
                <button className="btn btn-link"  onClick={() => toggleShow(!show)}>Voir les commentaires {show ? '' : ''}</button>
                {show &&
                    <ul className="list-group">
                        <li className="list-group-item" style={{ color: '#FFFFFF' }}> {video.comments.map(x => (


                            //   <span className="badge bg-info text-dark">{x.body}•{moment(x.createdAT).format("MMM Do YY")}</span>



                            <div className="card">
                                <ul className="list-group list-group-flush">


                                    <li className="list-group-item">
                                        <div class="card">
                                            <div className="card-header">
                                                <div className="col-sm-12">
                                                    <div className="row">

                                                        <img src={x.auther.photo} class="image--comment" />
                                                        <a href="" style={{ color: '#FFB111' }}>{x.auther.name}</a><br />

                                                    </div>

                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <blockquote className="blockquote mb-0">

                                                    <footer className="blockquote-footer">  {x.body}  <br /><cite className="float-right" title="Source Title">{moment(x.createdAT).format("MMM Do YY")}</cite></footer>
                                                </blockquote>
                                            </div>
                                        </div>


                                    </li>

                                </ul>
                            </div>

                        ))}</li>
                    </ul>


                }

            </div>
        )
    }
    return <div className="col-sm-12">

        <div className="card" width="100" height="400"  >
            <div className="wrapper">
                <div className="col-sm-12">
                    <div className="row">


                        <div className="col-sm-6">
                            <img src={video.artiste.photo} class="image--cover" />
                        </div>

                        <div >
                            <a href="" style={{ color: '#FFB111' }}>{video.artiste.name}</a><br />
                            
                            <span style={{ color: '#FFFFFF' }} >{video.description}</span>
                        </div>
                    </div>

                </div>
            </div>
            <hr />

            <div class="play-button1" onClick={() => changeTovideo(video.videoID, video.urLvideo, video.urLthmbnail)} id={video.urLthmbnail} ></div>
            <img style={{ width: '100%', higth: '50%' }} alt="thumbnail" src={video.urLthmbnail} id={video.videoID} />
            <video style={{ width: '100%' }} alt="Video" controls hidden id={video.urLvideo}  >


            </video>


            <ul className="list-group list-group-flush" style={{ color: '#FFFFFF' }}  >
           
                <li className="list-group-item">{video.title}</li>

                <li className="list-group-item"> <span style={{ marginLeft: '1rem' }}>{video.nbrViews}  vues</span> • <span>{moment(video.createdAT).format("MMM Do YY")}</span></li>
            
                <li className="list-group-item">
                    <div class="container">
                    <div class="row">
                        <div class="col-sm-9" >
                        <div className="text-center">
            <li className="list-group-item"> {video.vLikes.length}  <FontAwesomeIcon  style={{ color:'red'}} icon={faHeart} /></li>
            </div>
                                <Like videosId={video.videoID} />

                            </div>
                            <div class="col-sm-3" >
                               
                                    


                                <Dropdown>
                                    <Dropdown.Toggle variant="Warning" style={{color:'#FFB111'}}id="dropdown-basic">
                                        •••
                                     </Dropdown.Toggle>

                                    <Dropdown.Menu  style={{background:'#FFB111'}}>
                                        <Dropdown.Item  style={{color:'#000000'}}><i onClick={(e) => deleteRow(video.videoID, e)}>Supprimer</i></Dropdown.Item>
                                        <Dropdown.Item  style={{color:'#000000'}}><i>Modifier</i></Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>
                                    
                                    
                               
                            </div>
                        </div>
                        
                    </div>
               
               
                </li>
            
            
            </ul>

            <div style={{ color: 'white' }} > <Comments CommentLists={CommentLists} postId={video.videoID} refreshFunction={updateComment} /> </div>



        </div>
        <Toggle />
    </div>

})


const [fileName, setFileName] = useState();
const [fileimage, setImage] = useState([]);
const updatePhoto = (file)=>{
    setImage(file)
}
const onSubmit = (e) =>{
        
        
       
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("fileName", fileName);
        formData.append("photoProfil", fileimage);

        const URL = 'Account/UploadPhotoProfile';

        return axios(URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: formData
        })
            .then(response => response.data)
            .catch(error => {
                throw error;
            });


            


    
}

useEffect(() => {
    setImage(fileimage)
    

  }, [fileimage]);

  
   return (
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src={ProfileUser?ProfileUser.photo:"loading"}
                   /><br/><br/><br/>
              <h6>changer votre photo</h6>
                       <div class="row no-gutters">
                           <div class="col-12 col-sm-6 col-md-10"><input type="file" onChange={(e) => updatePhoto(e.target.files[0])} ></input></div>
                           <div class="col-6 col-md-2"> <button type="button" className="btn btn-warning" onClick={onSubmit}>Enregistrer</button></div>
                       </div>
               </div>
               <div>
                   <h4>{ProfileUser?ProfileUser.name:"loading"}</h4>
                   <h5>{ProfileUser?ProfileUser.email:"loading"}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                   <h6> {renderCardsv.length} Publications</h6>
                   
                   <div className="col-6 col-md-4"><Subscriber userTo={userId} userFrom={ObserverId}/></div>
                   </div>

               </div>
           </div>
        
            <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn #64b5f6 blue darken-1">
                
            </div>
            
            </div>
            </div>      
           <div className="gallery">
            

{renderCardsv}
           </div>
           <></>
           
       </div>
   )
}


export default Profile