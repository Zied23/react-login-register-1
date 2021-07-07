import axios from 'axios';
import React,{useEffect,useState,useContext} from 'react';
import moment from 'moment'

const MyList  = (props)=>{

    const ListID = props.match.params.listID





// useEffect(() => {
//     axios.get('Account/'+userId)
//     .then(response => {
//         if (response.data) {

//             setProfileUser(response.data)
//             console.log(response.data)


//         } else {
//             alert('Failed to get user')
//         }

//     })
// }, [])

const [afiicheImage, setafiicheImage] = useState(0);
const [afiicheVideo, setafiicheVideo] = useState(1);
const [count, setCount] = useState(0);
const [Videos, setVideos] = useState([]);
const [CommentLists, setCommentLists] = useState([])
const [show, setShow] = useState(0);

const handleClose = () => setShow(0);
const handleShow = () => setShow(0);


useEffect(() => {
    axios.get('/JointVideoTolist/VideoOfThisList/'+ListID )
        .then(response => {
            if (response.data) {

                setVideos(response.data)
                console.log(response)


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
const renderCardsv = Videos.map((video, index) => {
   
    return <div class="container">

      
<div class="row row-cols-10 row-cols-lg-10 g-8 g-lg-8">
    <div class="col">

                        {/* <div className="col-sm-6">
                            <img src={video.artiste.photo} class="image--cover" />
                        </div> */}

                        <div >
                            {/* <a href="" style={{ color: '#FFB111' }}>{video.artiste.name}</a><br /> */}
                            <span style={{ color: '#FFFFFF' }} >{video.description}</span>
                        </div>
                   
             
            <hr />

            <div class="play-button1" onClick={() => changeTovideo(video.videoID, video.urLvideo, video.urLthmbnail)} id={video.urLthmbnail} ></div>
            <img style={{ width: '100%', higth: '50%' }} alt="thumbnail" src={video.urLthmbnail} id={video.videoID} />
            <video style={{ width: '100%' }} alt="Video" controls hidden id={video.urLvideo}  ></video>


            <ul className="list-group list-group-flush" style={{ color: '#FFFFFF' }}  >
           
                <li className="list-group-item">{video.title}</li>

                <li className="list-group-item"> <span style={{ marginLeft: '1rem' }}>{video.nbrViews}  vues</span> • <span>{moment(video.createdAT).format("MMM Do YY")}</span></li>
              
               
                
            </ul>

   


            </div>  </div>
        
      
    </div>

})



 
    
   return (
       <div>
          
            
          
{renderCardsv}
       
           
       </div>
   )
}




    export default MyList