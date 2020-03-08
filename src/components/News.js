import React, { Component } from 'react'
import Card from "react-bootstrap/Card";
import axios from 'axios';

class News extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             headlines: []
        }
    }

    componentDidMount() {
        let keyword = "Weather " + this.props.stateName;
        let url = "http://newsapi.org/v2/everything?q=" + encodeURI(keyword) + "&sources=fox-news&pageSize=5&apiKey=XXXX"
        console.log(url);
        axios.get(url)
            .then(response => {
                this.setState(
                    () => ({
                        headlines: response.data.articles
                    }), 
                
                ()=> console.log(this.state.headlines))
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {

        return (
            <div style={{height:'700px', overflow:'scroll'}}>
                {this.state.headlines.map(function(d, idx){
                    return (
                        <Card key={idx} style={{marginLeft: '32%',width: '30rem', padding:'0.5rem', backgroundColor:'rgb(135,206,235,0.4)'}}>
                            <Card.Img variant="top" src={d.urlToImage} width="150rem" height='150rem'/>
                            <Card.Body style={{color:'black'}}>
                                <Card.Title>{d.title}</Card.Title>
                                <Card.Text>
                                {d.description}
                                </Card.Text>
                                <Card.Link variant='primary' href={d.url}>Read More</Card.Link>
                            </Card.Body>
                        </Card>
                    )
                })}
                <div style={{height:'150px', color:'black'}}>Powered by Google News</div>
            </div>
        )
    }
}

export default News
