

import axios from 'axios';
import React, { useState } from 'react'

import { Redirect } from 'react-router';



export default function UploadVideoPage() {

    const [Description, setDescription] = useState("");
    const [Duree, setDuree] = useState();


    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const [fileimage, setImage] = useState();
    const [fileNameimage, setImageName] = useState();

    const handleChangeDuree = (event) => {
        console.log(event.currentTarget.value)

        setDuree(event.currentTarget.value)
    }

    const handleChangeDecsription = (event) => {
        console.log(event.currentTarget.value)

        setDescription(event.currentTarget.value)
    }
    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const saveimage = (e) => {
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);
    };

    const userId = localStorage.getItem('UserID');
    const onSubmit = (e) => {
        const formData = new FormData();
        formData.append("video", file);
        formData.append("fileName", fileName);
        formData.append("thumbnail", fileimage);
        formData.append("fileNameimage", fileName);
        formData.append("Description", Description);
        formData.append("Duree", Duree);
        formData.append("userId", userId);

        
        const URL = 'Video/UploadVideo';

        return axios(URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: formData
        })
            .then(response => response.data)

            .catch(error => {throw error;} );


          



    };
    const token = localStorage.getItem('token');
    //window.location.reload();
    if (token) {

        return (


            <div>
                <form onSubmit={onSubmit}>
                    <>
                        <h3 className="h3" > Détails</h3><br /><br /><br />

                        <div className=" col-6">
                            <div className="row">

                                <label style={{ color: 'white' }}><h4>Video</h4>Glissez-déposez les fichiers vidéo que vous souhaitez mettre en ligne <br />Vos vidéos resteront privées jusqu'à leur publication.</label><br />
                                <input id="input-b1" name="input-b1" type="file" className="file" data-browse-on-zone-click="true" onChange={saveFile} /><br /><br /><br /><hr />
                                <label style={{ color: 'white' }}><h4>Miniature</h4>
                                    Importez une image qui donne un aperçu du contenu de votre vidéo.<br />
                                    Une miniature efficace se remarque et attire l'attention.</label><br />
                                <input type="file" onChange={saveimage} /><br /><hr />
                            </div>
                          
                            <div class="mb-3">
                                <label for="formGroupExampleInput" class="form-label" style={{ color: 'white' }}>Titre</label>
                                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Titre Obligatoire" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlTextarea1" className="form-label" style={{ color: 'white' }}>Description</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={handleChangeDecsription} value={Description}></textarea>
                            </div>


                            <input hidden onChange={handleChangeDuree} value={Duree} />


                        </div>

                    </>
                    <button type="button" className="btn btn-warning" onClick={onSubmit}>ENREGISTRER</button>
                </form>

            </div>

        )
    } else {
        return <Redirect from="*" to="/login" />;
    }

}
