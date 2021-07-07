import React ,{useEffect,useState} from 'react'
import ReactStars from "react-rating-stars-component";

import axios from 'axios';


function  TendanceVideo () {

    const [Video, setVideo] = useState([]);
    const [newRating, setnewRating] = useState()
    useEffect(() => {
        axios.get('Video/BestVideo')
        .then(response=>{
            if(response.data){
            
                setVideo(response.data)
                console.log(response.data)
                

            }else{
                alert('Failed to Videos')
            }

        })
      
    },[newRating] )
    const ratingChanged = (newRating) => {
        console.log(newRating);
      }
      
        return (<div className="tendence">

            <div className="col-sm-12">

                <div className="card"  ><br/>
                    <h8 style={{ marginLeft: '1rem', color: '#FFFFFF'  }}>populaire cette semaine</h8><br/>
                    <video className="video"src={Video.urLvideo}  controls />
                    <div className="col-sm-6" style={{left:"30%"}}>
                    <div className="text-center"  >
                    <ReactStars count ={6} onChange={ratingChanged} size={24} activeColor="#ffd700" value="4"/>
                    
                    <span style={{ color: '#FFFFFF',  left: "50%" }}>{Video.nbrViews} K</span> 
                    </div>
                    </div>
                    <ul className="list-group list-group-flush" style={{ color: '#FFFFFF' }}  >

                        <li className="list-group-item">Nice</li>
                        <hr />
                        <li className="list-group-item">Awsome</li>
                        <hr />
                        <li className="list-group-item"> <span>I like it ! </span></li>
                    </ul>


        

                </div>
            </div>


        </div>

        )

        
}
export default TendanceVideo