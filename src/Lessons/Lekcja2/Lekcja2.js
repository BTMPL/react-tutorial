import React from "react";
import PropTypes from "prop-types";
import Navigate from "./../../common/Navigate/Navigate";
import { Row, Column } from "./../../common/Layout/Layout";
import Example from "./../../common/example/Example";

import { Uwaga } from "./../../common/Inserts/Inserts";


export default class Lesson extends React.Component {

  static propTypes = {
    section: PropTypes.string
  }

  static title = "Lekcja 2 - Szybki kurs ES6 i ESNext";

  static getSections = () => {
    return [
      {
        url: '/lekcja/lekcja2/const-let',
        title: 'const, let',
      },
      {
        url: '/lekcja/lekcja2/template-strings',
        title: 'Template strings, tagged template strings',
      }, 
      {
        url: '/lekcja/lekcja2/arrow-functions',
        title: 'Arrow functions',
      },           
      {
        url: '/lekcja/lekcja2/parametry-domyslne-destructuring',
        title: 'Parametry domyślne i destructuring',
      },   
      {
        url: '/lekcja/lekcja2/shorthand-object-notation-i-spread',
        title: 'Skrótowa notacja obiektowa, dynamiczne właściwości obiektu, operator spread i rest',
      },  
      {
        url: '/lekcja/lekcja2/class',
        title: 'Klasy',
      },             
      {
        url: '/lekcja/lekcja2/modules',
        title: 'Moduły',
      },
      {
        url: '/lekcja/lekcja2/promise-i-async-await',
        title: 'Promise i async await',
      },      
      {
        url: '/lekcja/lekcja2/decorators',
        title: 'Dekoratory',
      },      
    ]
  }  

  getPrev = (currentUrl) => {
    const index = Lesson.getSections().findIndex((item => {
      const split = item.url.split('/');
      return split[split.length - 1] === currentUrl;
    }));
    if(index === 0) {
      return;
    }
    return Lesson.getSections()[index - 1];
  }

  getNext = (currentUrl) => {
    const index = Lesson.getSections().findIndex((item => {
      const split = item.url.split('/');
      return split[split.length - 1] === currentUrl;
    }));
    if(index + 1 === Lesson.getSections().length) {
      return;
    }
    return Lesson.getSections()[index + 1];
  }  

  renderConstLet = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Szybki kurs ES6 i ESNext</h2>
            <h3>const, let</h3>            
            <p>
              ES6 wprowadza dwa nowe typy zmiennych - <code>const</code> oraz <code>let</code>. Oba są widoczne jedynie w zasięgu lokalnym, w którym zostały
              zdefiniowane i powinny być używane zamiast dotychczasowego <code>var</code>. Zmiennych tego typu nie można też ponownie deklarować.
            </p>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              <code>const</code> używamy wszędzie tam, gdzie przypisanie do zmiennej nie będzie ulegać zmianie. Użycie tego typu nie oznacza że nie ma możliwości
              mutowania danych - jeżeli do zmiennej przypiszemy obiekt, wciąż możemy (lecz nie powinniśmy!) modyfikować jego wartośći.
            </p>
            <p>
              Jeżeli chcemy by nasz obiekt był całkowicie nie mutowalny, możemy użyć <code>Object.freeze</code>
            </p>

          </Column>
          <Column width={6}>
            <Example>{`
              const a = 42;
              a = 43; // błąd - nie można zmienić przypisania

              const b = { theAnswerToLifeTheUniverseAndEverything: undefined }
              b.theAnswerToLifeTheUniverseAndEverything = 42; // poprawnie

              const c = { theAnswerToLifeTheUniverseAndEverything: undefined };
              Object.freeze(c);
              c.theAnswerToLifeTheUniverseAndEverything = 42; // błąd

              const d = [];
              d.push(42); // poprawnie
            `}</Example>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              <code>var</code> jest podobny w działaniu do <code>var</code> dostępny jest on jednak tylko w zasięgu, w którym zostałzadeklarowany.
            </p>

            <p>
              Dodatkową różnicą jest to, że w przypadku stosowania closure wartości zmiennej będą kopiowane, a nie przekazywane przez referencję.
            </p>

          </Column>
          <Column width={6}>
            <Example>{`
              if(true) {
                var a = 42;
                let b = 42;
              }
              console.log(a); // 42;
              console.log(b); // błąd - b nie jest zdefiniowane

              // wyświetli dwa razy "2"
              for(var i = 0 ; i < 2 ; i++) {
                setTimeout(function() { console.log(i) });
              }              

              // wyświetli "0" i "1"
              for(let i = 0 ; i < 2 ; i++) {
                setTimeout(function() { console.log(i) });
              }              
            `}</Example>
          </Column>
        </Row>        
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div> 
    );
  }

  renderTemplateString = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Szybki kurs ES6 i ESNext</h2>
            <h3>const, let</h3>            
            <p>
              ES6 wprowadza dwa nowe typy zmiennych - <code>const</code> oraz <code>let</code>. Oba są widoczne jedynie w zasięgu lokalnym, w którym zostały
              zdefiniowane i powinny być używane zamiast dotychczasowego <code>var</code>. Zmiennych tego typu nie można też ponownie deklarować.
            </p>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              <code>const</code> używamy wszędzie tam, gdzie przypisanie do zmiennej nie będzie ulegać zmianie. Użycie tego typu nie oznacza że nie ma możliwości
              mutowania danych - jeżeli do zmiennej przypiszemy obiekt, wciąż możemy (lecz nie powinniśmy!) modyfikować jego wartośći.
            </p>
            <p>
              Jeżeli chcemy by nasz obiekt był całkowicie nie mutowalny, możemy użyć <code>Object.freeze</code>
            </p>

          </Column>
          <Column width={6}>
            <Example>{`
              const a = 42;
              a = 43; // błąd - nie można zmienić przypisania

              const b = { theAnswerToLifeTheUniverseAndEverything: undefined }
              b.theAnswerToLifeTheUniverseAndEverything = 42; // poprawnie

              const c = { theAnswerToLifeTheUniverseAndEverything: undefined };
              Object.freeze(c);
              c.theAnswerToLifeTheUniverseAndEverything = 42; // błąd

              const d = [];
              d.push(42); // poprawnie
            `}</Example>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              <code>var</code> jest podobny w działaniu do <code>var</code> dostępny jest on jednak tylko w zasięgu, w którym zostałzadeklarowany.
            </p>

            <p>
              Dodatkową różnicą jest to, że w przypadku stosowania closure wartości zmiennej będą kopiowane, a nie przekazywane przez referencję.
            </p>

          </Column>
          <Column width={6}>
            <Example>{`
              if(true) {
                var a = 42;
                let b = 42;
              }
              console.log(a); // 42;
              console.log(b); // błąd - b nie jest zdefiniowane

              // wyświetli dwa razy "2"
              for(var i = 0 ; i < 2 ; i++) {
                setTimeout(function() { console.log(i) });
              }              

              // wyświetli "0" i "1"
              for(let i = 0 ; i < 2 ; i++) {
                setTimeout(function() { console.log(i) });
              }              
            `}</Example>
          </Column>
        </Row>        
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div> 
    );
  }  


  render() {
    if(this.props.section) {
      const section = 'render' + this.props.section.split('-').reduce((acc, item, index) => {
        return acc.concat(`${item.substr(0, 1).toUpperCase()}${item.substr(1)}`);
      }, []).join('')
      return this[section]();
    }
    
    return <div>Lesson 2</div>
  }
}