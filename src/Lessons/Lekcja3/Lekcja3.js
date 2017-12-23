import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import Navigate from "./../../common/Navigate/Navigate";
import { Row, Column } from "./../../common/Layout/Layout";
import Example from "./../../common/example/Example";

import { Uwaga } from "./../../common/Inserts/Inserts";

import Lekcja from "../Lekcja";

export default class Lesson extends Lekcja {

  static title = "Lekcja 3 - Wprowadzenie do React";

  static getSections = () => {
    return [
      {
        url: '/lekcja/lekcja3/wprowadzenie-do-react',
        title: 'ReactDOM',
      },
      {
        url: '/lekcja/lekcja3/jsx',
        title: 'JSX',
      },
      {
        url: '/lekcja/lekcja3/komponenty',
        title: 'Komponenty',
      },
      {
        url: '/lekcja/lekcja3/kompozycja',
        title: 'Kompozycja',
      }
    ]
  }  

  renderWprowadzenieDoReact = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Wprowadzenie do React</h2>

            <h3>ReactDOM</h3>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              Aplikacje napisane w React znacząco różnią się od aplikacji pisanych w innych technologiach, szczególnie w przypadku 
              aplikacji napisanych w czystym JS - główna różnica to sposób w jaki integrują się one z DOM. O ile React umożliwia 
              pracę z "zastanym" kodem HTML, o tyle w większości przypadków cały kod HTML generowany będzie przez naszą aplikację, 
              więc odwiedzana przez użytkowników strona będzie zawierać tylko kilka znaczników HTML. Oczywiście nie jest to jedyne 
              rozwiązanie - jeżeli zależy nam na SEO, czy też chcemy zoptymalizować czas, jaki potrzebny jest do wygenerowania naszej
              aplikacji możemy użyć technologii zwanej "renderowanie na serwerze" (ang. server side rendering). Na początek jednak
              skupimy się na "domyślnym" rozwiązaniu.
            </p>
            <p>
              Jeżeli podejrzymy kod strony, na której osadzono przykładową stronę React powinniśmy zobaczyć tylko prostą strukturę HTML
              oraz odwołania do CSS i JS.
            </p>

          </Column>
          <Column width={6}>
            <Example>{`
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8" />
                  <meta name="viewport" content="width=device-width" />
                  <title>Webpack App</title>
                </head>
                <body>
                  <div id="react-app"></div>
                  <script type="text/javascript" src="/bundle.js"></script>
                </body>
              </html>
            `}</Example>
            <p><small>Przykładowy kod HTML aplikacji React. Cała nasza aplikacja żyje w pliku bundle.js</small></p>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              Przystąpmy do tworzenia pierwszej aplikacji - typowe "hello world". Na początek stworzymy ją w jednym pliku HTML.
            </p>
            <p>
              Utwórzmy plik <b>index.html</b>, w którym zawrzemy kod HTML powyżej, wzbogacony o naszą aplikację:
            </p>
            <p>
              Linia 9-10 - do projektu dołączone zostały dwie biblioteki JS w formacie UMD (ang. Universal Module Definition) zawierające odpowiednio
              kod React oraz kod renderera do formatu DOM.
            </p>            
            <p>
              Linia 15 - wywołanie metody render obiektu ReactDOM (dodanego przez plik JS jako <code>window.ReactDOM</code>) powodujące wyświetlenie 
              naszej aplikacji
            </p>
          </Column>        
          <Column width={6}>
            <Example>{`
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8" />
                  <meta name="viewport" content="width=device-width" />
                  <title>Webpack App</title>
                </head>
                <body>
                  <script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
                  <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
                  
                  <div id="react-app"></div>
                  
                  <script>
                    ReactDOM.render('Witaj świecie!', document.getElementById('react-app'));
                  </script>  
                </body>
              </html>          
            `}</Example>
          </Column>
          <Column>
            <p>
              Metoda <code>ReactDOM.render</code> jest jedną z niewielu metod obiektu ReactDOM, które musimy poznać. Domyślnie przyjmuje ona dwa 
              parametry: kod JSX (alternatywnie: string, false lub undefined), który chcemy wyświetlić, oraz HTMLNode, do którego chcemy wyrenderować 
              naszą aplikację. W naszym wypadku zamiast kodu JSX używamy zwykłego łańcucha tekstowego.
            </p>          
          </Column>
        </Row>
        <Navigate prev={{url: '/lekcja/lekcja2/dekoratory', title: 'Lekcja 2'}} next={this.getNext(this.props.section)} />
      </div>
    )
  }

  renderJsx = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Wprowadzenie do React</h2>
            <h3>JSX</h3>          
            <p>
              Nasza aplikacja działa, ale jest strasznie prosta - renderuje tylko zwykły string. Jeżeli spróbujemy dodać do niego znaczniki HTML 
              zostaną one również potraktowane jako łańcuch tekstowy i wyświetlone jako tekst, nie jako znaczniki HTML.
            </p>          
            <p>
              React używa własnego języka znaczników - JSX, który stanowi rozszerzenie języka JS przy pomocy składni przypominającej XML. Nie jest
              to jednak ani XML, ani HTML, a co więcej znaczniki te nie są w żaden sposób interpretowane przez przeglądarkę - stanowią one jedynie
              ułatwienie dla developerów przy pracy z React. Jeżeli nie podoba nam się "umieszczanie HTML w JS" istnieje wiele alternatyw jak 
              react-hyperscript czy też pisanie własnoręcznie wygenerowanego kodu. 
            </p>
            <Uwaga>
              <h4>Uwaga</h4>
              <p>           
                Znaczniki JSX nie są interpretowane przez przeglądarkę i będą prowadzić do powstawania błędów. Od teraz wszystkie przykłady uruchamiaj
                w środowisku <acronym title="create-react-app">CRA</acronym> lub innym boilerplate. Kod z tej sekcji umieść w 
                pliku <code>src/index.js</code> i uruchom projekt poleceniem <code>npm start</code>. Jeżeli nie skonfigurowałeś 
                jeszcze <acronym title="create-react-app">CRA</acronym> zajrzyj do sekcji <Link to={'/lekcja/lekcja1/create-react-app'}>Lekcja 1</Link>.
              </p>
            </Uwaga>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              Uaktualnijmy zatem naszą aplikację tak, by wyglądała jak typowy Tweet. Dodamy trochę znaczników HTML oraz nieco więcej tekstu.
            </p>
            <p>
              Po zapisaniu zmian na ekranie wyświetli nam się poprawnie sformatowany Tweet - nasz kod JSX został zamieniony na poprawną składnię
              HTML.
            </p>
          </Column>
          <Column width={6}>
            <Example isRunnable>{`
              import React from "react";
              import ReactDOM from "react-dom";

              ReactDOM.render(
                <div>
                  <b>Bartosz Szczeciński</b> @btmpl - <time>11 Listopada</time>
                  <p>
                    Witaj świecie!
                  </p>
                </div>
              , document.getElementById('root'));
            `}</Example>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              Dociekliwy developer zapyta się, po co importujemy <code>React</code> skoro nie jest on używany nigdzie w kodzie aplikacji (a niektóre 
              IDE mogą także podkreślić nam to jako błąd). Musimy zaimportować ten obiekt, ponieważ JSX nie jest składnią, którą jest w stanie rozpoznać
              ani przeglądarka, ani webpack. JSX jest tłumaczony na wywołania JavaScript.
            </p>
            <p>
              Po przekształceniu JSX na JS widzimy, że nasz każdy tag JS zamienił się w wywołanie <code>React.createElement</code>, które przyjmuje
              trzy argumenty:
            </p>
            <ul>
              <li>nazwę elementu, który renderujemy</li>
              <li>obiekt atrybutów, które przekazujemy do renderowanego elementu (więcej o tym w dalszych rozdziałach)</li>
              <li>trzeci i kolejny parametr reprezentują elementy potomne</li>
            </ul>
            <p>
              Z tej transformacji wynika kilka kilka ważnych ograniczeń JSX:              
            </p>
            <ul>
              <li>
                każde wywołanie <code>render()</code> jako parametr wejściowy może przyjąć tylko jeden element JSX (ale - elementem tym może być
                tablica elementów, lub element zawierający wiele innych elementów)
              </li>
              <li>
                każdy znak musi zawierać się w znaczniku HTML, dlatego jeżeli chcemy wyrenderować spację pomiędzy dwoma elementami musimy użyć notacji
                <code>{" "}</code>.
              </li>
            </ul>
          </Column>
          <Column width={6}>
            <Example isRunnable>{`
              import React from "react";
              import ReactDOM from "react-dom";
                          
              ReactDOM.render(React.createElement(
                'div',
                null,
                React.createElement(
                  'b',
                  null,
                  'Bartosz Szczeciński'
                ),
                ' @btmpl - ',
                React.createElement(
                  'time',
                  null,
                  '11 Listopada'
                ),
                React.createElement(
                  'p',
                  null,
                  'Witaj Świecie!'
                )
              ), document.getElementById('root'));            
            `}</Example>
            <p><small>Przykład kodu JSX przetransformowanego na JS za pomocą <a href="https://babeljs.io/repl/" target="_blank">https://babeljs.io/repl/</a></small></p> 
          </Column>
        </Row>
        <Row>
          <Column>
            <h3>Używanie JS w składni JSX</h3>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              W kodzie JSX istnieje możliwość używania nie tylko stringów i znaczników HTML (oraz komponentów, o czym dowiesz się za chwilę), ale także
              kodu JS. Kod JS w JSX osadzamy dokładnie tak samo jak w przypadku template strings - w celu wskazania, że zamierzamy zamieścić kod JS otaczamy 
              go znacznikami <code>{'{ }'}</code>, zaś sam kod jest bezpośrednio wywoływany i powinien on zwrócić wartość (nie możemy zatem bezpośrednio 
              definiować obiektów, używać konstruktów if/else etc.).
            </p>
            <p>
              Zmodyfikujmy zatem nasz kod tak, by data była zawsze aktualna:
            </p>
          </Column>
          <Column width={6}>
            <Example isRunnable>{`
              import React from "react";
              import ReactDOM from "react-dom";

              ReactDOM.render(
                <div>
                  <b>Bartosz Szczeciński</b> @btmpl - 
                  <time>{(new Date()).toString()}</time>
                  <p>
                    Witaj świecie!
                  </p>
                </div>
              , document.getElementById('root'));
            `}</Example>
          </Column>
        </Row>
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div> 
    );
  }

  renderKomponenty = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Wprowadzenie do React</h2>
            <h3>Komponenty bezstanowe</h3>          
            <p>
              Jedną z głównych zalet React jest możliwość tworzenia komponentów, które "ukrywają" nam szczegóły implementacji i pozwalają na szybkie
              dodawanie funkcjonalności do naszej aplikacji. Na przykład jeżeli chcemy dodać odtwarzacz video, dodajemy po prostu w kodzie JSX 
              <code>&lt;Video&gt;</code> - brzmi to trochę jak tworzenie własnych tagów HTML i poniekąd tak wygląda. Zamieńmy zatem nasz Tweet w komponent
              React.
            </p>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              React wyróżnia dwa typu komponentów: komponent bezstanowy (ang. stateless functional component, SFC) będący funkcją, oraz komponent stanowy
              (ang. stateful functional component) reprezentowany przez klasę. Na początek utworzymy nasz komponent jako komponent SFC.
            </p>
            <p>
              Utwórzmy zatem funkcję i zapiszmy ją do zmiennej <code>Tweet</code> (możesz również stworzyć normalną funkcję używając składni <code>function</code>
              ale dobrze jest znać różnice pomiędzy tymi dwiema składniami) i przenieśmy do niej nasz kod HTML. Funkcja ta po prostu zwraca kod JSX.
            </p>

          </Column>
          <Column width={6}>
            <Example isRunnable>{`
              import React from "react";
              import ReactDOM from "react-dom";

              const Tweet = () => (
                <div>
                  <b>Bartosz Szczeciński</b> @btmpl - 
                  <time>{(new Date()).toString()}</time>
                  <p>
                    Witaj świecie!
                  </p>
                </div>
              )

              ReactDOM.render(
                <Tweet />
              , document.getElementById('root'));
            `}</Example>
          </Column>
        </Row>

        <Row>
          <Column width={6}>
            <p>
              Następnym krokiem jest usunięcie tego kodu z wywołania <code>ReactDOM.render</code> i zastąpienie go <code>&lt;Tweet /&gt;</code>.
            </p>
            <p>
              Na skutek tej operacji zaktualizowany zostanie kod JS - zwróć uwagę, że dookoła <code>Tweet</code> nie ma w nim cudzysłowu.
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              ReactDOM.render(
                React.createElement(Tweet, null), 
                document.getElementById('root')
              );
            `}</Example>
          </Column>
        </Row> 
        <Row>
          <Column>
            <h3>Komponenty stanowe</h3>
            <p>
              Wspomnianym drugim typem komponentów są komponenty stanowe - odróżnia je nie tylko to, że posiadają one stan, czyli mogą przechowywać
              dane odnośnie swojej reprezentacji (przykładowo komponent na wprowadzanie tekstu - <code>&lt;input&gt;</code> zawierałby informacje
              o aktualnie wpisanym tekście), ale posiadają też funkcje cyklu życia. Funkcje cyklu życia wywoływane są w określonych momentach i pozwalają
              na przygotowanie i sterowanie działaniem komponentu. Więcej dowiesz się o nich w dalszych rozdziałach, na razie przepiszmy nasz komponent
              na prosty komponent stanowy.
            </p>
          </Column>
        </Row> 
        <Row>
          <Column width={6}>
            <p>
              Komponenty stanowe opisywane są poprzez klasy i jeżeli nie miałeś jeszcze z nimi styczności polecam zapoznać się chociażby z podstawową
              składnią.
            </p>
            <p>
              Komponenty stanowe opisywane są przez klasę <code>React.Component</code> i muszą implementować przynajmniej funkcję <code>render</code>, która
              zwraca kod JSX komponentu. Usuńmy zatem naszą zmienną Tweet i zamiast niej utwórzmy klasę.
            </p>
            <p>
              Przy okazji usunęliśmy generowanie daty z samego JSX przez co nasz kod stał się nieco bardziej czytelny. Tę samą operację możemy też wykonać
              w komponentach bezstanowych!
            </p>
            <p>
              Komponenty stanowe są nieznacznie wolniejsze niż komponenty bezstanowe dlatego wiele poradników lub presetów do ESlint zaleca ich stosowanie,
              jednak wybór ten nie wpływa na wydajność w aż tak znaczącym stopniu.
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              class Tweet extends React.Component {

                render() {
                  const date = (new Date()).toString();
                  return (
                    <div>
                      <b>Bartosz Szczeciński</b> @btmpl - 
                      <time>{date}</time>
                      <p>
                        Witaj świecie!
                      </p>
                    </div>                    
                  )
                }
              }
            `}</Example>
          </Column>
        </Row>         
        <Row>
          <Column>
            <Uwaga>
              <h4>Uwaga</h4>
              <p>
                Nazwa naszego komponentu - Tweet - nie przypadkowo zaczyna się dużą literą. W ten sposób dajemy znać JSX, że chodzi nam o komponent,
                a nie o znacznik HTML. Jeżeli utworzymy komponent <code>header</code> i nie użyjemy wielkiej litery, podczas transformacji zostanie
                on potraktowany jako znacznik HTML i nie uzyskamy oczekiwanego efektu.
              </p>
            </Uwaga>
          </Column>
        </Row>      
        <Row>
          <Column width={6}>
            <p>
              Możemy teraz wyrenderować listę kilku Tweetów, przekazując do ReactDOM.render tablicę obiektów lub tworząc jeden dodatkowy znacznik HTML,
              w którym przekażemy listę naszych Tweetów.
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
            ReactDOM.render(
              <div>
                <Tweet />
                <Tweet />
                <Tweet />
              </div>
            , document.getElementById('root'));
          `}</Example>
          </Column>
        </Row>
        <Row>
          <Column>
            <Uwaga>
              <h4>Uwaga</h4>
              <p>
                Uwaga - jeżeli postanowiłeś użyć tablicy, nie przejmuj się chwilowo informacją o błędzie, jak React zgłasza w konsoli :)
              </p>
            </Uwaga>
          </Column>
        </Row>
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div> 
    );
  }


  renderKompozycja = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Wprowadzenie do React</h2>
            <h3>Kompozycja</h3>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              Jedną z mantr React jest "kompozycja ponad dziedziczenie". Oznacza to, że nasze komponenty nie powinny rozszerzać funkcjonalności już 
              istniejących komponentów, a tworzyć nowe w oparciu o już istniejące. W praktyce sprowadza się to do wyćwiczenia u siebie umiejętności
              dostrzegania elementów UI, które będziemy mogli wykorzystać w wielu miejscach naszej aplikacji. 
            </p>
            <p>
              Nie musimy od razu wiedzieć w jaki sposób będą one wykorzystywane - tutaj przyjdą nam z pomocą bardziej zaawansowane tematy jak komponenty
              wyższego rzędu (ang. high order components) czy wzorzec "render as callback" / "function as child".
            </p>
            <p>
              Wydzielmy zatem z naszego komponentu Tweet obiekty, które na pewno przydadzą nam się gdzie indziej: komponent wskazujący czas oraz komponent
              wskazujący autora Tweetu.
            </p>
          </Column>        
          <Column width={6}>
            <Example isRunnable>{`
              import React from "react";
              import ReactDOM from "react-dom";
              
              const TweetTime = () => <time>11 Listopada</time>;
              const TweetUser = () => <span><b>Bartosz Szczeciński</b> @btmpl</span>;
              
              class Tweet extends React.Component {
              
                render() {
                  const date = (new Date()).toString();
                  return (
                    <div>
                      <TweetUser /> -
                      <TweetTime />
                      <p>
                        Witaj świecie!
                      </p>
                    </div>
                  )
                }
              }
              
              ReactDOM.render(<Tweet />, document.getElementById('root'));            
            `}</Example>
          </Column>
        </Row>   
        <Row>
          <Column>
            <p>
              W ten sposób określamy także i ograniczamy API naszego komponentu - teraz za każdym razem, kiedy jako konsumenci biblioteki chcemy wyrenderować Tweet
              używamy jednego prostego komponentu, który wewnętrznie używa mniejszych komponentów, które jego twórca może wyeksportować z biblioteki i umożliwić
              nam na użycie w innych miejscach aplikacji.
            </p>
          </Column>
        </Row>   
        <Navigate prev={this.getPrev(this.props.section)} next={{url: '/lekcja/lekcja4/props', title: 'Lekcja 4'}} />
      </div> 
    );
  }  
}