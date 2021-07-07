import React, { useEffect, useState ,useScroll, useRef} from 'react'
import { Button } from 'react-bootstrap'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';

import "./Landingbutton.scss";

import moment from 'moment'
import Comments from './Comments';
import Like from './Like';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Dropdown } from 'react-bootstrap';

 const { Meta } = Card;


function LandingPage() {
    //InfiniteScroll = require('react-infinite-scroll-component'); 
    const [afiicheImage, setafiicheImage] = useState(0);
    const [afiicheVideo, setafiicheVideo] = useState(1);
    const [count, setCount] = useState(0);
    const [Videos, setVideos] = useState([]);
    const [CommentLists, setCommentLists] = useState([])
    const [show, setShow] = useState(0);
    const [isClick, setClick] = useState(false);
    const [PageNumber, setPageNumber] = useState(1);
   






    const handleClose = () => setShow(0);
    const handleShow = () => setShow(0);

    //'Video/Videos'
    const [isStarted, setVideosup] = useState([]);
   
  
    useEffect(() => {
        
      axios.get(`Video/Videos/?PageNumber=${PageNumber}`)
            .then(response => {
                if (response.data) {
                
                        setVideos(response.data)

                      
                        
                    
                    console.log(response.data)
                    console.log(Videos);
                    

                } else {
                    alert('Failed to Videos')
                }
                
            })
            
           

    }, [!Videos,CommentLists])
   

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }



    let changeTovideo = (id, idV, idB) => {
        
        document.getElementById(idB).hidden = true;
        document.getElementById(id).hidden = true;
        document.getElementById(idV).hidden = false;
        let video = document.getElementById(idV);


        axios.get('Video/' + id)
            .then(response => {
                if (response.data) {

                    video.src = response.data.urLvideo;
                    video.play();


                } else {
                    alert('Failed to Videos')
                }

            })

        console.log(idV)

    }
    
    const next = () => { 
        console.log('PageNumber , '  + PageNumber);
       return  setPageNumber(PageNumber + 1 )  
        
    }
    const previousLabel = () => { 
        console.log('PageNumber , '  - PageNumber);
       return  setPageNumber(PageNumber - 1 )  
        
    }

    const [AddToMaylist, setAddToMaylist] = useState('');
    const AddTolist=(idv,idl)=>{  
       
        let ListIdVedioId = { VideoID: idv, ListID: idl }
     
      

      axios.post('JointVideoTolist/AddVideoToMyList',ListIdVedioId)  
      .then(res => {  
        console.log(res);  
        console.log(res.data);  
    
        alert('Video ajouter avec succée !')
      })  
      
    }











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


  


  








                            
  

    
    const renderCardsv = Videos.map((video, index) => {
     
      
        const Toggle = () => {
            const [show, toggleShow] = React.useState(false);

            return (
               
                <div key={index}>
      
      <div class="d-grid gap-2 col-8 mx-auto"> <button className="btn btn-dark"  onClick={() => toggleShow(!show)} style={{ background: '#000000',color: '##f8f9fa',borderRadius:'20px'}}>Voir les commentaires {show ? '' : ''}</button></div>
                    {show &&
                        <ul className="list-group">
                            <li className="list-group-item" style={{ color: '#FFFFFF' }}> {video.comments.map(x => (


                               



                                <div className="card"  key={index}> 
                                    <ul className="list-group list-group-flush">


                                        <li className="list-group-item">
                                            <div class="card">
                                                <div className="card-header">
                                                    <div className="col-sm-12">
                                                        <div className="row">

                                                        <a href={`/UserToSee/${video.artiste.id}`} style={{ color: '#FFB111' }}> <img src={x.auther.photo} class="image--comment" /></a>
                                                            <a href={`/UserToSee/${video.artiste.id}`} style={{ color: '#FFB111' }}>{x.auther.name}</a><br />

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

        
        return <div className="col-sm-6">

            <div className="card" width="100" height="400"  >
                <div className="wrapper">
                    <div className="col-sm-6">
                        <div className="row">


                            <div className="col-sm-6">
                            <a href={`/UserToSee/${video.artiste.id}`} style={{ color: '#FFB111' }}> <img src={video.artiste.photo} class="image--cover" /></a>
                            </div>

                            <div >
                                <a href={`/UserToSee/${video.artiste.id}`} style={{ color: '#FFB111' }}>{video.artiste.name}</a><br />
                                <span style={{ color: '#FFFFFF' }} >{video.description}</span>
                            </div>
                        </div>

                    </div>
                </div>
                <hr />

                <div class="play-button" onClick={() => changeTovideo(video.videoID, video.urLvideo, video.urLthmbnail)} id={video.urLthmbnail} ></div>
                <img style={{ width: '100%', higth: '50%' }} alt="thumbnail" src={video.urLthmbnail} id={video.videoID} />
                <video style={{ width: '100%' }} alt="Video" controls hidden id={video.urLvideo}  >


                </video>


                <ul className="list-group list-group-flush" style={{ color: '#FFFFFF' }}  >

                    <li className="list-group-item">{video.title}</li>

                    <li className="list-group-item"> <span style={{ marginLeft: '1rem' }}>{video.nbrViews}  vues</span> • <span>{moment(video.createdAT).format("MMM Do YY")}</span></li>
                    <li className="list-group-item" > 
                    <div className="text-center">
                    {video.vLikes.length} <FontAwesomeIcon style={{ color:'red'}} icon={faHeart} />
                    </div>
                   </li>
                    <li className="list-group-item">           
                   {/* <Heart id={video.videoID} isClick={isClick} onClick={() => setClick(!isClick)}/> */}

                   {/* <button  id={video.urLvideo+video.urLthmbnail} isClick={isClick} onClick={() => setLike(video.urLvideo+video.urLthmbnail)} class="btn btn btn-outline-info">
                        test   
                    </button> */}
                     


                            <div class="container">
        


                               
        <div class="row g-0">
                                <div class="col-sm-6 col-md-8" style={{ background: '#000000',borderRadius:'50px'}}>         <Like videosId={video.videoID} /></div>
                                
                               
                              
                               <div class="col-6 col-md-4" key={index}> 
                               <Dropdown>
             <Dropdown.Toggle variant="Warning" style={{ background: '#FFB111',borderRadius:'50px'}} id="dropdown-basic">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                     <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                     <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                 </svg>
             </Dropdown.Toggle>
  
             <Dropdown.Menu style={{ background: '#FFB111' }}>
                 <Dropdown.Item style={{ color: '#000000' }}> { Lists.map(l => (<i>
                     
                     <hr/>
                    <button type="button" class="btn btn-dark"   onClick={() => AddTolist(video.videoID, l.listID)}
                    
                    >
                        {l.listName}
                       
                        
                        </button>   
                        
                        <hr/>
                        
                        
                        </i> 
                   
                         
                         
                         
                       ))}
                     
                     
                     
                     </Dropdown.Item>
                 
  
             </Dropdown.Menu>
         </Dropdown></div>
  
                             
                            </div>
                            
                            
                            
                            
                            
                            </div>
                            
                    </li>
                
                
                </ul>
              
                

                
                <div style={{ color: 'white' }} > <Comments CommentLists={CommentLists} postId={video.videoID} refreshFunction={updateComment} /> </div>

               
               
            </div>
            <Toggle />
            <div>
                
                </div>

        </div>

    })
   
    return (

        
<>



<InfiniteScroll
        dataLength={Videos.length}
        next={next}
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        
        hasMore={true}
       
      
       
        loader={<h4>Loading...</h4>}
        inverse={true}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>  }
          style={{display : 'flex' , flexWrap : 'wrap'}}
         
        >
        {renderCardsv }
        
     
       
      
      

      
      </InfiniteScroll>
      </>
    )
}

export default LandingPage