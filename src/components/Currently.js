import React, { Component } from 'react'
import Card from "react-bootstrap/Card";
import axios from 'axios';
import OpacityIcon from '@material-ui/icons/Opacity';
// import WeatherIcon from 'react-icons-weather';
// npm install --save-dev @iconify/react @iconify/icons-mdi
import { Icon } from '@iconify/react';

// Logos
import thermometerIcon from '@iconify/icons-mdi/thermometer';
import windIcon from '@iconify/icons-whh/wind';
import thunderboltFilled from '@iconify/icons-ant-design/thunderbolt-filled';
import cloudsIcon from '@iconify/icons-uil/clouds';
import FlareIcon from '@material-ui/icons/Flare';
import { Tooltip } from '@material-ui/core';

export class Currently extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            sealStyle : {
                backgroundImage: "",
                width: '300px',
                height: '300px',
                backgroundPosition: 'center',
                redValue: 0,
                blueValue: 0
              }
        }
    }

    calculateRedColorValue = (value) => {
        return 255/180 * (value - 32);
    }

    calculateBlueColorValue = (value) => {
        return 255/180 * (212 - value);
    }
    
    componentDidMount() {
        let url = "https://www.googleapis.com/customsearch/v1?key=XXXXXX&cx=XXXXXXXX&q=" + encodeURI(this.props.stateName) + "%20State%20Seal&searchType=image&num=1&imgSize=huge"
        
        console.log(url);
        axios.get(url)
            .then(response => {
                this.setState(
                    (prevState) => ({
                        sealStyle: {
                            ...prevState.sealStyle,           
                            backgroundImage: response.data.items[0].link,
                            redValue: 255/120 * (this.props.value.data.currently.temperature.toFixed(0) - 32),
                            blueValue: 255/120 * (152 - this.props.value.data.currently.temperature.toFixed(0))
                          }
                    }), 
                
                ()=> console.log(this.state.sealStyle.redValue))
            })
            .catch(error => {
                console.log(error);
            })
    }
    

    render() {
        console.log(this.props.value.data);
        return (
            <div> 
                <Card style={{ width: '50rem', marginLeft: '22%', backgroundColor:'rgb(135,206,235,0.4)', border:"none", } }>
                    <Card.Body style={{color:`rgb(${this.state.sealStyle.redValue}, 0, ${this.state.sealStyle.blueValue})`}}>
                        <img src={this.state.sealStyle.backgroundImage} alt="" width={this.state.sealStyle.width} height={this.state.sealStyle.height}></img>
                        <h1 style={{ fontWeight: 'bold', fontSize:'2.5rem'} }>{this.props.value.data.currently.temperature.toFixed(0) }&deg;F</h1>
                        <div style={{ fontWeight: 'bold',fontSize:'2.5rem'}}>{this.props.value.data.currently.summary}</div>
                        <div style={{ fontSize:'2.5rem'}}>{this.props.city}</div>
                        <Tooltip title="Humidity">
                        <OpacityIcon style={{ width: '3rem', height: '3rem'}}></OpacityIcon></Tooltip>{this.props.value.data.currently.humidity.toFixed(2) } &nbsp;
                        <Icon icon={thermometerIcon} style={{ width: '3rem', height: '3rem'}}></Icon> {this.props.value.data.currently.pressure.toFixed(2) } &nbsp;
                        <Icon icon={windIcon} style={{ width: '3rem', height: '3rem'}}/> {this.props.value.data.currently.windSpeed.toFixed(2) } &nbsp;
                        <Icon icon={thunderboltFilled} style={{ width: '3rem', height: '3rem'}}/> {this.props.value.data.currently.visibility.toFixed(2) } &nbsp;
                        <Icon icon={cloudsIcon} style={{ width: '3rem', height: '3rem'}}/> {this.props.value.data.currently.cloudCover.toFixed(2) } &nbsp;
                        <FlareIcon style={{ width: '3rem', height: '3rem'}}/> {this.props.value.data.currently.ozone.toFixed(2) } &nbsp;
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Currently
