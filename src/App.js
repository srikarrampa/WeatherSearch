import React from 'react';
import './App.css';
import WeatherForm from './components/WeatherForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import background from './gifs/background2.jpg'
import clear from './gifs/clear.jpg'
import clear2 from './gifs/clear-eve.jpg'
import rainy from './gifs/rainy.jpg'
import rainy2 from './gifs/rainy-eve.jpg'
import snow from './gifs/snow.jpg'
import snow2 from './gifs/snow-eve.jpg'
import cloudy from './gifs/dull_cloudy.gif'
import { Tabs } from "@yazanaabed/react-tabs";
import Currently from './components/Currently';
import News from './components/News';

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      divStyle : {
        backgroundImage: `url(${background})`,
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      },
      showResults: false,
      currentVal:{},
      city: "",
      stateName: ""

    }
  }

  removeDiv = () => {
    this.setState({
      showResults: false
    })
  }

  getCurrentValues = (currently, city, stateName) => {
    this.setState({
      currentVal: currently,
      city: city,
      stateName: stateName
    }, () => console.log(this.state.city))
  }
  
  changeBackground = (backgroundValue) => {
    this.setState({
      showResults: true
    });
    let time = new Date().getHours();
    if (backgroundValue.includes("cloudy")) {
      backgroundValue = "cloudy"
    }
    if (backgroundValue.includes("snow") || backgroundValue.includes("flurries")) {
      backgroundValue = "snow"
    }
    if (backgroundValue.includes("clear") && time > 3) {
      backgroundValue = "clear2"
    }
    if (backgroundValue.includes("rainy") && time > 3) {
      backgroundValue = "rainy2"
    }
    if (backgroundValue.includes("snow2") && time > 3) {
      backgroundValue = "snow2"
    }
    switch (backgroundValue) {
      case "clear":
        this.setState(prevState => ({
          divStyle: {
            ...prevState.divStyle,           
            backgroundImage: `url(${clear})`
          }
        }))
        break;
      case "drizzile":
        this.setState(prevState => ({
          divStyle: {
            ...prevState.divStyle,           
            backgroundImage: `url(${rainy})`
          }
        }))
        break;
      case "cloudy":
        this.setState(prevState => ({
          divStyle: {
            ...prevState.divStyle,           
            backgroundImage: `url(${cloudy})`
          }
        }))
        break;
      case "snow":
        this.setState(prevState => ({
          divStyle: {
            ...prevState.divStyle,           
            backgroundImage: `url(${snow})`
          }
        }))
        break;
      case "clear2":
        this.setState(prevState => ({
          divStyle: {
            ...prevState.divStyle,           
            backgroundImage: `url(${clear2})`
          }
        }))
        break;
      case "rainy2":
        this.setState(prevState => ({
          divStyle: {
            ...prevState.divStyle,           
            backgroundImage: `url(${rainy2})`
          }
        }))
        break;
      case "snow2":
        this.setState(prevState => ({
          divStyle: {
            ...prevState.divStyle,           
            backgroundImage: `url(${snow2})`
          }
        }))
        break;
      default:
        break;
    }
    // this.setState(prevState => ({
    //   divStyle: {
    //     ...prevState.divStyle,           
    //     backgroundImage: `url(${clear})`
    //   }
    // }))
  }

  render () {
    const styles = {
      fontFamily: "sans-serif",
      textAlign: "center"
    };
    return (
      <div className="App" style={this.state.divStyle}>
        <div className="WeatherForm" >
          <WeatherForm backgroundValue= {this.changeBackground} getCurrentValues= {this.getCurrentValues} result={this.removeDiv}/>
        </div>
        {this.state.showResults ? 
            <div style={styles}>
              <Tabs
                activeTab={{
                  id: "tab1"
                }}
              >
                <Tabs.Tab id="tab1" title="Currently">
                  <div style={{ padding: 10 }}><Currently value={this.state.currentVal} city={this.state.city} stateName={this.state.stateName}/></div>
                </Tabs.Tab>
                <Tabs.Tab id="tab2" title="Weather News">
                  <div style={{ padding: 10 }}><News stateName={this.state.stateName}/></div>
                </Tabs.Tab>
              </Tabs>
            </div> : null }
      </div>
    );
  }
}

export default App;
