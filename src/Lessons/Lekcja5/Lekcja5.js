import React from "react";
import PropTypes from "prop-types";
import Navigate from "./../../common/Navigate/Navigate";
import { Row, Column } from "./../../common/Layout/Layout";
import Example from "./../../common/example/Example";

import { Uwaga } from "./../../common/Inserts/Inserts";

import Lekcja from "../Lekcja";

export default class Lesson extends Lekcja {

  static title = "Lekcja 5 - Receptury";

  static getSections = () => {
    return [      
      {
        url: '/lekcja/lekcja5/style-i-css',
        title: 'CSS'
      }, 
      {
        url: '/lekcja/lekcja5/ajax',
        title: 'Pobieranie danych - AJAX'
      }     
    ]
  }  

  renderStyleICss = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Receptury</h2>
            <h3>CSS</h3>
            <p>?</p>                  
          </Column>
        </Row>  
        
        <Navigate prev={{url: '/lekcja/lekcja4/przekazywanie-danych-do-rodzica', title: 'Lekcja 4'}} next={this.getNext(this.props.section)} />    
      </div>
    )
  }

  renderAjax = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Receptury</h2>
            <h3>Pobieranie danych - AJAX</h3>
            <p>?</p>                  
          </Column>
        </Row>  
        
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />    
      </div>
    )
  }  

}