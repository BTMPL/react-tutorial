import React from "react";

import Example from "./../../common/example/Example";
import es5 from './es5.demo';
import es6 from './es6.demo';

import example1 from './example.demo';

import { Row, Column } from "../../common/Layout/Layout";
import Navigate from "../../common/Navigate/Navigate";

export const title = "Intro";

export default class Lesson extends React.Component {

  render() {
    return (
      <div>
        <Row>        
          <Column>
            <h2>Intro</h2>
            <p>
              Poniższy kurs React tworzony jest z myślą o osobach nie posiadających lub posiadających podstawową wiedzę o tej bibliotece. Celem kursu jest zapoznanie się z API React oraz ReactDOM, poznanie kilku konceptów JavaScript wprowadzonych w standardzie ES6 (i późniejszym) oraz stowrzenie w pełni działającej aplikacji.
            </p>
            <p>
              Nauczysz się pracować ze stanem komponentów, zarządzać nim poprzez formularz, komunikować się z zewnętrznym serwisami używając fetch API oraz jak umieścić swoją aplikację na serwerze.            
            </p>
          </Column>          
        </Row>
        <Row>
          <Column width={6}>
            <p>
              Każdy przykład prezentowany będzie jako w pełni działająca mini-aplikacja lub część składowa tworzonej aplikacji. Nie będziesz tworzył kolejnego TODO, których setki znajdziesz na innych stronach.
            </p>
          </Column>
          <Column width={6}>
            <Example code={example1} />
          </Column>
        </Row>
        <Row>
          <Column>
            <p>
              Zapoznasz się z nowościami wprowadzonymi w standardzie ES6 poprzez przykłady ukazujące jak i dlaczego je stosować. Wszelkie braki w wiedzy uzupełnisz w podlinkowanej dokumentacji.              
            </p>          
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <Example code={es5} />
          </Column>
          <Column width={6}>
            <Example code={es6} />
          </Column>
        </Row>           
        <Navigate next="/lekcja/lekcja1/podstawowe-pojecia" />
      </div>
    )
  }
}