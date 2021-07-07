import React, { Component ,useState} from 'react'

import ReactModal from "react-modal";
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import { Redirect } from 'react-router';

export default class NewListe extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showModal: false,
          list:''
        };
      };
      
     
    
      handleOpenModal = () => {
        console.log("handleOpenModal");
        this.setState({ showModal: true });
      };
    
      handleCloseModal = () => {
        console.log("handleCloseModal");
        this.setState({ showModal: false });
      };
     
      handleChange=(e)=>{
        e.preventDefault();
      this.setState({list: e.target.value})
        console.log(e.target.value);
       }
       
       handleSubmit=(e)=>{
        e.preventDefault();
        const userId = localStorage.getItem('UserID');
        const NameList=this.state.list;
        if(this.state.list.length>3){
          let list = { userID: userId,listName: NameList}
          axios.post('List/SaveListe', list )
          .then(response => {
              if (response) {

                  console.log(response.data);
                


              } else {
                  alert('Failed to Save list')
              }

          })
          
          
          
          
          
          console.log('listname:',this.state.list);this.handleCloseModal();}else{alert('Nom du list doit etre plus que 3 lettre ')}
        
      }

      render() {
        const overlayClassName = this.state.showModal
          ? "modal fade show"
          : "modal fade";
        return (
          <div>
            <Button bsStyle="warning"  style={{background:'#FFB111'}} onClick={this.handleOpenModal}>
              <svg xmlns="http://www.w3.org/2000/svg" style={{background:'#FFB111'}} width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg> Nouvelle liste musical 
            </Button>
            {this.state.showModal ? (<><ReactModal
              className="modal-dialog modal-content"
             
              bodyOpenClassName="modal-open"
              overlayClassName={overlayClassName}
              ariaHideApp={false}
              isOpen={this.state.showModal}
            >
              <Modal.Header  style={{background:'#111213'}}> 
                <Modal.Title>Ajouter une List musical </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{background:'#000000'}}>
              <input ref="name" 
               id="x" 
               type="text" 
               size="30" 
               placeholder=" Nouvelle liste musical"
               onChange={this.handleChange}
               />
              </Modal.Body >
              <Modal.Footer style={{background:'#111213'}}>
                <Button style={{background:'#FFB111'}} className='x' bsStyle="warning" onClick={this.handleCloseModal}>
                  Close
                </Button>
                <Button bsStyle="warning" style={{background:'#FFB111'}} onClick={this.handleSubmit}>
                  Enregistrer 
                </Button>
              </Modal.Footer>
            </ReactModal> </>) : null }
            <div
              className={
                this.state.showModal ? "modal-backdrop fade show" : "display: none;"
              }
            />
          </div>
        );
      }
}
