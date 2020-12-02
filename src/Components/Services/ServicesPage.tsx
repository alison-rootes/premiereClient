import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBBadge, MDBCollapse } from "mdbreact";
import Athletics from '../../assets/services/athletics.jpg';
import Offices from '../../assets/services/offices.jpg';
import Medical from '../../assets/services/medical.jpg';
import Food from '../../assets/services/food.jpg';
import Facilities from '../../assets/services/facility.jpg';
import Groceries from '../../assets/services/grocery.jpg';



import FoodIcon from '../../assets/locationIcons/restaurantyellow.svg'
import AthleticIcon from '../../assets/locationIcons/athleticyellow.svg'
import OfficeIcon from '../../assets/locationIcons/officeyellow.svg'
import MedicalIcon from '../../assets/locationIcons/medical2yellow.svg'
import GroceryIcon from '../../assets/locationIcons/groceryyellow.svg'
import FacilitiesIcon from '../../assets/locationIcons/servicesyellow.svg'

import ServiceLogo from '../../assets/spray-bottle.svg'

import Edit from '../../assets/edit/delete/editwhite.svg'
import { timers } from 'jquery';
import '../Services/Services.css'

type MyState = {
    collapseID: string,

    siteData:any
    siteId: any
    servicesText:string
    servicesTextTitle:string
    servicesText2:string
 
 
    setServicesText:string
    setServicesText2: string
    setServicesTextTitle:string

    editImg : any,
    editImg2: any,
    editImg3: any,
    editText1: boolean
    editText2: boolean
    editText3: boolean
 
  
}


type ServiceProps = {
    signedIn: any
    isAdmin: boolean
}

class ServicesPage extends React.Component <ServiceProps, MyState> {

    state: MyState = {
        collapseID: "",
        siteData: [],
        siteId: '',
        servicesTextTitle: '',
        servicesText2:'',
        servicesText: '',
     
        setServicesText: '',
        setServicesText2: '',
        setServicesTextTitle: '',
        editImg: '',
        editImg2: '',
        editImg3: '',
        editText1: false,
        editText2: false,
        editText3: false
      }






      fetchSite = () => {
        fetch('http://localhost:3000/site/all',  {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
            }
        }).then(res => res.json())
        .then(site => {
                this.setState({
                    siteId: site.SiteInfo[0].id,
                    servicesText : site.SiteInfo[0].servicesText,
                    servicesTextTitle: site.SiteInfo[0].servicesTextTitle,
                    servicesText2: site.SiteInfo[0].servicesText2,
                    

                    setServicesText : site.SiteInfo[0].servicesText,
                    setServicesTextTitle: site.SiteInfo[0].servicesTextTitle,
                    setServicesText2: site.SiteInfo[0].servicesText2,
                
                })
               
        })
    }

    updateSite = () => {
        let token = localStorage.getItem('token')
        const reqBody = { 
            servicesText: this.state.setServicesText,
            servicesTextTitle: this.state.setServicesTextTitle,
            servicesText2: this.state.setServicesText2
       
        }
        fetch('http://localhost:3000/site/edit/' + this.state.siteId,  {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : token!
            },
            body: JSON.stringify(reqBody)
        }).then(res => res.json())
        .then(site => {
            this.fetchSite();
            this.setState({
                editText1: false,
                editText2: false,
                editText3: false,
                editImg: '',
                editImg2: '',
                editImg3: ''
            })
        })
    }
      
      toggleCollapse = (collapseID: string) => () => {
        this.setState(prevState => ({
          collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
      }

      componentDidMount = () =>{
        this.fetchSite();
    }


    render() {
        const listItemStyle = {
            backgroundColor: 'transparent', 
            color: 'white', 
            fontWeight: 'bold', 
            fontSize: '20px',
            textShadow: '1px 1px 1px black',
            borderColor: 'transparent',
        }

        const iconStyles = {

            width:'4vh',
            filter: 'drop-shadow(.5px .5px .5px #024160)'
        }
        const editIcon = {
            width:'3%',
            marginTop:'3%',
            marginBottom:'3%'
        }
        const collapse ={
            maxHeight: '50%'
        }


        return (
            <div>
           
                    <img src={ServiceLogo} style={{marginTop: '7%',width: '10%',filter:'drop-shadow(.1rem .1rem .1rem #024160)'}}></img>
        

                {this.props.isAdmin ?
                <div>
                    <div style= {{minHeight:'25px'}}onClick ={() => {
                        this.setState({
                            editText1: true,
                            editImg: Edit
                        })

                    }}>
                        {this.state.editText1 ?
                        <div style={{display: 'flex', flexDirection:'column', justifyContent:'center'}} onMouseLeave={() => {
                            this.setState({
                                editText1: false,
                                editImg: ''
                            })
                        }}>
                            <input defaultValue={this.state.servicesTextTitle} style={{marginLeft:'20%',marginRight:'20%',marginTop: '1%',textAlign:'center',fontSize:'2.2rem', paddingTop:'3%', color:''}}
                            onChange={(e) => {
                                this.setState({
                                    setServicesTextTitle: e.target.value
                                })
                            }}
                            ></input>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                <img style={editIcon} src={this.state.editImg} onClick={() => this.updateSite()}></img>
                            </div>
                        </div>

                        : <h3 style={{fontSize:'2.2rem', paddingTop:'3%', textShadow:'0.5px 0.5px 0.5px black', color:'#177BBD', userSelect:'none', marginBottom: '1%', paddingBottom: '.5vh', borderBottom: 'solid 1px white', backgroundColor: 'white'}}>{this.state.servicesTextTitle} </h3>
                        }
                    </div>

                    <div style= {{minHeight:'25px'}}onClick ={() => {
                        this.setState({
                            editText2: true,
                            editImg2: Edit
                        })

                    }}>
                        {this.state.editText2 ? 
                           <div style={{display: 'flex', flexDirection:'column', justifyContent:'center'}} onMouseLeave={() => {
                            this.setState({
                                editText2: false,
                                editImg2: ''
                            })
                        }}>
                            <textarea  defaultValue={this.state.servicesText} style={{marginLeft:'20%',marginRight:'20%',marginTop: '1%',textAlign:'center',fontSize:'2.2rem', paddingTop:'3%', color:''}}
                            onChange={(e) => {
                                this.setState({
                                    setServicesText: e.target.value
                                })
                            }}
                            ></textarea>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                <img style={editIcon} src={this.state.editImg2} onClick={() => this.updateSite()}></img>
                            </div>
                        </div>
                        :<p style={{    textShadow: 'black .2px .2px 1px', marginLeft: '25%', marginRight: '25%'}}> 
                        {this.state.servicesText}
                        </p> }
                    </div>

                    {this.props.signedIn ?
                        <div style= {{minHeight:'25px', marginBottom: '2%'}}onClick ={() => {
                            this.setState({
                                editText3: true,
                                editImg3: Edit
                            })
                        }}>
                            {this.state.editText3 ? 
                               <div style={{display: 'flex', flexDirection:'column', justifyContent:'center'}} onMouseLeave={() => {
                                this.setState({
                                    editText3: false,
                                    editImg3: ''
                                })
                            }}>
                                <textarea  defaultValue={this.state.servicesText2} style={{marginLeft:'20%',marginRight:'20%',marginTop: '1%',textAlign:'center',fontSize:'2.2rem', paddingTop:'3%', color:''}}
                                onChange={(e) => {
                                    this.setState({
                                        setServicesText2: e.target.value
                                    })
                                }}
                                ></textarea>
                                <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                    <img style={editIcon} src={this.state.editImg3} onClick={() => this.updateSite()}></img>
                                </div>
                            </div>
                            :<p style={{    textShadow: 'black .2px .2px 1px', marginLeft: '25%', marginRight: '25%'}}> 
                            {this.state.servicesText2}
                            </p> }
                        </div>
    
                    :null}
                </div>

                : 
                
                <div>
                        <h3 style={{fontSize:'2.2rem', paddingTop:'3%', textShadow:'0.5px 0.5px 0.5px black', color:'#177BBD', userSelect:'none', marginBottom: '1%', paddingBottom: '.5vh', borderBottom: 'solid 1px white', backgroundColor: 'white'}}>{this.state.servicesTextTitle} </h3>
                        
                        
                        <p style={{    textShadow: 'black .2px .2px 1px', marginLeft: '25%', marginRight: '25%'}}> 
                        {this.state.servicesText}
                        </p>

                    {this.props.signedIn ?
                        <p style={{    textShadow: 'black .2px .2px 1px', marginLeft: '25%', marginRight: '25%'}}>{this.state.servicesText2}</p>
                    :null}
                </div>
                }



                <div>
                    <div >
              
                        <div style={{ cursor: 'pointer', paddingTop: '2vh',backgroundColor: '#177BBD', borderBottom: 'solid 1px white', borderTop:'solid 1px white'}}  onClick={this.toggleCollapse("basicCollapse1")}>
                            <img src={FoodIcon} style={iconStyles}></img>
                            <h3 style={{fontSize:'1.7rem', textShadow:'1.5px 2px 1px #024160', color:'#E8C10D', userSelect:'none', marginBottom: 'none', paddingBottom: '.5vh',}}
                        
                            >Food</h3>
                        
                        </div>
                        <MDBCollapse id="basicCollapse1" isOpen={this.state.collapseID} style={{ backgroundImage: `url(${Food})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                            <MDBContainer>
                                <MDBListGroup style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '5px' }}>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Back kitchen<MDBBadge color="primary"
                                        pill>$400</MDBBadge>
                                    </MDBListGroupItem>
                                    <br></br>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Dining area<MDBBadge
                                        color="primary" pill>$200</MDBBadge>
                                    </MDBListGroupItem>
                                    <br></br>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Restrooms<MDBBadge color="primary"
                                        pill>$500</MDBBadge>
                                    </MDBListGroupItem>
                                    <br></br>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Window care<MDBBadge color="primary"
                                        pill>$100</MDBBadge>
                                    </MDBListGroupItem>
                                    <br></br>
                                </MDBListGroup>
                            </MDBContainer>
                        </MDBCollapse>
                    </div>

                    <div>
                        <div style={{ cursor: 'pointer', paddingTop: '2vh',backgroundColor: '#177BBD', borderBottom: 'solid 1px white', borderTop:'solid 1px white'}}  onClick={this.toggleCollapse("basicCollapse2")}>
                            <img src={AthleticIcon} style={iconStyles}></img>
                            <h3 style={{fontSize:'1.7rem', textShadow:'1.5px 2px 1px #024160', color:'#E8C10D', userSelect:'none', marginBottom: 'none', paddingBottom: '.5vh',}}
                        
                            >Athletics</h3>
                        
                        </div>
                        <MDBCollapse id="basicCollapse2" isOpen={this.state.collapseID} style={{ backgroundImage: `url(${Athletics})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                            <MDBContainer>
                                <MDBListGroup style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '5px' }}>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Basketball Court Care<MDBBadge color="primary"
                                        pill>$400</MDBBadge>
                                    </MDBListGroupItem>
                                    <br></br>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Concessions cleaning<MDBBadge
                                        color="primary" pill>$200</MDBBadge>
                                    </MDBListGroupItem>
                                    <br></br>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Large restroom cleaning<MDBBadge color="primary"
                                        pill>$500</MDBBadge>
                                    </MDBListGroupItem>
                                    <br></br>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Bleacher cleanup<MDBBadge color="primary"
                                        pill>$100</MDBBadge>
                                    </MDBListGroupItem>
                                    <br></br>
                                </MDBListGroup>
                            </MDBContainer>
                        </MDBCollapse>
                    </div>

                    <div>
                        <div style={{ cursor: 'pointer', paddingTop: '2vh',backgroundColor: '#177BBD', borderBottom: 'solid 1px white', borderTop:'solid 1px white'}}  onClick={this.toggleCollapse("basicCollapse3")}>
                            <img src={MedicalIcon} style={iconStyles}></img>
                            <h3 style={{fontSize:'1.7rem', textShadow:'1.5px 2px 1px #024160', color:'#E8C10D', userSelect:'none', marginBottom: 'none', paddingBottom: '.5vh',}}
                        
                            >Medical</h3>
                        
                        </div>
                        <MDBCollapse id="basicCollapse3" isOpen={this.state.collapseID} style={{ backgroundImage: `url(${Medical})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                            <MDBContainer>
                                <MDBListGroup style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '5px' }}>
                                <br></br>
                                <br></br>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Treatment room cleaning<MDBBadge color="primary"
                                        pill>$400</MDBBadge>
                                    </MDBListGroupItem>
                                    <br></br>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Disinfecting services<MDBBadge
                                        color="primary" pill>$200</MDBBadge>
                                    </MDBListGroupItem>
                                    <br></br>
                                    <br></br>
                                </MDBListGroup>
                            </MDBContainer>
                        </MDBCollapse>
                    </div>

                    <div>
                        <div style={{ cursor: 'pointer', paddingTop: '2vh',backgroundColor: '#177BBD', borderBottom: 'solid 1px white', borderTop:'solid 1px white'}}  onClick={this.toggleCollapse("basicCollapse4")}>
                            <img src={FacilitiesIcon} style={iconStyles}></img>
                            <h3 style={{fontSize:'1.7rem', textShadow:'1.5px 2px 1px #024160', color:'#E8C10D', userSelect:'none', marginBottom: 'none', paddingBottom: '.5vh',}}
                        
                            >Facilities</h3>
                        
                        </div>
                        <MDBCollapse id="basicCollapse4" isOpen={this.state.collapseID} style={{ backgroundImage: `url(${Facilities})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                            <MDBContainer>
                                <MDBListGroup style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '5px' }}>
                                    <br></br>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Cleaning Chemical procurement & storage<MDBBadge color="primary"
                                        pill>$400</MDBBadge>
                                    </MDBListGroupItem>
                                    
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Snow removal management<MDBBadge
                                        color="primary" pill>$200</MDBBadge>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Landscaping management<MDBBadge color="primary"
                                        pill>$500</MDBBadge>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Facility cleaning<MDBBadge color="primary"
                                        pill>$100</MDBBadge>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Off site storage/daily delivery service<MDBBadge color="primary"
                                        pill>$100</MDBBadge>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">RFP management<MDBBadge color="primary"
                                        pill>$100</MDBBadge>
                                    </MDBListGroupItem>
                                    <br></br>
                                </MDBListGroup>
                            </MDBContainer>
                        </MDBCollapse>
                    </div>

                    <div>
                        <div style={{ cursor: 'pointer', paddingTop: '2vh',backgroundColor: '#177BBD', borderBottom: 'solid 1px white', borderTop:'solid 1px white'}}  onClick={this.toggleCollapse("basicCollapse5")}>
                            <img src={GroceryIcon} style={iconStyles}></img>
                            <h3 style={{fontSize:'1.7rem', textShadow:'1.5px 2px 1px #024160', color:'#E8C10D', userSelect:'none', marginBottom: 'none', paddingBottom: '.5vh',}}
                        
                            >Groceries</h3>
                        
                        </div>
                        <MDBCollapse id="basicCollapse5" isOpen={this.state.collapseID} style={{ backgroundImage: `url(${Groceries})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                            <MDBContainer>
                                <MDBListGroup style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '5px' }}>
                                <br></br>
                                <br></br>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Dairy section<MDBBadge color="primary"
                                        pill>$400</MDBBadge>
                                    </MDBListGroupItem>
                                    <br></br>
                                    <br></br>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Frozen food section<MDBBadge
                                        color="primary" pill>$200</MDBBadge>
                                    </MDBListGroupItem>
                                    <br></br>
                                    <br></br>
                                </MDBListGroup>
                            </MDBContainer>
                        </MDBCollapse>
                    </div>

                    <div>
                        <div style={{ cursor: 'pointer', paddingTop: '2vh',backgroundColor: '#177BBD', borderBottom: 'solid 1px white', borderTop:'solid 1px white'}}  onClick={this.toggleCollapse("basicCollapse6")}>
                            <img src={OfficeIcon} style={iconStyles}></img>
                            <h3 style={{fontSize:'1.7rem', textShadow:'1.5px 2px 1px #024160', color:'#E8C10D', userSelect:'none', marginBottom: 'none', paddingBottom: '.5vh',}}
                        
                            >Offices</h3>
                        
                        </div>
                        <MDBCollapse id="basicCollapse6" isOpen={this.state.collapseID} style={{ backgroundImage: `url(${Offices})`, backgroundPosition: 'center', backgroundSize: 'auto' }}>
                            <MDBContainer>
                                <MDBListGroup style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '5px', fontSize: '25px' }}>
                                <br></br>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Sanitization<MDBBadge color="primary"
                                        pill>$400</MDBBadge>
                                    </MDBListGroupItem>
                                    <br></br>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Floor cleaning<MDBBadge
                                        color="primary" pill>$200</MDBBadge>
                                    </MDBListGroupItem>
                                    <br></br>
                                    <MDBListGroupItem style={listItemStyle} className="d-flex justify-content-between align-items-center">Restrooms<MDBBadge color="primary"
                                        pill>$500</MDBBadge>
                                    </MDBListGroupItem>
                                    <br></br>
                                </MDBListGroup>
                            </MDBContainer>
                        </MDBCollapse>
                    </div>

               </div>
                
            </div>
        );
    }
}

export default ServicesPage;