import React, { useState } from 'react';

import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import { MDBContainer, MDBInput } from "mdbreact";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Logo from '../../assets/Premier-Commercial-Services-icon.svg';
import DatePicker from "react-datepicker";



interface createTest{
    showTestCreate: any
    setShowTestCreate: React.Dispatch<React.SetStateAction<any>> 
    updateToken: any
}

const CreateTest: React.FunctionComponent<createTest> = (props:createTest) => {

    const [testimonialLocation, setTestimonialLocation] = useState<string>();
    const [locationType, setLocationType] = useState();
    const [testimonialQuote, setTestimonialQuote] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [rating, setRating] = useState();


    const toggle = () => props.setShowTestCreate(!props.showTestCreate);



    const modalHeaderStyle:React.CSSProperties= {
        backgroundColor:'#177BBD',
        color: 'white',
        textShadow: '.1rem .1rem .1rem black',
        borderColor:'transparent',
        borderRadius: '20px 20px 0px 0px',


    
    } 
    
    const modalFooterStyle:React.CSSProperties= {
        backgroundColor:'#177BBD',
        color: 'white',
        textShadow: '.1rem .1rem .1rem black',
        borderColor:'transparent',
        borderRadius: '0px 0px 20px 20px'
    } 
    
    
    const inputStyles:React.CSSProperties= {
        textAlign: 'center',
        borderRadius:'5px',
        outline:'none',
        borderColor:'transparent',
        alignItems: 'center',
    }
    const labelStyles:React.CSSProperties= {
        textShadow: '.1rem .1rem .1rem black',
        color:'white',
        marginTop: '.5rem',
        alignItems: 'center',
        textAlign: 'center'
    
    }

    const textBoxStyle:React.CSSProperties={
        textAlign: 'center',
        borderRadius:'5px',
        outline:'none',
        resize: 'none',
        borderColor:'white',
        backgroundColor:'white',
        fontSize:'17px'
        
    }

    const handleChange = (date: any) => {
        setStartDate(date);
      };


    const writeTestimonial = () => {

        const reqBody = { 
            

        }

        fetch('http://localhost:3000/testimonial/create', {
             method: 'POST',
             headers: {
            'Content-Type': 'application/json',
            'Authorization': props.updateToken
        },
        body: JSON.stringify(reqBody)})
        

    }


    return(
    
        <Modal style={{borderRadius:'20px'}}isOpen={props.showTestCreate} toggle={toggle} className=''>
          <ModalHeader toggle={toggle} style={modalHeaderStyle}>

          <img src = {Logo} style={{width:'20%'}} />
  
        
          
      
          </ModalHeader>
          <ModalBody style={{backgroundColor: '#009FE4'}}>
          <form className="fs-frm" id="myForm" name="simple-contact-form" accept-charset="utf-8">

              <fieldset id="fs-frm-inputs">

                  <div style = {{display: 'flex', flexDirection: 'column', textAlign:'center'}}>
                  <label style={labelStyles} id="labelName" htmlFor="full-name">User Location:</label>
                  <input style = {inputStyles} type="text" name="name" id="full-name" placeholder="Location Name and/or Address" required= {true}></input>

                  <label style={labelStyles} htmlFor="email-address">Location Type:</label>
                  
                  <select style = {inputStyles} name="name" id="full-name" placeholder="Select service required" value={testimonialLocation} required onChange={(e) => setTestimonialLocation(e.target.value)}>
                      <option></option>
                      <option value="Athletic">Athletics</option>
                      <option value="Grocery">Grocery</option>
                      <option value="Medical">Medical</option>
                      <option value="Office">Office</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Services">Services</option>
                  </select>

                  <label style={labelStyles} htmlFor="email-address">Your Testimonial:</label>

                  <textarea style = {textBoxStyle} rows = {3} cols={50} name="message" id="message" placeholder="Type message here" required= {true}></textarea>
                <label style={labelStyles} htmlFor="date">Date of Service:</label>
                <DatePicker  selected={startDate} onChange={handleChange} className="datePicker"/>
                  
                  <label style={labelStyles} htmlFor="">Rating:</label>
                  <div style= {{transform: 'scale(2)'}}>
                  <Rater  total={5}  interactive={true}  />
                  </div>                
                  </div>
              </fieldset>
              
              <div id="sendButton" style={{textAlign:'center', marginTop:'3%'}}> 
              <Button color="primary" type="submit" id="subm" value="Submit" className="btn btn-primary" >Send</Button>
              <Button color="secondary" onClick={toggle}>Cancel</Button>
              
              </div>
          </form>
        
          </ModalBody>
          <ModalFooter style={modalFooterStyle}>
        
          </ModalFooter>
          </Modal>

    )
}



export default CreateTest;