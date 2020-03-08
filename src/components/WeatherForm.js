import React, { Component } from 'react'
import DropDown from './DropDown';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from "@material-ui/core/Input";
import ClearAllIcon from '@material-ui/icons/ClearAll';

const initialState = {
    zipValue: "91231",
    street:"",
    city:"",
    states:"Select State",
    disabled:false,
    check:false,
    lat:0,
    lng:0,
    currentTabValues: {},
    regionName: "",
    cityName:""
};

class WeatherForm extends Component {

    

    constructor(props) {
        super(props)
    
        this.state = {
            zipValue: "91231",
            street:"",
            city:"",
            states:"Select State",
            disabled:false,
            check:false,
            lat:0,
            lng:0,
            currentTabValues: {},
            regionName: "",
            cityName:""
        };
    }
    
    onReset = () => {
        this.setState(initialState);
        this.props.result();
    }

    getLocation = () => {
        axios.get("http://ip-api.com/json/")
            .then(response => {
                this.setState(
                    () => ({
                        disabled: this.state.check ? false : true,
                        check: this.state.check ? false : true,
                        zipValue: response.data.zip,
                        lat: response.data.lat,
                        lng: response.data.lon,
                        cityName: response.data.city,
                        regionName: response.data.regionName
                    }), 
                
                ()=> console.log(response.data))
            })
            .catch(error => {
                console.log(error);
            })
    }

    streetHandler = (event) => {
        this.setState({
                street: event.target.value
        })
        
    }

    cityHandler = (event) => {
        this.setState({
                city: event.target.value
        })
        
    }

    handleCountryChange= (childValue) => {
        this.setState({
            states: childValue
    })
    }

    onSubmission = () => {
        
        console.log(encodeURI("https://maps.googleapis.com/maps/api/geocode/json?address=" + 
        this.state.street + "," + this.state.city + "," + this.state.states + 
        "&key=XXXXXXXXX"));
        let url = encodeURI("https://maps.googleapis.com/maps/api/geocode/json?address=" + 
        this.state.street + "," + this.state.city + "," + this.state.states + 
        "&key=XXXXXXXXX")
        if (!(this.state.check)) {
            axios.get(url)
            .then(response => {
                this.setState(
                    () => ({
                        lat: response.data.results[0].geometry.location.lat,
                        lng: response.data.results[0].geometry.location.lng,
                        regionName: this.state.states,
                        cityName: this.state.city
                    }), 
                
                ()=>  {
                        this.getDetails();
                        }
            )})
            .catch(error => {
                console.log(error);
            })
        } else {
            this.getDetails();
        }
        

        
    }

    getDetails = () => {
        let darkskyUrl = encodeURI("https://api.darksky.net/forecast/XXXXXXX/" + this.state.lat + "," + this.state.lng);
        console.log(darkskyUrl);
        axios.get(darkskyUrl)
            .then(response => {
                this.setState(
                    () => ({
                        currentTabValues: response.data
                    }), 
                
                ()=>  {
                            this.props.backgroundValue(response.data.currently.summary.toLowerCase());
                            this.props.getCurrentValues(response, this.state.cityName, this.state.regionName);
                        }
            )})
            .catch(error => {
                console.log(error);
            })

    }

    render() {
        return (
            <form className='form-horizontal'>
                <div className='form-group col-lg-12'>
                        <br></br>
                        <label htmlFor='Street' className="control-label col-lg-2">Street:<span >*</span></label>
                            <input type="text" className="form-control col-lg-5" value={this.state.street} onChange={this.streetHandler} disabled={this.state.disabled}  name="Street" required></input> 
                        
                        <br></br>
                        <br></br>

                        <label htmlFor='Street' className="control-label col-lg-2">City:<span >*</span></label>
                            <input type="text" className="form-control col-lg-5" disabled={this.state.disabled} value={this.state.city} onChange={this.cityHandler} name="City" required></input>
                            
                        <br></br>
                        <br></br>

                        <div>
                            <label id='State' htmlFor='State' className="control-label col-lg-2">State:<span >*</span></label>
                                <DropDown name="State" disabled={this.state.disabled} value={this.state.states} handleChangeMethod={this.handleCountryChange} required> </DropDown>
                        </div>

                        <br></br>
                        
                        <input type="checkbox" className="form-control col-md-2" name="location" defaultChecked={this.state.check} onClick={this.getLocation}></input>
                        <label id='location' htmlFor='currenLocation' className="control-label col-lg-4">Current Location</label>
                        
                        <div id='submission'>
                            <Input type="button" className="btn btn-secondary" onClick={this.onSubmission} value="Search" startAdornment={ 
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>}
                            />
                            <span/><span/> <span/>
                              
                            <Input type="button" className="btn btn-light" onClick={this.onReset} value="Clear" startAdornment={ 
                                <InputAdornment position="start">
                                    <ClearAllIcon />
                                </InputAdornment>}
                            />
                        </div>
                </div>
            </form>
        )
    }
}

export default WeatherForm
