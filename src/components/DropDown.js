import React, { Component } from 'react'
import CountryList from '../data/values.json'
import 'bootstrap/dist/css/bootstrap.min.css';

class DropDown extends Component {

    countryChange = event => {
        this.props.handleChangeMethod(event.target.value);
    }
    
    render() {
        let disabled = this.props.disabled;
        return <div id="drop-down col-lg-2">
              <select value={this.props.value} onChange={this.countryChange} disabled={disabled} className="form-control col-lg-4">{
                 CountryList.map((obj) => {
                     return <option key={obj.abbreviation}>{obj.name}</option>
                 })
              }</select>
            </div>;
    }
}

export default DropDown
