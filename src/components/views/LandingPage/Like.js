import React, { Component,useState } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function  Like (props){
//state = { liked: false };
const [liked, setliked] = useState(false);
const toggle = () => {
	let localLiked = liked;

	// Toggle the state variable liked
	localLiked = !localLiked;
    setliked({ liked: localLiked });
    const user = localStorage.getItem('UserID');
    const like = { 
        isLiked: localLiked,
  
        userID: user,
        videoID: props.videosId   
     }
    
     axios.post('Likes/SaveLikes',like ) 
     .then(response=> {
         if(response.data) {
            console.log(response.data)
             
             
            
         } else {
			console.log(response.data)
            
         }
     })
};

	return (
	<div className="container">
		<center>
		
		<div
			className="container"
			style={{ border: "10px solid black", width: "80%" }}
			onClick={() =>toggle()}
		>
			{liked === false ? (
			<FontAwesomeIcon icon={faHeart} />
			) : (
			<FontAwesomeIcon style={{ color:'red'}} icon={faHeart} />
			)}
		</div>
		</center>
	</div>
	)

            }
export default Like
