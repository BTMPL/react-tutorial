import React from "react";
import PropTypes from "prop-types";
import Navigate from "./../../common/Navigate/Navigate";
import { Row, Column } from "./../../common/Layout/Layout";
import Example from "./../../common/example/Example";

import { Uwaga } from "./../../common/Inserts/Inserts";

import Lekcja from "../Lekcja";

export default class Lesson extends Lekcja {

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
        url: '/lekcja/lekcja2/promise',
        title: 'Kod asynchroniczny - Promise',
      },      
      {
        url: '/lekcja/lekcja2/dekoratory',
        title: 'Dekoratory',
      },      
    ]
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
              mutowania danych - jeżeli do zmiennej przypiszemy obiekt, wciąż możemy (lecz nie powinniśmy!) modyfikować jego wartości.
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
        <Navigate prev={{url: '/lekcja/lekcja1/podstawowe-pojecia', title: 'Lekcja 1'}} next={this.getNext(this.props.section)} />
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
              arrow functions (zwane także "fat arrow") to nowy sposób deklarowania funkcji wprowadzony w ES6, którego główną cechą jest to, że automatycznie 
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
                Kopie tego typu są kopiami płytkimi - w przypadku wielowymiarowych tablic, tablic obiektów etc. uzyskamy kopię referencji. Uważajmy więc, by nie 
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

  renderClass = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Szybki kurs ES6 i ESNext</h2>
            <h3>Klasy</h3>            
            <p>
              Klasy wprowadzone w ES2015 nie są pełnoprawnym konstruktem, tak jak ma to miejsce w językach programowania zorientowanych obiektowo (ang. Object Oriented) - 
              stanowią one jedynie warstwę abstrakcji nad standardowym dla JS dziedziczeniem opartym o dziedziczenie prototypowe.
            </p>            
          </Column>
        </Row>        
        <Row>
          <Column width={6}>
            <Example>{`
              // kod ES6
              class Person {
                constructor(name) {
                  this.name = name;
                }
              }              

              const obj = new Person("Bartek");
            `}
            </Example>
          </Column>
          <Column width={6}>
            <Example>{`
              // kod ES5
              function _classCallCheck(instance, Constructor) { 
                if (!(instance instanceof Constructor)) { 
                  throw new TypeError("Cannot call a class as a function"); 
                } 
              }
              
              var Person = function Perons(name) {
                _classCallCheck(this, Perons);
              
                this.name = name;
              };

              var obj = new Person("Bartek");
            `}</Example>
          </Column>
        </Row>      
        <Row>
          <Column width={6}>
            <p>
              Każda klasa może zawierać wiele funkcji składowych - w JS wszystkie one są dostępne jako <code>public</code>. W celu odwołania się do funkcji składowej
              z wewnątrz klasy używamy zapisu <code>this.nazwaFunkcji()</code>. W celu odwołania się z zewnątrz, używamy <code>instancjaKlasy.nazwaFunkcji()</code>. Podobnie 
              sprawa ma się w przypadku dostępu do zmiennych.
            </p>
            <p>
              W celu zdefiniowania wartości statycznych, używamy notacji <code>NazwaKlasy.nazwaPola = 42</code> poza ciałem klasy.
            </p>
            <Uwaga>
              <h4>Uwaga</h4>
              <p>
                Definicje klasy nie są hoistowane - oznacza to, że w odróżnieniu od funkcji, nie jesteśmy w stanie użyć klasy, a następnie ją zdefiniować.
              </p>
            </Uwaga>
          </Column>
          <Column width={6}>
            <Example>{`
              // błąd! klasa nie została jeszcze zdefiniowana
              const blad = new Person();
              
              class Person {
                constructor(name) {
                  this.name = name ? name : Person.defaultName;
                }

                sayName() {
                  console.log(\`Witaj \$\{this.name\}!\`);
                }
              }                    
              Person.defaultName = "Anonim";

              // utworzenie nowej instancji klasy
              const obj = new Person("Bartek");

              // wywołanie metody na instancji
              obj.sayName(); // Witaj Bartek!

              // dostęp do zmiennej (pola) na instancji
              console.log(obj.name); // Bartek

              // dostęp do zmiennej statycznej
              console.log(Person.defaultName); // Anonim
            `}</Example>
          </Column>
        </Row>  
        
        <Row>
          <Column>
            <h3>Poza ES6</h3>
          </Column>
        </Row> 
        
        <Row>
          <Column width={6}>
            <p>
              W aktualnej wersji JS nie możemy korzystać z określeń typu <code>static</code> etc. czy też definiować zmienne bezpośrednio w ciele klasy - ale jeżeli używamy
              create-react-app, lub dodamy obsługę <a href="https://babeljs.io/docs/plugins/transform-class-properties/" target="_blank">class properties</a> do naszego projektu 
              będzie to możliwe. 
            </p>
            <p>
              Jest to zabieg który znacznie ułatwi nam pracę z komponentami klasowymi więc jest zdecydowanie zalecany.
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              class Person {
                // zamiast używać this.name w konstruktorze dla wartości nie-dynamicznych
                name = '';

                // zamiast zapisywać Person.defaultName poza klasą
                static defaultName = 'Anonim';

                // zamiast używać zapisu this.handleClick.bind() w konstruktorze
                handleClick = () => { }
              }
            `}</Example>
          </Column>
        </Row>                            
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div> 
    );
  }  
  
  renderModules = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Szybki kurs ES6 i ESNext</h2>
            <h3>Moduły</h3>          
            <p>
              Jednym z problemów występującym w JavaScript od samego początku był problem braku przestrzeni nazw - każda utworzona przez nas zmienna czy funkcja, o ile nie 
              osadzona w wewnątrz przestrzeni innej funkcji znajdowała się w przestrzeni globalnej i była dostępna jako <code>window.nazwaZmiennej</code> - w przypadku kiedy
              korzystaliśmy z wielu bibliotek mogły pojawić się problemy z nadpisywaniem się wzajemnie funkcji czy zmiennych o tych samych nazwach.
            </p>
            <p>
              Innym z problemów było samo udostępnianie i wykorzystywanie kodu - w tym celu po prostu dodawaliśmy plik z interesującym nas fragmentem JS do dokumentu HTML
              i w momencie załadowania kod był dostępny dla całej strony. Problemy oczywiście pojawiały się w momencie zwiększenia ilości kodu - długie ładowanie, skomplikowane
              zależności, problemy z utrzymaniem kodu rozproszonego w chaotyczny sposób po wielu plikach.
            </p>
            <p>
              Problem ten próbowano rozwiązać na wiele sposobów, najpopularniejsze z nich to CommonJS i ES6 modules.
            </p>
            <h3>CommonJS</h3>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              System modułów składa się z 2 części: pliku eksportującego dane.
            </p>
            <p>
              Plik, który eksportuje dane w formacie CommonJS używa notacji <code>module.exports</code> i określa dwa typy eksportów:
            </p>
            <ul>
              <li>eksport domyślny - oznaczony jako <code>module.exports.default</code> - każdy moduł może mieć maksymalnie jeden eksport domyślny</li>
              <li>eksport nazwany - oznaczony jako <code>modules.exports.NAZWA_EKSPORTU</code> - każdy moduł może deklarować dowolną ilość nazwanych eskportów</li>
            </ul>
            <p>
              Wszelkie wyeksportowane dane mogą zostać zaimportowane przez dowolny inny moduł/aplikację, zaś dane, które nie są eksportowane są stosowane jako prywatne API
              modułu i jeżeli nie udostępnimy interfejsu do ich modyfikacji nie będą one mogły być w żaden sposób modyfikowane.
            </p>            
          </Column>
          <Column width={6}>
            <Example>{`
              // Math.js

              const PI = 3.14;
              const obwodKola = (r) => 2 * PI * r;

              module.exports.pi = PI;
              module.exports.detauls = obwodKola; 
              
              // alternatywnie
              module.exports = {
                PI,
                default: obwodKola
              }
            `}</Example>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              W celu uzyskania dostępu do wyeksportowanych danych z innego modułu używamy funkcji <code>require</code>. W przypadku modułów CommonJS odwołania do konkretnych
              eksportów jest dosyć oczywiste - wszystkie one stanowią pola na zaimportowanym obiekcie.
            </p>
            <p>
              Domyślnie, jeżeli ścieżka do importowanego pliku nie zaczyna się od <code>.</code> oznacza to, że moduł powinien zostać odszukany w folderze <code>node_modules</code>.
              Zachowanie to może zostać zmodyfikowane w konfiguracji webpacka.              
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              const MyMath = require('./Math.js');
              console.log(MyMath.PI); // 3.14;

              console.log(MyMath.default(2)); // 2 * PI * r = 12.56

              // możemy także zaimportować określone elementy:
              const PI = require('./Math.js').PI;
              const obwodKola = require('./Math.js').default;

              // zaimportuj moduł NPM left-pad z katalogu node_modules
              const leftPad = require('left-pad');
            `}</Example>
          </Column>
        </Row>  
        <Row>
          <Column>
            <Uwaga>
              <h4>Uwaga</h4>
              <p>
                Node (a także webpack) w celu optymalizacji wydajności traktuje każdy moduł jako singleton. Oznacza to, że przy kolejnych importach modułu o dokładnie tej
                samej ścieżce jego kod nie zostanie ponownie wywołany. Dodatkowo wszelkie wewnętrzne modyfikacje poprzez upublicznione API są dostępne również w 
                zaimportowanych kopiach.
              </p>         
            </Uwaga>          
            <h3>ES6 modules</h3>
          </Column>
        </Row>      
        <Row>
          <Column width={6}>
            <p>
              ES6 definiuje własny format modułów, zachowujący ideę CommonJS ale wprowadzający nową składnię. ES6 modules oferują także dodatkowe zalety w postaci tree 
              shaking (nie importowanie kodu, który nie jest wykorzystywany w aplikacji).
            </p>  
            <p>
              Odpowiednik kodu z poprzednich listingów stosujący zapis <code>export</code>:
            </p>          
          </Column>
          <Column width={6}>
            <Example>{`
              // Math.js

              export const PI = 3.14;
              export default obwodKola = (r) => 2 * PI * r; // zwróć uwagę na brak const

              // alternatywnie
              exports = {
                PI
              };

              const obwodKola = (r) => 2 * PI * r; // zwróć uwagę na brak "const"
              export default obwodKola;              
            `}</Example>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              Odpowiednio, zamiast <code>require</code> używamy konstruktu <code>import</code>. Należy zwrócić uwagę, że eksport domyślny możemy zaimportować do naszej 
              aplikacji nadając mu dowolną nazwę - nie musi w żaden sposób pokrywać się z nazwą eksportowanego obiektu znajdującą się w <code>Math.js</code>.
            </p>
            <Uwaga>
              <h4>Uwaga</h4>
              <p>
                Pomimo że importowanie nazwanych eksportów wygląda podobnie do destrukturyzowania nie jest nim - nie można w ten sposób wydobyć pól składowych eksportu
                domyślnego.
              </p>         
            </Uwaga>             
          </Column>
          <Column width={6}>
            <Example>{`
              import { PI } from "./Math.js";
              console.log(PI); // 3.14;

              import obwod from "./Math.js";
              console.log(obwod(2)); // 2 * PI * r = 12.56

              // możemy także zaimportować wiele rzeczy razem
              import obwod, { PI } from "./Math.js";

              // lub zaimportować wszystkie nazwane eskporty:
              import * as MyMath from "./Math.js";
              console.log(MyMath.PI);

              // możemy także zmieniać nazwy eksportów nazwanych w momencie importu:
              import { PI as prawiePi } from "./Math.js";
              console.log(prawiePi); // 3.14
            `}</Example>
          </Column>
        </Row>                
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div>
    )
  }

  renderDekoratory = () => {
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
                // Użyj function by umożliwić późne wiązanie this
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
        <Navigate prev={this.getPrev(this.props.section)} next={{url: '/lekcja/lekcja3/wprowadzenie-do-react', title: 'Lekcja 3'}} />
      </div> 
    );
  }   

  renderPromise = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Szybki kurs ES6 i ESNext</h2>
            <h3>Kod asynchroniczny</h3>
            <p>
              Duża część pracy z JS zwiazana jest ze operacjami, które nie dzieją się od razu - odpytywanie zewnętrznych serwerów, oczekiwanie na 
              skomplikowane obliczenia czy wykonanie się innego kawałku kodu. Jako, że JS jest jedno wątkowy, wykonywanie tego typu operacji na głównym
              wątku powodowało by zablokowanie go - w rezultacie blokowało by także interakcję z UI etc.
            </p>
            <p>
              Dotychczasowo problem ten rozwiąznywany był przy użyciu callbacków - funkcje były wywoływane z inną funkcją, która była następnie wywoływana
              kiedy główne zadanie zostało wykonane. Kod taki stawał się nieczytelny i bardzo szybko można było przestać orientować się w jaki sposób 
              przebiega egzekucja aplikacji.
            </p>
            <p>
              W celu rozwiązania problemu w ES6 wprowadzono pojęcie Promise (z ang. "obietnice"), które raz rozpoczęte mogą zakończyć pozytywnie lub 
              negatywnie, a nasza aplikacja może "zasubskrybować" oba te zdarzenia.
            </p>

            <h3>Promise</h3>
          </Column>
        </Row>        
        <Row>
          <Column width={6}>
            <p>
              W celu utworzenia własnego Promise używamy konstruktora <code>new Promise</code> przekazując 2 callbacki - <code>resolve</code> i <code>reject</code>.
            </p>
            <p>
              W celu "zasubskrybowania" pomyślnego wykonania się Promise, na zwróconym obiekcie używamy metody <code>.then</code>, która jako parametr
              przyjmuje wartość, z jaką "wykonał" się Promise. W celu zasubskrybowania niepoprawnego wykonania, używamy analogicznie metody <code>.catch</code>.
            </p>
            <p>
              Samo Promise powinno zaś wywołać <code>resolve</code> jeżeli wszystko zakończyło się sukcesem, lub <code>reject</code> jeżeli operacja nie
              powiodła się. Wartość, z jaką zostaną wywołane w/w funkcje przekazywana jest odpowiednio do <code>then</code> oraz <code>catch</code>.
            </p>
          </Column>
          <Column width={6}>
            <Example isRunable={true}>{`
              const getPromise = () => {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    resolve(42);
                  }, 1000);
                });
              }

              alert('Tworze Promise');
              getPromise().then(value => {
                alert('Promise wykonane, wartość: ' + value);
              });
              alert('Promise utworzone pomyślnie');
            `}</Example>
          </Column>
        </Row>  
        <Row>
          <Column width={6}>
            <p>
              Promise może występować jedynie w jedynym z 3 stanów: nie wykonany, wykonany pomyślnie i wykonany niepomyślnie. Jeżeli użyjemy <code>.then</code>
              lub <code>.catch</code> na Promise które już wcześniej było wykonane pomyślnie/niepomyślnie, nasz "listener" zostanie wykonany w następnym 
              cyklu interpretora JS.
            </p>
            <p>
              Możliwe jest także utworzenie Promise które od razu będzie wykonane pomyślnie lub niepomyślnie używając <code>Promise.resolve()</code> lub 
              <code>Promise.reject()</code>
            </p>
          </Column>
          <Column width={6}>
            <Example isRunable={true}>{`
              const resolvedPromise = Promise.resolve();
              resolvedPromise.then(() => alert('Promise pomyślny!'));

              const rejectedPromise = Promise.reject();
              rejectedPromise.catch(() => alert('Promise zakonczony niepowodzeniem!'));

            `}</Example>
          </Column>
        </Row>    
        
        <Row>
          <Column width={6}>
            <p>
              Promisy mogą być także łączone w łańcuchy (ang. chained) - jeżeli funkcja przekazana w <code>then</code> zwróci cokolwiek innego niż wartość
              falsy lub odrzucone Promise, kolejny <code>then</code> zostanie wykonany (i odpowiednio dla łańcuchów <code>catch</code>).
            </p>
          </Column>
          <Column width={6}>
            <Example isRunable={true}>{`
              const resolvedPromise = Promise.resolve();
              resolvedPromise.then(() => {
                  alert('Pierwszy Promise pomyślny!');
                  return 42;
              }).then((value) => alert('Poprzednie "then" przesłało dalej ' + value));
            `}</Example>
          </Column>
        </Row>  
        
        <Row>
          <Column width={6}>
            <p>
              Dodatkowo, obiekt Promise zawiera dwa mechanizmy pozwalające na pracę z wieloma Promisami:
            </p>
            <p>
              <code>Promise.all([Promise])</code> - utworzy Promise, który wykona się w momencie, kiedy wszystkie przekazane obiekty Promise wykonają się<br />.
              <code>Promise.race([Promise])</code> - wywoła się w momencie, w którym wywoła się pierwszy z przekazanych obiektów Promise.
            </p>
          </Column>
          <Column width={6}>
            <Example isRunable={true}>{`
              Promise.all([
                new Promise(res => setTimeout(() => res(42), 1000)), // wykonaj po 1 sekundzie,
                new Promise(res => setTimeout(() => res(64), 2000)) // wykonaj po 2 sekundach
              ]).then(values => {
                alert('Wywołano z tablicą: ' + values.join(', '));
              });
            `}</Example>
            <Example isRunable={true}>{`
              Promise.race([
                new Promise(res => setTimeout(() => res(42), 1000)), // wykonaj po 1 sekundzie,
                new Promise(res => setTimeout(() => res(64), 2000)) // wykonaj po 2 sekundach
              ]).then(value => {
                alert('Wywołano z wynikiem: ' + value); // wywołane tylko dla pierwszego Promise!
              });
            `}</Example>            
          </Column>
        </Row>    
        <Row>
          <Column>
            <Uwaga>
              <h4>Uwaga</h4>
              <p>
                Raz uruchomionego Promise nie da się anulować. Jeżeli zachodzi potrzeba anulowania, należy przewidzieć to w części <code>then</code>. Istnieje 
                kilka rozwiązań tego problemu w postaci nieoficjalnych bibliotek.
              </p>
            </Uwaga>
          </Column>
        </Row>     
        <Navigate prev={this.getPrev(this.props.section)} next={{url: '/lekcja/lekcja3/wprowadzenie-do-react', title: 'Lekcja 3'}} />
      </div> 
    );
  }    
}