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
        title: 'Parametry domyślne, destructuring i rest',
      },   
      {
        url: '/lekcja/lekcja2/shorthand-object-notation-i-spread',
        title: 'Skrócona notacja obiektowa, dynamiczne właściwości obiektu, spread',
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
              <code>var</code> jest podobny w działaniu do <code>var</code> dostępny jest on jednak tylko w zasięgu, w którym został zadeklarowany.
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

  renderTemplateStrings = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Szybki kurs ES6 i ESNext</h2>
            <h3>template strings</h3>            
            <p>
              Definiowanie łańcuchów tekstowych, które zawierały w sobie dynamiczny kod, lub rozciągały na wiele linii było dosyć nie wygodne, dlatego w ES6
              wprowadzono nowy typ łańcuchów tekstowych - template strings. Aby je zdefiniować, tekst otaczamy znacznikami <code>`</code>.
            </p>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              Jeżeli tekst zostanie owinięty znacznikami <code>`</code> będzie on traktowany jako łańcuch tekstowy i wszelkie znaki specjalne zostaną
              potraktowane dosłownie aż do napotkania kolejnego znacznika <code>`</code>.
            </p>
            <p>
              Jeżeli chcemy w takim łańcuchu osadzić wartość dynamiczną używamy zapisu <code>{`\$\{wyrażenie\}`}</code>
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              const a = \`klasyczny łańcuch tekstowy\`;
              const b = \`łańcuch tekstowy
              w wielu liniach\`;

              const c = \`łańcuch z osadzoną zmienną: \${a}\`;
            `}</Example>
          </Column>
        </Row>
        <Row>
          <Column>
            <h3>tagged template strings</h3>            
          </Column>
        </Row>        
        <Row>
          <Column width={6}>
            <p>
              Template literals można użyć także do wywołania funkcji - zapis ten może wydawać się nieco dziwny, ale jest on popularny w niektórych rozwiązaniach
              np. w bibliotece styled-components
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              function logToConsole(input) {
                console.log("Loguję: ", input);
              }            

              logToConsole\`Witaj świecie!\`; // "Loguję: ", ["Witaj świecie"];

              const Component = styled.div\`
                color: 'red'
              \`;
            `}</Example>
          </Column>
        </Row>        
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div> 
    );
  }  

  renderArrowFunctions = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Szybki kurs ES6 i ESNext</h2>
            <h3>arrow function</h3>            
            <p>
              arrow functions (zwane także "fat arrow") to nowy sposób deklarowania funkcji wprowadzony w ES6, któego główną cechą jest to, że automatycznie 
              przechwytuje ona wartość <code>this</code> dla momentu zadeklarowania, nie wywołania funkcji. Nowa składnia najczęściej przydaje się w przypadku
              wywołań zwrotnych (ang. callback) lub funkcji wywoływanych w timerach.
            </p>
            <p>
              Dodatkową właściwością jest to, że w przypadku kiedy ciało funkcji składa się tylko z jednego wyrażenia zostanie ono automatycznie zwrócone, co 
              pozwala na tworzenie wizualnie krótszego kodu.
            </p>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              Automatyczne przechwytywanie <code>this</code> działa dokładnie tak samo jak użycie funkcji prototypowej <code>Function.prototype.bind</code> ale
              pozwala nam "nie martwić" się o to. Minusem może okazać się to, że nie możemy zmienić <code>this</code>, jakie przypisane jest do funkcji tego 
              typu.
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              function a() {
                setTimeout(function() { console.log(this) })                
              }
              new a(); // Window lub undefined w strict

              function b() {
                setTimeout(() => { console.log(this) });
              }
              new b(); // b{}
            `}</Example>
          </Column>
        </Row>    
        <Row>
          <Column width={6}>
            <p>
              Jeżeli funkcja posiada tylko jedno wyrażenie, możemy pominąć nawiasy <code>{'{}'}</code> a wartość wyrażenia zostanie zwrócona domyślnie. 
            </p>
            <p>
              Składnia ulega nieco zmianie, jeżeli nasza funkcja powinna zwrócić obiekt.
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              const a = () => 42;
              console.log(a()); // 42

              const b = () => ({
                test: 1
              });
              console.log(b()); // { test: 1 }
            `}</Example>
          </Column>
        </Row>                 
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div> 
    );
  }  

  renderParametryDomyslneDestructuring = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Szybki kurs ES6 i ESNext</h2>
            <h3>Parametry domyślne i destructuring</h3>            
            <p>
              Funkcje mogą od teraz deklarować wartości domyślne dla parametrów, dzięki czemu nie ma potrzeby rozwiązywania tego problemu w ciele funkcji. Dodatkowo
              pojawia się możliwość destrukturyzacji, czyli wybierania tylko niektórych kluczy z obiektów i tablic.
            </p>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              W odróżnieniu od innych języków, wartości domyślne mogą być dodane do dowolnej zmiennej, nie ma konieczności definiowania wartości domyślnych do
              wszystkich zmiennych kolejnych po tej, która deklaruje swoją wartość domyślną. W JS wszystkie nie przekazane zmienne otrzymują wartość <code>undefined</code>.
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              function test(a, b = 42, c) {
                console.log(a, b, c);
              }
              test(); // undefined, 42, undefined
            `}</Example>
          </Column>
        </Row>   
        <Row>
          <Column>
            <h3>destrukturyzowanie</h3>
          </Column>
        </Row>        
        <Row>
          <Column width={6}>
            <p>
              Destrukturozywanie przydaje się wszędzie tam, gdzie wiemy, że funkcja wywoływana będzie z obiektem / tablicą, ale interesują nas tylko wybrane klucze.
            </p>
            <p>
              Oczywiście i w tym wypadku możemy nadać zmiennym wartości domyślne.
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              function testObject({ jeden = 42 }) {
                console.log(jeden);
              }
              
              testObject({jeden: 1, dwa: 2}); // "1"
              testObject({dwa: 2}); // "42"
              
              function testArray([jeden]) {
                console.log(jeden);
              }
              testArray(["jeden", "dwa"]); // "jeden"
            `}</Example>
          </Column>
        </Row>    
        <Row>
          <Column>
            <h3>Operator rest</h3>
          </Column>
        </Row>         
        <Row>
          <Column width={6}>
            <p>
              Istnieje także możliwość przechwycenia wielu parametrów do jednej zmiennej. Możemy przechwycić wszystkie parametry, lub zadeklarować listę parametrów,
              które chcemy pobrać oddzielnie, oraz pobrać pozostałe do tablicy.
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              function test(...input) {
                console.log(input);
              }              
              test(1,2,3); // [1,2,3]
              
              function testOgraniczony(pierwszy, ...input) {
                console.log(pierwszy, input);
              }
              testOgraniczony(1,2,3); // 1, [2,3]
            `}</Example>
          </Column>
        </Row>
                
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div> 
    );
  }    

  renderShorthandObjectNotationISpread = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Szybki kurs ES6 i ESNext</h2>
            <h3>Skrócona notacja obiektowa, dynamiczne właściwości obiektu, spread</h3>            
            <p>
              Praca z obiektami stała się także o wiele wygodniejsza - głównie za pośrednictwem wprowadzenia nowych notacji na istniejącą już funkcjonalność.
            </p>

            <h3>Skrócona notacja obiektowa</h3>
          </Column>
        </Row>        
        <Row>
          <Column width={6}>
            <p>
              Jeżeli chcemy zadeklarować obiekt, który używać będzie zmiennych dla wartości kluczy, a nazwa tych kluczy powinna być taka sama jak nazwa zmiennych
              możemy pominąć ich wartość w czasie deklarowania.
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              const test = 42;
              const obj = {
                test
              };
              console.log(obj.test); // 42
            `}</Example>
          </Column>
        </Row>
        <Row>
          <Column>
            <h3>Dynamiczne właściwości obiektów</h3>
          </Column>
        </Row>        
        <Row>
          <Column width={6}>
            <p>
              Często zdarza się również, że chcemy utworzyć klucze w oparciu o nazwy zmiennych - do tej pory mogliśmy wpierw utworzyć obiekt, a następnie używając
              dostępu tablicowego dodać wartość. Teraz możliwe jest bezpośrednie tworzenie takich kluczy.
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              const test = "myKey";
              const obj = {
                [myKey]: 42
              };
              console.log(obj.myKey); // 42
            `}</Example>
          </Column>
        </Row>   
        <Row>
          <Column>
            <h3>Spread (Array i Object)</h3>
          </Column>
        </Row>        
        <Row>
          <Column width={6}>
            <p>
              Pojawia się także nowa składnia pozwalająca na kopiowanie obiektów - zastępuje ona funkcjonalność taką jak <code>splice</code> czy <code>concat</code>.
            </p>
            <p>
              ES6 obsługuję te notację jedynie w przypadku tablic, ale istnieje proposal dodający wsparcie również w przypadku obiektów. W świecie React jest on na
              tyle popularny, że warto o nim wspomnieć.
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              const source = [1, 2];
              const copy = [...source]; // [1, 2];
              const append = [...source, 3]; // [1, 2, 3];
              const prepend = [0, ...source]; // [0, 1, 2];

              const obj = { test: 1, test2: 2 };
              const copyObj = { ...obj, test3: 3 }; // { test: 1, test2: 2, test3: 3 }
              const copyWithOverwrite = { ...obj, test2: 3 }; // { test: 1, test2: 3 }
            `}</Example>
          </Column>
        </Row>     
        <Row>
          <Column>
            <Uwaga>
              <h4>Uwaga</h4>
              <p>
                Kopie tego typu są kopiami płytkimi - w przypadku wielo wymiarowych tablic, tablic obiektów etc. uzyskamy kopię referencji. Uważajmy więc, by nie 
                mutować oryginalnych danych!
              </p>
              <Example>{`
                const source = [
                  { test: 1 }
                ];
                const copy = [...source];
                copy[0].test = 2;
                console.log(source[0].test); // 2
              `}</Example>
            </Uwaga>
          </Column>
        </Row>                           
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div> 
    );
  } 

  renderDecorators = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Szybki kurs ES6 i ESNext</h2>
            <h3>Dekoratory</h3>
            <p>
              Dekoratory nie są w prawdzie jeszcze standardem ES, ale wszystko wskazuje na to, że staną się w kolejnych wersjach. Już teraz można je natomiast 
              spotkać w popularnych bibliotekach tj. MobX czy react-dnd.
            </p>
            <p>
              Dekoratory są zapewne znane wszystkim, mającym wcześniej styczność z Javą. Ich zadaniem jest modyfikowanie lub obserwowanie metod i klas. Obecnie nie 
              ma możliwości stosowania dekoratorów bezpośrednio dla funkcji nie będących metodami klasy.
            </p>
          </Column>
        </Row>        
        <Row>
          <Column width={6}>
            <p>
              Dekoratory są definiowane jako funkcje, które przyjmują 3 parametry:
            </p>
            <ul>
              <li>target - klasę, na której zostały zastosowane</li>
              <li>nazwę - nazwę metody, na której są zastosowane; w przypadku dekorowania klas będzie to <code>undefined</code></li>
              <li>deskryptor - obiekt reprezentujący właściwości metody; w przypadku klas będzie to <code>undefined</code></li>
            </ul>
            <p>
              Deskryptor zaś składa się z 4 pól, które możemy mutować:
            </p>
            <ul>
              <li>configurable - bool - określa, czy obiekt można konfigurować (np. usuwać)</li>
              <li>enumerable - bool - czy wartość powinna być możliwa do enumeracji (używając <code>for x in obj</code></li>
              <li>writable - bool - określa, czy obiekt można nadpisać</li>
              <li>value - mixed - referencja do obiektu</li>
            </ul>
          </Column>
          <Column width={6}>
            <Example>{`
              const time = (target, name, descriptor) => {
                const original = descriptor.value;
                // Uzyj function by umożliwić późne wiązanie this
                descriptor.value = function(...input) {
                  console.time(name);
                  original.apply(this, ...input)
                  console.timeEnd(name);
                }
              }
              
              const readonly = (target, name, descriptor) => {
                descriptor.writable = false;
              }
              
              class Demo {                
                @time
                member() {
                  console.log('Wywołano metodę "member"');
                }
                
                @readonly
                a = 5;
              }
              
              const obj = new Demo;
              obj.member();
              /**
               * Wywołano metodę "member"
               * member: 0.203857421875ms
               */

              obj.a = 1;
              console.log(obj.a); // 5
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