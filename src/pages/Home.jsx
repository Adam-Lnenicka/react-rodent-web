
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/Card.scss'
import '../scss/Home.scss'
import React, {useState} from "react";
import Card from "../components/Card.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import DATA from '../MOCK_DATA.json';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

export default function Home() {
  const [searchTerm, setSearchTerm]= useState("");
  const [page, setPage] =useState(4)


  const data = DATA.filter((data)=>{
      if (searchTerm ===""){
          return data
      }else if (data.name.toLowerCase().includes(searchTerm.toLowerCase())){
          return data
      }return null
  }).slice(0, page).map((data)=>{
      return(
        <Card   key={data.id} 
                name={data.name} 
                suborder={data.suborder} 
                family={data.family} 
                genus={data.genus} 
                image={data.image} 
                source={data.source} 
                detail={data.detail}/>)
              // <Cards key={data.id} button={data.button} image={data.image} date={data.date} heading={data.heading} author={data.author}/>)
  })
  
const displayMore =()=>{
  setPage (()=>page+4)
}


  return (
    <div className="App">

        <Header/>

        <div className="banner">
            <div>
                <h1>All you need to know about rodents.</h1>

                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText  style={{backgroundColor: "#cc7351", color: "white", border:"none"}}><i className="fas fa-search"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input                     
                        type="text"
                        placeholder="Search for your favourite rodent!"
                        value={searchTerm}
                        onChange={(e)=>{
                            setSearchTerm(e.target.value);
                        }}
                     />
                </InputGroup>
            </div>
        </div>

        <div className="card-section">
            {data}
        </div>
        <div  className="btn">
        <button className="show-more-btn" onClick ={displayMore}>Show more</button>
        </div>

        <Footer/>

    </div>
  );
}


