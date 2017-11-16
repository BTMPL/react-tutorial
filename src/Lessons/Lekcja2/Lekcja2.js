import React from "react";
import PropTypes from "prop-types";
import Navigate from "../../common/Navigate/Navigate";
import { Row, Column } from "../../common/Layout/Layout";
import Example from "./../../common/example/Example";

import { Uwaga } from "../../common/Inserts/Inserts";


export const title = "Lekcja 2 - Wprowadzenie do React";

export default class Lesson extends React.Component {

  static propTypes = {
    section: PropTypes.string
  }

  getSections = () => {
    return [
      {
        url: '/lekcja/lekcja2/wprowadzenie-do-react',
        title: 'ReactDOM',
      },
      {
        url: '/lekcja/lekcja2/jsx',
        title: 'JSX',
      },
      {
        url: '/lekcja/lekcja2/komponenty',
        title: 'Komponenty',
      },
      {
        url: '/lekcja/lekcja2/kompozycja',
        title: 'Kompozycja',
      },
      {
        url: '/lekcja/lekcja2/prop-types',
        title: 'propTypes i defaultProps'
      },
      {
        url: '/lekcja/lekcja2/listy-komponentow',
        title: 'Listy komponentów'
      },
      {
        url: '/lekcja/lekcja2/stan-komponentu-i-zdarzenia',
        title: 'Stan komponentu i zdarzenia'
      },
      {
        url: '/lekcja/lekcja2/cykl-zycia-komponentu',
        title: 'Cykl życia komponentu',
      },
      {
        url: '/lekcja/lekcja2/formularze-kontrolowane-niekontrolowane-oraz-referencje',
        title: 'Formularz kontrolowane, niekontrolowane oraz referencje'
      },
      {
        url: '/lekcja/lekcja2/przekazywanie-danych-do-rodzica',
        title: 'Przekazywanie danych do rodzica i rodzeństwa'
      }
    ]
  }  

  renderIndex = () => {

  }

  getPrev = (currentUrl) => {
    const index = this.getSections().findIndex((item => {
      const split = item.url.split('/');
      return split[split.length - 1] === currentUrl;
    }));
    if(index === 0) {
      return;
    }
    return this.getSections()[index - 1];
  }

  getNext = (currentUrl) => {
    const index = this.getSections().findIndex((item => {
      const split = item.url.split('/');
      return split[split.length - 1] === currentUrl;
    }));
    if(index + 1 === this.getSections().length) {
      return;
    }
    return this.getSections()[index + 1];
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
              Jeżeli podejrzymy kod strony, na której osadzono przykładową stronę React powinniśmy zobaczyć tylko prosą strukturę HTML
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
              Utwórzmy plik <b>index.html</b>, w którym zawrzemy kod HTML powyżej, wzbogazony o naszą aplikację:
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
              Metoda <code>ReactDOM.render</code> jest jedną z niewielu metod obiektu ReactDOM, którę musimy poznać. Domyślnie przyjmuje ona dwa 
              parametry: kod JSX (alternatywnie: string, false lub undefined), który chcemy wyrenderować, oraz HTMLNode, do którego chcemy wyrenderować 
              naszą aplikację. W naszym wypadku zamiast kodu JSX używamy zwykłego łańcucha tekstowego.
            </p>          
          </Column>
        </Row>
        <Navigate prev={{url: '/lekcja/lekcja1', title: 'Lekcja 1'}} next={this.getNext(this.props.section)} />
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
          </Column>
        </Row>
        <Row>
          <Column>
            <p>
              Nasza aplikacja działa, ale jest strasznie prosta - renderuje tylko zwykły string. Jeżeli spróbujemy dodać do niego znaczniki HTML 
              zostaną one również potraktowane jako łańcuch tekstowy i wyświetlone jako tekst, nie jako znaczniki HTML.
            </p>          
            <p>
              React używa włąsnego języka znaczników - JSX, który stanowi rozszerzenie języka JS przy pomocy składni przypominającej XML. Nie jest
              to jednak ani XML, ani HTML, a co więcej znaczniki te nie są w żaden sposób interpretowane przez przeglądarkę - stanowią one jedynie
              ułatwienie dla developerów przy pracy z React. Jeżeli nie podoba nam się "umieszczanie HTML w JS" istnieje wiele alternatyw jak 
              react-hyperscript czy też pisanie własnoręcznie wygenerowanego kodu. 
            </p>
            <Uwaga>
              <h4>Uwaga</h4>
              <p>           
                Znaczniki JSX nie są interpretowane przez przeglądarkę i będą prowadzić do powstawania błędów. Od teraz wszystkie przykłady uruchamiaj
                w środowisku create-react-app lub innym boilerplate. Kod z tej sekcji umieść w pliku <code>src/index.js</code>
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
            <Example>{`
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
              <li>dziecko elementu</li>
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
            <Example>{`
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
              kodu JS. W celu wskazania, że zamierzamy zamieścić kod JS otaczamy go znacznikami <code>{'{ }'}</code>, zaś sam kod jest bezpośrednio wywoływany
              i powinien on zwrócić wartość (nie możemy zatem bezpośrednio definiować obiektów, używać konstruktór if/else etc.)
            </p>
            <p>
              Zmodyfikujmy zatem nasz kod tak, by data była zawsze aktualna:
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
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

        <Row>
          <Column width={6}>
            <p>
              JS możemy także użyć jako wartość atrybutów dla znaczników (oraz properties/props dla komponentów) - w takim wypadku również musimy
              mieć na uwadze to, że kod powinien "od razu zwrócić" wartość, którą chcemy przekazać, np:
            </p>
            <p>
              W przykładzie możesz zdziwić się widząc składnię <code>`{'{{ }}'}`</code> - bez obaw! Po prostu do atrybutu <code>style={'{}'}</code> 
              przekazujemy obiekt JS!
            </p>
          </Column>
          <Column width={6}>
            <Example>{`                          
              ReactDOM.render(
                <div style={{color: Math.random() > 0.5 ? 'red' : 'blue'}}>
                  Witaj kolorowy świecie!
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
            <h3>Komponenty</h3>
          </Column>
        </Row>
        <Row>
          <Column>
            <p>
              Jedną z głównych zalet React jest możliwość tworzenia komponentów, które "ukrywają" nam szczegóły implementacji i pozwalają na szybkie
              dodawanie funkcjonalności do naszej aplikacji. Na przykład jeżeli chcemy dodać odtwarzacz video, dodajemy po prostu w kodzie JSX 
              <code>&lt;Video&gt;</code> - brzmi to trochę jak tworzenie włąsnych tagów HTML i poniekąd tak wygląda. Zamieńmy zatem nasz Tweet w komponent
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
              ale dobrze jest znać różnice pomiędzy tymi dwiema skłądniami) i przenieśmy do niej nasz kod HTML. Funkcja ta po prostu zwraca kod JSX.
            </p>

          </Column>
          <Column width={6}>
            <Example>{`
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
              Na skutek tej operacji zaktualizowany zostanie kod JS - zwróć uwagę, że dookoła <code>Tweet</code> nie ma w nim cudzysłowi.
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
              dane odnośnie swojej reprecentacji (przykładowo komponent na wprowadzanie tekstu - <code>&lt;input&gt;</code> zawierałby informacje
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
              Jedną z mantr React jest "kompozycja ponad dziediczenie". Oznacza to, że nasze komponenty nie powinny rozszerzać funkcjonalności już 
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
            <Example>{`
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
            <h3>Przekazywanie danych</h3>
            <p>
              Nasza aplikacja wciąż działa poprawnie, mamy już kilka komponentów, które możemy wykorzystywać (teraz lub w przyszłości) w innych częściach
              aplikacji, jednak komponenty te decydują nie tylko o tym jak dane są prezentowane, ale także o tym jakie dane są prezentowane - stanowczo nie 
              jest to przydatne, kiedy chcemy używać tego samego komponentu (np. <code>&lt;TweetTime /&gt;</code>) dla wielu różnych przypadków.
            </p>
            <p>
              React sugeruje nam przekazywanie danych w jednym kierunku (ang. one way data flow) musi natomiast istnieć możliwość przekazywania danych 
              z komponentu dziecka do komponentu rodzica. Z chwilę dowiesz się jak przekazywać dane "w dół" - z komponentu rodzica do komponentu dziecka.
              O tym jak przekazać dane w drugą stronę dowiesz się z dalszych rozdziałów, kiedy poruszymy tematy związane z formularzami.
            </p>
          </Column>
        </Row>  
        
        <Row>
          <Column width={6}>
            <p>
              Podobnie jak w przypadku HTML, gdzie do elementu możemy przekazać atrybuty (np. style, class), tak w React / JSX istnieje możliwość 
              zdefiniowania atrybutów dla komponentu - nazywamy je "properties" lub "props" i zapisujemy w dokładnie ten sam sposób.
            </p>

            <p>
              Zmodyfikowany kod zawiera kilka zmian, którym warto się przyjrzeć:
            </p>
            <ul>
              <li>
                props przekazywane są do komponentu dokładnie tak samo jak atrybuty do elementu HTML i obowiązują te same zasady przekazywania wartości
                zdefiniowanych jako kod JS
              </li>                            
              <li>komponenty bezstanowe jako parametr przyjmują obiekt, zawierający wszystkie przekazane wartości</li>
              <li>komponenty stanowe props otrzymują jako pole <code>this.props</code></li>
              <li>jeżeli liczba parametrów jest niewielka, warto użyć "destrukrutyzacji" i wyciągnąć z obiektu interesujące nas zmienne</li>
              <li>props mogą być bez problemu przekazywane z komponentu do komponentu</li>
            </ul>

            <p>
              Teraz nasze komponenty (<code>TweetTime</code> i <code>TweetUser</code>) nie decydują już o tym jakie dane mają wyświetlić, a jedynie jak
              dzięki czemu możemy wykorzystać je przy innych Tweetach albo przy innych częściach naszego UI.
            </p>
          </Column>        
          <Column width={6}>
            <Example>{`
              import React from "react";
              import ReactDOM from "react-dom";
              
              const TweetTime = (props) => {
                const date = \`\${props.date.getDay() + 1} \${props.date.toLocaleString('pl-pl', { month: "long" })}\`;
                return <time>{date}</time>
              }
              const TweetUser = ({ name, handle }) => <span><b>{name}</b> @{handle}</span>;
              
              class Tweet extends React.Component {
              
                render() {
                  const { user, text, date } = this.props.tweet;
                  return (
                    <div>
                      <TweetUser name={user.name} handle={user.handle} /> -
                      <TweetTime date={date} />
                      <p>
                        {text}
                      </p>
                    </div>
                  )
                }
              }
              
              const TweetData = {
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "Witaj świecie!"
              }
              
              ReactDOM.render(<Tweet tweet={TweetData} />, document.getElementById('root'));              
            `}</Example>
          </Column>
        </Row>        
            
        
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div> 
    );
  }  

  renderPropTypes = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Definiowanie props oraz wartości domyślne</h2>
            <h3>propTypes i defaultProps</h3>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <h4>propTypes</h4>
            <p>
              React pozwala na określanie tego jakie poperty jest w stanie obsłużyć nasz komponent - możemy określić zarówno ich nazwy jak i typy. 
              Wyczerpujące informacje na temat wszystkich możliwych wspieranych typów znajdziesz na stronie projektu <a href="https://github.com/facebook/prop-types" target="_blank">
              prop-types</a>.
            </p>
            <p>
              Zdefiniujmy domyślne props dla naszych komponentów.
            </p>
            <p>
              Nasz komponent <code>TweetTime</code> będzie od teraz wymagał przekazania instancji <code>Date</code>, <code>TweetUser</code> będzie 
              oczekiwał przekazania nicku (handle), ale imię (name) jest już opcjonalne, zaś <code>Tweet</code> będzie oczekiwał obiektu
              o określonej strukturze.
            </p>
            <p>
              Warto mieć na uwagę, że mechanizm PropTypes jest tylko sugestią - jest on jedynie używany jeżeli aplikacja działa w trybie developerskim,
              a nawet jeżeli przekażemy złe wartości nie spowoduje to zatrzymania aplikacji a jedynie komunikat w konsoli. PropTypes powinny być używane
              jako rodzaj dokumentacji komponentu, ale są także używane przez auto-podpowiadanie składni w wielu popularnych edytorach kodu.
            </p>
            <h4>defaultProps</h4>
            <p>
              Dodatkowo, dla komponentu <code>TweetUser</code> zdefiniowaliśmy wartość domyślną propsu <code>name</code> na "Anonim". Jeżeli nie przekażemy
              żadnej wartości (lub przekażemy jawnie <code>undefined</code>) zostanie użyta właśnie wartość domyślna.
            </p>
            <p>
              Definiowanie wartości domyślnych ma sens głównie dla propsów, których nie oznaczyliśmy jako <code>isRequired</code>, ale warto zdefiniować
              je też dla pozostałych, ponieważ mimo iż developer upewnił się, że dane te są przekazywane, czasem może ich po prostu brakować z powodu
              błędu w API etc.
            </p>
          </Column>        
          <Column width={6}>
            <Example>{`
              import React from "react";
              import ReactDOM from "react-dom";
              @important
              import PropTypes from "prop-types";

              const TweetTime = (props) => {
                const date = \`\${props.date.getDay() + 1} \${props.date.toLocaleString('pl-pl', { month: "long" })}\`;
                return <time>{date}</time>
              };
              TweetTime.propTypes = {
                date: PropTypes.instanceOf(Date).isRequired
              };
              
              const TweetUser = ({ name, handle }) => <span><b>{name}</b> @{handle}</span>;
              TweetUser.propTypes = {
                handle: PropTypes.string.isRequired,
                name: PropTypes.string  
              };
              TweetUser.defaultProps = {
                name: 'Anonim'
              };
              
              class Tweet extends React.Component {
              
                render() {
                  const { user, text, date } = this.props.tweet;
                  return (
                    <div>
                      <TweetUser name={user.name} handle={user.handle} /> -
                      <TweetTime date={date} />
                      <p>
                        {text}
                      </p>
                    </div>
                  )
                }
              }

              Tweet.propTypes = {
                tweet: PropTypes.shape({
                  user: PropTypes.shape({
                    handle: PropTypes.string.isReqired,
                    name: PropTypes.string,
                  }),
                  date: PropTypes.instanceOf(Date).isRequired,
                  text: PropTypes.string.isRequired
                })
              }              

              @end-important
              
              const TweetData = {
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "Witaj świecie!"
              }
              
              ReactDOM.render(<Tweet tweet={TweetData} />, document.getElementById('root'));              
            `}</Example>         
          </Column>
        </Row>
        <Row>
          <Column>
            <h3>Alternatywna notacja</h3>
          </Column>
        </Row>        

        <Row>
          <Column width={6}>
            <h3>Przekazywanie danych</h3>
            <p>
              Jeżeli używasz create-react-app lub dodałeś do projektu preset <a href="https://babeljs.io/docs/plugins/transform-class-properties/" target="_blank">
              babel-plugin-transform-class-properties</a> możesz używać alternatywnego, krótszego zapisu PropTypes dla komponentów stanowowych.
            </p>
            <p>
              Opiera on się o nowy typ pola danych - <code>static</code> ale w praktyce wciąż transpilowany jest na poprzednią notację.
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              import React from "react";
              import ReactDOM from "react-dom";
              import PropTypes from "prop-types";

              const TweetTime = (props) => {
                const date = \`\${props.date.getDay() + 1} \${props.date.toLocaleString('pl-pl', { month: "long" })}\`;
                return <time>{date}</time>
              };
              TweetTime.propTypes = {
                date: PropTypes.instanceOf(Date).isRequired
              };
              
              const TweetUser = ({ name, handle }) => <span><b>{name}</b> @{handle}</span>;
              TweetUser.propTypes = {
                handle: PropTypes.string.isRequired,
                name: PropTypes.string  
              };
              TweetUser.defaultProps = {
                name: 'Anonim'
              };
              @important
              class Tweet extends React.Component {

                static propTypes = {
                  tweet: PropTypes.shape({
                    user: PropTypes.shape({
                      handle: PropTypes.string.isReqired,
                      name: PropTypes.string,
                    }),
                    date: PropTypes.instanceOf(Date).isRequired,
                    text: PropTypes.string.isRequired
                  })
                } 
              
                render() {
                  const { user, text, date } = this.props.tweet;
                  return (
                    <div>
                      <TweetUser name={user.name} handle={user.handle} /> -
                      <TweetTime date={date} />
                      <p>
                        {text}
                      </p>
                    </div>
                  )
                }
              }            
              @end-important
              
              const TweetData = {
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "Witaj świecie!"
              }
              
              ReactDOM.render(<Tweet tweet={TweetData} />, document.getElementById('root'));              
            `}</Example>              
          </Column>
        </Row>  
                     
            
        
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div> 
    );
  } 

  renderListyKomponentow = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Listy komponentów</h2>
            <p>
              W jednym z poprzednich ćwiczeń wyrenderowaliśmy wiele kopii elementu <code>Tweet</code> umieszczając go wielokrotnie w kodzie JSX
              oczywiście rozwiązanie takie nie sprawdzi się w przypadku, kiedy lista elementów jest dynamiczna i chcemy wyrenderować je wszystkie.
            </p>
          </Column>
        </Row>  
        <Row>
          <Column width={6}>
            <p>
              W składni JSX możemy zwrócić, albo osadzić tablicę elementów, co pomoże nam rozwiązać ten problem. Zacznijmy od prostego rozwiązania
              renderującego tablicę komponentów <code>Tweet</code>. W tym celu stworzymy prosty komponent <code>TweetList</code>.
            </p>  
            <p>
              Przykład ten zadziała dokładnie tak jak oczekujemy i wyrenderuje trzy kopie tego samego elementu <code>Tweet</code>, jednak jeżeli 
              zajrzymy do konsoli zobaczymy, że React wygenerował komunikat błędu informujący o braku unikatowego propu <code>key</code> na każdym
              z elementów tablicy.
            </p>   
            <div className="error">
              Warning: Each child in an array or iterator should have a unique "key" prop.
            </div>     
          </Column>
          <Column width={6}>
            <Example>{`
              import React from "react";
              import ReactDOM from "react-dom";
              import PropTypes from "prop-types";

              const TweetTime = (props) => {
                const date = \`\${props.date.getDay() + 1} \${props.date.toLocaleString('pl-pl', { month: "long" })}\`;
                return <time>{date}</time>
              };
              TweetTime.propTypes = {
                date: PropTypes.instanceOf(Date).isRequired
              };
              
              const TweetUser = ({ name, handle }) => <span><b>{name}</b> @{handle}</span>;
              TweetUser.propTypes = {
                handle: PropTypes.string.isRequired,
                name: PropTypes.string  
              };
              TweetUser.defaultProps = {
                name: 'Anonim'
              };
              
              class Tweet extends React.Component {

                static propTypes = {
                  tweet: PropTypes.shape({
                    user: PropTypes.shape({
                      handle: PropTypes.string.isReqired,
                      name: PropTypes.string,
                    }),
                    date: PropTypes.instanceOf(Date).isRequired,
                    text: PropTypes.string.isRequired
                  })
                } 
              
                render() {
                  const { user, text, date } = this.props.tweet;
                  return (
                    <div>
                      <TweetUser name={user.name} handle={user.handle} /> -
                      <TweetTime date={date} />
                      <p>
                        {text}
                      </p>
                    </div>
                  )
                }
              }            
              
              
              const TweetData = {
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "Witaj świecie!"
              }
              
              @important
              const TweetList = () => {
                const tweets = [
                  <Tweet tweet={TweetData} />,
                  <Tweet tweet={TweetData} />,
                  <Tweet tweet={TweetData} />,
                ];
                
                return (
                  <div>
                    {tweets}
                  </div>
                );
              }

              ReactDOM.render(<TweetList />, document.getElementById('root'));              
              @end-important
            `}</Example>              
          </Column>          
        </Row> 
        <Row>
          <Column>
            <h3>Znaczenie kluczy</h3>
            <p>
              W celu optymalizacji wydajności, przy każdym renderowaniu komponentu React stara się nie usuwać i tworzyć nowych elementów DOM i kiedy
              to możliwe wykorzystuje już istniejące elementy. W przypadku tablic, których zawartość może ulegać zmianie (wartości są zmieniane, elementy
              są dodawane i usuwane) React potrzebuje odrobiony pomocy ze strony developera w określeniu który element DOM należy zaktualizować, jeżeli
              dane w tablicy zmieniły się, a który usunąć. W innym wypadku DOM i VDOM mogły by ulec rozsynchronizowaniu i nasze UI nie odzwierciedlało by
              stanu aplikacji.
            </p>
          </Column>
        </Row>  
        <Row>    
          <Column width={6}>
            <p>
              Aby zapobiec takim sytuacjom, w momencie kiedy w JSX renderowana jest kolekcja (tablica) developer musi do każdego jej elementu przekazać
              jawnie prop <code>key</code>. Zaktualizujmy zatem nasz komponent generujący listę.
            </p>
            <p>
              Musimy mieć na uwadze, aby:
            </p>
            <ul>
              <li>klucze były stringami</li>
              <li>były unikalne w skali wspólnego rodzica</li>
              <li>były "stałe" - nie powinnyśmy generować ich losowo (np. używając <code>Math.random()</code>) w czasie renderowania</li>
            </ul>
          </Column>
          <Column width={6}>
            <Example>{`
              import React from "react";
              import ReactDOM from "react-dom";
              import PropTypes from "prop-types";

              const TweetTime = (props) => {
                const date = \`\${props.date.getDay() + 1} \${props.date.toLocaleString('pl-pl', { month: "long" })}\`;
                return <time>{date}</time>
              };
              TweetTime.propTypes = {
                date: PropTypes.instanceOf(Date).isRequired
              };
              
              const TweetUser = ({ name, handle }) => <span><b>{name}</b> @{handle}</span>;
              TweetUser.propTypes = {
                handle: PropTypes.string.isRequired,
                name: PropTypes.string  
              };
              TweetUser.defaultProps = {
                name: 'Anonim'
              };
              
              class Tweet extends React.Component {

                static propTypes = {
                  tweet: PropTypes.shape({
                    user: PropTypes.shape({
                      handle: PropTypes.string.isReqired,
                      name: PropTypes.string,
                    }),
                    date: PropTypes.instanceOf(Date).isRequired,
                    text: PropTypes.string.isRequired
                  })
                } 
              
                render() {
                  const { user, text, date } = this.props.tweet;
                  return (
                    <div>
                      <TweetUser name={user.name} handle={user.handle} /> -
                      <TweetTime date={date} />
                      <p>
                        {text}
                      </p>
                    </div>
                  )
                }
              }            
              
              
              const TweetData = {
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "Witaj świecie!"
              }
              
              @important
              const TweetList = () => {
                const tweets = [
                  <Tweet tweet={TweetData} key="tweet1" />,
                  <Tweet tweet={TweetData} key="tweet2" />,
                  <Tweet tweet={TweetData} key="tweet3" />,
                ];
                
                return (
                  <div>
                    {tweets}
                  </div>
                );
              }
              @end-important

              ReactDOM.render(<TweetList />, document.getElementById('root'));              
              
            `}</Example>              
          </Column>          
        </Row>    
        <Row>    
          <Column width={6}>
            <p>
              Nasza aplikacja generuje już listę Tweetów, ale nie działa to jeszcze tak, jak byśmy chcieli. Dane o Tweetach pobieta on z aplikacji,
              a powinien otrzymywać jako parametr, a sama lista - mimo, że jest tablicą - wciąż nie jest w żaden sposób dynamiczna. 
            </p>
            <p>
              Zmieniliśmy nieco strukturę naszej zmiennej <code>TweetData</code> - jest to teraz tablica zawierająca dane 2 Tweetów, a same dane
              wzbogaciliśmy o klucz <code>id</code>, który stanowić będzie nasz <code>key</code> dla renderowanej kolekcji Tweetów.
            </p>

            <p>
              Zmianie uległ też sam komponent <code>TweetList</code> - teraz przyjmuje on kolekcję obiektów (Tweetów) i renderuje ją, nadając każdemu
              elementowi odpowiedni <code>key</code>.
            </p>

          </Column>
          <Column width={6}>
            <Example>{`
              import React from "react";
              import ReactDOM from "react-dom";
              import PropTypes from "prop-types";

              const TweetTime = (props) => {
                const date = \`\${props.date.getDay() + 1} \${props.date.toLocaleString('pl-pl', { month: "long" })}\`;
                return <time>{date}</time>
              };
              TweetTime.propTypes = {
                date: PropTypes.instanceOf(Date).isRequired
              };
              
              const TweetUser = ({ name, handle }) => <span><b>{name}</b> @{handle}</span>;
              TweetUser.propTypes = {
                handle: PropTypes.string.isRequired,
                name: PropTypes.string  
              };
              TweetUser.defaultProps = {
                name: 'Anonim'
              };
              
              class Tweet extends React.Component {

                static propTypes = {
                  tweet: PropTypes.shape({
                    user: PropTypes.shape({
                      handle: PropTypes.string.isReqired,
                      name: PropTypes.string,
                    }),
                    date: PropTypes.instanceOf(Date).isRequired,
                    text: PropTypes.string.isRequired
                  })
                } 
              
                render() {
                  const { user, text, date } = this.props.tweet;
                  return (
                    <div>
                      <TweetUser name={user.name} handle={user.handle} /> -
                      <TweetTime date={date} />
                      <p>
                        {text}
                      </p>
                    </div>
                  )
                }
              }            
              
              @important
              const TweetData = [{
                id: 1,
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "Witaj świecie!"
              }, {
                id: 2,
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "To jest mój prywatny Twitter!"
              }];
                            
              const TweetList = ({ tweets }) => {                
                return (
                  <div>
                    {tweets.map(item => <Tweet tweet={item} key={item.id} />)}
                  </div>
                );
              }   
              TweetList.propTypes = {
                tweets: PropTypes.arrayOf(PropTypes.object)
              }

              ReactDOM.render(<TweetList tweets={TweetData} />, document.getElementById('root'));              
              @end-important              
            `}</Example>              
          </Column>          
        </Row>                  
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div>
    )
  }

  renderStanKomponentuIZdarzenia = () => {
    return (
      <div>
        <Row>
          <Column>
            <h3>Stan komponentu</h3>
            <p>
              Nasza aplikacja nabiera już kształtu - jesteśmy w stanie wyrenderować dowolną ilość Tweetów, ale nie mamy możliwości ich definiowania
              z poziomu UI. Żeby to umożliwić, musimy zapoznać się z dwoma istotynymi elementami React. 
            </p>
            <p>
              W jednym z poprzednich rozdziałów poznaliśmy komponenty stanowe, które poza tym, że są zapisane jako klasa, posiadają właśnie ów stan.
              Stan komponentu to obiekt, zawierający informacje opisujące dane, jakie w danym momencie powinien reprezentować obiekt, a kiedy dane te
              ulegną zmianie, React automatycznie ponownie wyrenderuje komponent.
            </p>
            <p>
              Stwórzmy zatem prosty komponent, pozwalający na tworzenie nowych Tweetów - <code>TweetForm</code>.
            </p>
          </Column>
        </Row>         
        <Row>
          <Column width={6}>
            <p>
              Nasz nowy komponent opisany będzie przez klasę, do której dodamy nowe pole - <code>state</code>.
            </p>
            <p>
              Jak już wiemy, stan komponentu to zwykły obiekt JS, zdefiniujmy więc w nim pole <code>text</code> w którym będziemy przetrzymywać
              tekst naszego Tweetu. Wyrenderujmy też nasz stan jako domyślną zawartość pola tekstowego, w którym tworzyć będziemy nasze Tweety.
            </p>
            <p>
              Kiedy uruchoimy aplikację, strona wyrenderuje się z nowym - pustym formularzem. Zmień w kodzie stan:
            </p>
            <pre>
              state = {`{ text: 'test' }`}
            </pre>
            <p>aby sprawdzić, czy wszystko działa OK - strona powinna odświeżyć się i pokazać nową zawartość.</p>
          </Column>
          <Column width={6}>
            <Example>{`
              import React from "react";
              import ReactDOM from "react-dom";
              import PropTypes from "prop-types";

              const TweetTime = (props) => {
                const date = \`\${props.date.getDay() + 1} \${props.date.toLocaleString('pl-pl', { month: "long" })}\`;
                return <time>{date}</time>
              };
              TweetTime.propTypes = {
                date: PropTypes.instanceOf(Date).isRequired
              };
              
              const TweetUser = ({ name, handle }) => <span><b>{name}</b> @{handle}</span>;
              TweetUser.propTypes = {
                handle: PropTypes.string.isRequired,
                name: PropTypes.string  
              };
              TweetUser.defaultProps = {
                name: 'Anonim'
              };
              
              class Tweet extends React.Component {

                static propTypes = {
                  tweet: PropTypes.shape({
                    user: PropTypes.shape({
                      handle: PropTypes.string.isReqired,
                      name: PropTypes.string,
                    }),
                    date: PropTypes.instanceOf(Date).isRequired,
                    text: PropTypes.string.isRequired
                  })
                } 
              
                render() {
                  const { user, text, date } = this.props.tweet;
                  return (
                    <div>
                      <TweetUser name={user.name} handle={user.handle} /> -
                      <TweetTime date={date} />
                      <p>
                        {text}
                      </p>
                    </div>
                  )
                }
              }            
                            
              const TweetData = [{
                id: 1,
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "Witaj świecie!"
              }, {
                id: 2,
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "To jest mój prywatny Twitter!"
              }];
                            
              const TweetList = ({ tweets }) => {                
                return (
                  <div>
                    {tweets.map(item => <Tweet tweet={item} key={item.id} />)}
                  </div>
                );
              }   
              TweetList.propTypes = {
                tweets: PropTypes.arrayOf(PropTypes.object)
              }

              @important
              class TweetForm extends React.Component {

                state = {
                  text: ''
                }

                render() {
                  return (
                    <div>
                      <input type="text" onChange={this.handleChange} value={this.state.text} />
                      <br />
                      <button>Tweetuj!</button>
                    </div>                    
                  )
                }
              }

              ReactDOM.render(<div>
                <TweetForm />
                <TweetList tweets={TweetData} />                
              </div>, document.getElementById('root'));              
              @end-important              
            `}</Example>           
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              Kolejnym etapem jest pobranie zawartości po jej zmianie. Jak zapewne pamiętacie, React sugeruje jednokierunkowy przepływa danych,
              więc kiedy wpiszemy treść do pola tekstowego wartość zmiennej <code>this.state.text</code> nie ulegnie zmianie. By pobrać wartość 
              skorzystamy ze znanych nam ze zwykłego JS zdarzeń.
            </p>
            <p>
              React używa własnego typu obiektu zdarzeń, tzw. <a href="https://reactjs.org/docs/events.html" target="_blank">SyntheticEvent</a> co
              pozwala na kilka rzeczy - po pierwsze zwiększa wydajność (wszystkie zdarzenia obsługiwane są przez jedną instancję obiektu 
              SyntheticEvent) oraz pozwala na ujednolicenie handlerów. Na przykład by wykryć zmianę w <code>&lt;input&gt;</code> możemy użyć
              handlera <code>onChange</code>, a nie jak w zwykłym JS <code>onKeyDown</code> lub <code>onKeyUp</code>
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              import React from "react";
              import ReactDOM from "react-dom";
              import PropTypes from "prop-types";

              const TweetTime = (props) => {
                const date = \`\${props.date.getDay() + 1} \${props.date.toLocaleString('pl-pl', { month: "long" })}\`;
                return <time>{date}</time>
              };
              TweetTime.propTypes = {
                date: PropTypes.instanceOf(Date).isRequired
              };
              
              const TweetUser = ({ name, handle }) => <span><b>{name}</b> @{handle}</span>;
              TweetUser.propTypes = {
                handle: PropTypes.string.isRequired,
                name: PropTypes.string  
              };
              TweetUser.defaultProps = {
                name: 'Anonim'
              };
              
              class Tweet extends React.Component {

                static propTypes = {
                  tweet: PropTypes.shape({
                    user: PropTypes.shape({
                      handle: PropTypes.string.isReqired,
                      name: PropTypes.string,
                    }),
                    date: PropTypes.instanceOf(Date).isRequired,
                    text: PropTypes.string.isRequired
                  })
                } 
              
                render() {
                  const { user, text, date } = this.props.tweet;
                  return (
                    <div>
                      <TweetUser name={user.name} handle={user.handle} /> -
                      <TweetTime date={date} />
                      <p>
                        {text}
                      </p>
                    </div>
                  )
                }
              }            
                            
              const TweetData = [{
                id: 1,
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "Witaj świecie!"
              }, {
                id: 2,
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "To jest mój prywatny Twitter!"
              }];
                            
              const TweetList = ({ tweets }) => {                
                return (
                  <div>
                    {tweets.map(item => <Tweet tweet={item} key={item.id} />)}
                  </div>
                );
              }   
              TweetList.propTypes = {
                tweets: PropTypes.arrayOf(PropTypes.object)
              }

              
              class TweetForm extends React.Component {

                state = {
                  text: ''
                }
                @important

                handleChange = (event) => {
                  console.log(event.target.value);
                }

                render() {
                  return (
                    <div>
                      <input type="text" onChange={this.handleChange} value={this.state.text} />
                      <br />
                      <button>Tweetuj!</button>
                    </div>                    
                  )
                }
                @end-important              
              }

              ReactDOM.render(<div>
                <TweetForm />
                <TweetList tweets={TweetData} />                
              </div>, document.getElementById('root'));
            `}</Example>           
          </Column>          
        </Row>
        <Row>
          <Column>
            <h3>Aktualizacja stanu komponentu</h3>
            <p>
              Teraz, kiedy wpisujemy tekst w nasze pole możemy obserwować jego wartość w konsoli! Połowiczny sukces! My znamy już wartość, nasz komponent 
              jeszcze nie! Musimy zatem zaktualizować stan komponentu. 
            </p>
            <p>
              Tutaj pojawia się kolejna ważna rzecz w React - o ile nie jesteśmy w pełni świadomi konsekwencji nie powinniśmy nigdy mutować danych - zarówno
              zmiennych aplikacji jak i stanu komponentu. Nigdy nie próbujmy bezpośrednio zmienić wartości stanu, np. poprzez pisanie do zmiennej:{" "} 
              <code>this.state.text = e.target.value;</code>. Jeżeli tak zrobimy, stracimy jedną z podstawowych cech komponentu stanowego - automatyczne 
              re-renderowanie.
            </p>
            <p>
              Zamiast tego posłużymy się metodą, którą przygotowali dla nas twórcy React - <code>this.setState()</code> - która domyślnie jako parametr
              przyjmuje obiekt danych, które uległy zmianie. Dane te następnie łączone są z aktualnym stanem, a komponent ponownie renderowany.
            </p>
          </Column>
        </Row>        
        <Row>
          <Column width={6}>
            <p>
              Zmieńmy zatem nieco nasz komponent (i tymczasowo dodajmy podlgąd, aby widzieć zachodzącą w stanie zmianę).
            </p>
            <p>
              Do naszego handlera <code>handleChange</code> dodajemy wywołanie <code>this.setState</code>, które jako parametr
              otrzymuje obiekt ze zmienionymi wartosciami. Jeżeli nasz komponent poza tekstem przechowywał by też inne dane w swoim stanie,
              a my chcieli byśmy zmienić jedynie tekst, nie musimy przekazywać ponownie całego stanu (nie zmienionych elementów) a jedynie
              obiekt zawierający pole <code>text</code>.
            </p>
            <p>
              Po wpisaniu treści pojawi się dodatkowy paragraf zawierający podgląd wpisywanego Tweetu. Po sprawdzeniu, że rzeczywiście się tak
              dzieje możemy go usunąć.
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              import React from "react";
              import ReactDOM from "react-dom";
              import PropTypes from "prop-types";

              const TweetTime = (props) => {
                const date = \`\${props.date.getDay() + 1} \${props.date.toLocaleString('pl-pl', { month: "long" })}\`;
                return <time>{date}</time>
              };
              TweetTime.propTypes = {
                date: PropTypes.instanceOf(Date).isRequired
              };
              
              const TweetUser = ({ name, handle }) => <span><b>{name}</b> @{handle}</span>;
              TweetUser.propTypes = {
                handle: PropTypes.string.isRequired,
                name: PropTypes.string  
              };
              TweetUser.defaultProps = {
                name: 'Anonim'
              };
              
              class Tweet extends React.Component {

                static propTypes = {
                  tweet: PropTypes.shape({
                    user: PropTypes.shape({
                      handle: PropTypes.string.isReqired,
                      name: PropTypes.string,
                    }),
                    date: PropTypes.instanceOf(Date).isRequired,
                    text: PropTypes.string.isRequired
                  })
                } 
              
                render() {
                  const { user, text, date } = this.props.tweet;
                  return (
                    <div>
                      <TweetUser name={user.name} handle={user.handle} /> -
                      <TweetTime date={date} />
                      <p>
                        {text}
                      </p>
                    </div>
                  )
                }
              }            
                            
              const TweetData = [{
                id: 1,
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "Witaj świecie!"
              }, {
                id: 2,
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "To jest mój prywatny Twitter!"
              }];
                            
              const TweetList = ({ tweets }) => {                
                return (
                  <div>
                    {tweets.map(item => <Tweet tweet={item} key={item.id} />)}
                  </div>
                );
              }   
              TweetList.propTypes = {
                tweets: PropTypes.arrayOf(PropTypes.object)
              }

              
              class TweetForm extends React.Component {

                state = {
                  text: ''
                }
                @important

                handleChange = (event) => {
                  this.setState({
                    text: event.target.value
                  })
                }

                render() {
                  const { text } = this.state;
                  return (
                    <div>
                      <input type="text" onChange={this.handleChange} value={text} />
                      <br />
                      <button>Tweetuj!</button>
                      {text && <p>Podgląd: {text}</p>}
                    </div>                    
                  )
                }
                @end-important              
              }

              ReactDOM.render(<div>
                <TweetForm />
                <TweetList tweets={TweetData} />                
              </div>, document.getElementById('root'));
            `}</Example>           
          </Column>          
        </Row>
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div>
    )
  }

  renderFormularzeKontrolowaneNiekontrolowaneOrazReferencje = () => {
    return (
      <div>
        <Row>
          <Column>
            <h3>Formularze kontrolowane, formularze niekontrolowane</h3>
            <p>
              Utworzony w poprzednim etapie formularz (a właściwie pole formularza) to tzw. formularz kontrolowany. Jego zawartość kontrolowana jest
              przez React (pobierana ze stanu), zaś każda zmiana prowadzi do aktualizacji stanu. Plusem takiego rozwiązania jest fakt, że dowolny inny
              proces może zmienić stan komponentu, co natychmiast zostanie odzwierciedlone w HTMLu i pole zostanie zaktualizowane.
            </p>
            <p>
              Minusem jest to, że każde wciśnięcie klawisza powoduje ponowne wyrenderowanie całego naszego komponentu, więc jeżeli jest on bardzo 
              rozbudowany może nieznacznie wpłynąć to na wydajność całej aplikacji. 
            </p>
            <p>
              Alternatywą dla formularzy kontrolowanych są formularze niekontrolowane.
            </p>
          </Column>        
        </Row>
        <Row>
          <Column width={6}>
            <p>
              W formularzu takim dane wciąż mogą być przechowywane w stanie komponentu, ale nie są one aktualizowane za każdym razem kiedy wciśniemy klawisz
              oraz aktualzacja stanu nie prowadzi do aktualizacji danych w HTML.
            </p>
            <p>
              W naszym formularzu usunęliśmy handler <code>onChange</code> a atrybut <code>value</code> zamieniliśmy na <code>defaultValue</code>. Bez 
              tej ostatniej zmiany nie mogli byśmy wpisywać tekstu do pola, ponieważ wartość <code>this.state.text</code> nie ulega zmianie!
            </p>
            <p>
              Od razu zauważymy jednak pewien problem - podczas wpisywania treści nie pojawia się jej podgląd.
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              class TweetForm extends React.Component {

                state = {
                  text: ''
                }

                handleChange = (event) => {
                  this.setState({
                    text: event.target.value
                  })
                }
                @important
                render() {
                  const { text } = this.state;
                  return (
                    <div>
                      <input type="text" defaultValue={text} />
                      <br />
                      <button>Tweetuj!</button>
                      {text && <p>Podgląd: {text}</p>}
                    </div>                    
                  )
                } 
                @end-important           
              }              
            `}</Example>
          </Column>
        </Row>
        <Row>
          <Column>
            <h3>referencje (ref) na element</h3>
            <p>
              Aby wybrnąć z tej sytuacji i zaktualizować stan, kiedy jesteśmy już gotowi musimy odczytać wartość naszego pola tekstowego. Oczywiście
              wiemy, że JS udostępnia wiele metod do manipulowania (w tym odczytywania) DOM - możemy np. użyć <code>document.getElementById</code> aby 
              odczytać wartość pola tekstowego. Rozwiązanie takie sprawdzi się, ale co, jeżeli będziemy chcieli renderować w środowisku innymi niż DOM
              (np. React Native), albo ktoś już użył takiego ID?
            </p>
            <p>
              Aplikacje React nie powinny używać tego typu metod do pracy z DOM - jeżeli potrzebujemy uzyskać referencję na konkretny element DOM możemy
              zadbać o to, by przekazał nam ją VDOM w momencie renderowania.
            </p>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              Każdy element JSX może przyjąć specjalny prop <code>ref</code>, który powinien wskazywać na funkcję, która to zostanie wywołana przy 
              renderowaniu, a jako pierwszy element przekazane zostanie wskazanie na element DOM (lub inny odpowiedni dla platformy).
            </p>
            <p>
              Utworzona przez nas funkcja przyjmie taką referencje i zapisze ją jako <code>this.input</code>, a nowo dodany handler dla zdarzenia
              usunięcia kursora z pola tekstowego zaktualizuje stan w oparciu o wartość wskazanego elementu.
            </p>
            <p>
              Referencji powinniśmy używać wszędzie tam, gdzie musimy działać bezpośrednio z warstwą wizualną: aby pobrać wymiary i inne parametry
              elementów DOM lub współpracować z bibliotekami i API nie posiadającymi implementacji w React.
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              class TweetForm extends React.Component {

                state = {
                  text: ''
                }

                handleChange = (event) => {
                  this.setState({
                    text: event.target.value
                  })
                }
                @important
                updateState = () => {
                  this.setState({
                    text: this.input.value
                  });
                }
                render() {
                  const { text } = this.state;
                  return (
                    <div>
                      <input type="text" defaultValue={text} ref={(el) => this.input = el } onBlur={this.updateState} />
                      <br />
                      <button>Tweetuj!</button>
                      {text && <p>Podgląd: {text}</p>}
                    </div>                    
                  )
                } 
                @end-important           
              }              
            `}</Example>
          </Column>
        </Row>  
        <Row>
          <Column>
            <h3>refrencje na komponent</h3>
            <p>
              Referencje mogą wskazywać także na komponent - np. <code>&lt;TweetForm ref={`{el => this.form = el}`} /&gt;</code> dzięki czemu uzyskamy
              dostęp do instancji danego komponentu (a nie jego HTML!) i możemy odczytać jego prywatne dane, np. <code>this.form.state.text</code>.
              Rozwiązanie takie nie jest jednak typowym i nie powinno być stosowane w celu zapewnienia komunikacji między komponentami.
            </p>
          </Column>
        </Row>              
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div>
    )
  }

  renderCyklZyciaKomponentu = () => {
    return (
      <div>
        <Row>
          <Column>
            <h3>Cykla życia komponentu</h3>
            <p>
              Kolejnym ważnym tematem odróżniającym komponenty stanowe i bezstanowe jest tzw. cykl życia (ang. life cycle) komponentu. Komponenty
              bezstanowe tworzone są i niszczone za każdym razem, kiedy ich rodzic jest ponownie renderowany. Gdyby to samo działo się z komponentami
              stanowymi ich stan był by resetowany. React niszczy i tworzy ponownie komponenty stanowe tylko gdy przestaniemy je renderować w rodzicu
              po czym wyrenderujemy ponownie (lub zmienimy im props <code>key</code>).
            </p>
            <p>
              Z uwagi na to, że komponenty takie nie są niszczone przydatny jest jakis sposób pozwalający im na współpracę z otoczeniem np. w celu
              dostosowania się do zachodzących w aplikacji zmian. W tym celu dostajemy do dyspozycji kilka metod cyklu życia:
            </p>

            <h3>Metody cyklu życia</h3>

            <h4>constructor(props)</h4>
            <p>
              Metoda ta wywoływana jest w momencie kiedy komponent pierwszy raz zostaje dodany do JSX i jako parametr otrzymuje mapę przekazanych
              do niego propsów. Jeżeli zadeklarujemy własny konstruktor, pierwszym co musimy zrobić jest wywołanie metody <code>super</code> i przekazanie
              do niej otrzymanych propsów.
            </p>
            <p>
              Jeżeli początkowy stan komponentu powinien być oparty o wartości przekazane w props możemy zadeklarować to w konstruktorze:
            </p>
            <Example>{`
              constructor(props) {
                super(props);

                this.state = {
                  text: this.props.text
                };
              }
            `}</Example>
            <p>
              Jest to także jedyne miejsce gdzie powinniśmy pisać wprost do <code>this.state</code> a nie używać <code>this.setState()</code>.
            </p>
            <p><b>tak</b></p>
            <ul>
              <li>ustaw początkowy stan</li>
              <li>zainiciuj zmienne klasy</li>
            </ul>
            <p><b>nie</b></p>
            <ul>
              <li>nie wywołuj akcji asynchronicznych</li>
            </ul>
            <hr />
            <h4>componentWillMount</h4>
            <p>
              Metoda wywoływana bezpośrednio przed pierwszym wywołaniem <code>render</code>. W obecnej formie React nie pełni ona specjalnie przydatnej 
              roli. Należy pamiętać, że wszelkie operacje asynchroniczne (np. pobieranie danych) zainicjowane w tej metodzie nie wykonają się przed
              wywołaniem <code>render</code> więc nie należy ich tutaj umieszczać.
            </p>
            <p><b>tak</b></p>
            <ul>
              <li>wprowadź ostatnie poprawki w stanie komponentu przed renderowaniem</li>
            </ul>
            <p><b>nie</b></p>
            <ul>
              <li>nie wywołuj akcji asynchronicznych</li>
            </ul> 
            <hr />           
            <h4>componentWillReceiveProps(nextProps)</h4>
            <p>
              Za każdym razem, kiedy nasz komponent jest ponownie renderowany na skutek ponownego renderowania się rodzica metoda ta będzie wywoływana,
              a jako parametr otrzyma mapę propsów, które dostępne będą jako <code>this.props</code> w dalszej części cyklu. Powinniśmy tutaj sprawdzić
              czy aktualne i przyszłe propsy różnią się i zareagować na ewentualną zmianę. Pamiętajmy, że metoda ta jest wywoływana nawet jeżeli żadna
              faktyczna zmiana nie miała miejsca!
            </p> 
            <Example>{`
              componentWillReceiveProps(nextProps) {
                if(nextProps.text !== this.props.text) {
                  /**
                   * props text uległ zmianie i jego nowa wartośc znajduje się 
                   * w nextProps.text - powinniśmy na to jakoś zareagować
                   */
                }
              }
            `}</Example>
            <p><b>tak</b></p>  
            <ul>
              <li>zareaguj na zmiany props (np. w celu synchronizacji stanu i propsów)</li>
            </ul>
            <p><b>nie</b></p>
            <ul>
              <li>nie wywołuj akcji asynchronicznych</li>
            </ul>      
            <hr />       
            <h4>shouldComponentUpdate(nextProps, nextState)</h4>
            <p>
              Komponenty stanowe renderują się ponownie z kilku powodów - głównie ponieważ zmienił się ich stan lub ponownie wyrenderował się ich rodzic.
              Czasami jednak nie potrzebujemy by na skutek tych operacji ponownie wyrenderował się także nasz komponent (może renderujemy jakiś obiekt
              DOM, który mógł być zmieniony zewnętrznie jak edytor WYSIWYG, albo obliczenia potrzebne do renderowania są dosyć intensywne). W tym wypadku
              możemy zaimplementować metodę <code>shouldComponentUpdate</code>, która otrzymuje dostęp do przyszłego stanu i przyszłych prospów oraz
              powinna zwrócić wartość <code>true</code> jeżeli komponent ma zostać ponownie wyrenderowany, lub <code>false</code> w przeciwnym wypadku.
            </p>  
            <hr />   
            <h4>componentWillUpdate(nextProps, nextState)</h4>
            <p>
              Jeżeli <code>shouldComponentUpdate</code> zwróciło <code>true</code> (lub funkcja ta nie była w ogóle zaimplementowana) i komponent zamierza
              się ponownie wyrenderować, przed samym <code>render</code> wywołana zostanie ta funkcja. Jest ona przydatna, jeżeli zaimplementowaliśmy
              <code>shoulComponentUpdate</code> i chcemy zareagować na zmianę propsów - <code>componentWillReceiveProps</code> jest wywołwane przed {" "}
              <code>sCU</code> więc jeżeli chcemy mieć pewność, że operacja wykona się przed render, ale tylko jeżeli kompnent zamierza się ponownie
              wyrenderować, możemy wywołać ją właśnie tutaj.
            </p> 
            <p><b>tak</b></p> 
            <ul>
              <li>zareaguj na zmiany props (np. w celu synchronizacji stanu i propsów) jeżeli używas także <code>shouldComponentUpdate</code></li>
            </ul>
            <p><b>nie</b></p>
            <ul>
              <li>nie wywołuj akcji asynchronicznych</li>
            </ul> 
            <hr />           
            <h4>componentDidUpdate(prevProps, prevState)</h4>
            <p>
              Funkcja ta wywoływana jest tuż po tym jak zakończył się proces renderowania (wywołana została metoda <code>render</code> naszego komponentu
              oraz wszystkich jego dzieci), a jako parametry otrzymuje poprzednie propsy i poprzedni stan. Jest to odpowiednie miejsce do wywoływania
              zdarzeń asynchronicznych, zaś jeżeli potrzebujemy zaktualizować tutaj stan, powinniśmy być bardzo ostrożni, aby nie wpaść w pętlę
              zdarzeń <code>render -> componentDidUpdate -> update -> this.setState -> componentDidUpdate</code>
            </p>
            <Example>{`
              componentDidUpdate(prevProps) {
                if(prevProps.text !== this.props.text) {
                  /**
                   * props text uległ zmianie i jego nowa wartośc znajduje się 
                   * w this.props.text - powinniśmy na to jakoś zareagować
                   * np. wywołując akcję asynchroniczną
                   */
                }
              }
            `}</Example>            
            <p><b>tak</b></p>
            <ul>
              <li>wywołaj akcje synchroniczne</li>
              <li>zareaguj na zmiany w DOM poprzez analizę referencji</li>
              <li>dodaj nasłuchiwanie na zdarzenia, timery</li>
            </ul>
            <p><b>nie</b></p>
            <ul>
              <li>nie aktualizuj bezopśrednio stanu komponentu</li>
            </ul>    
            <hr />                     
            <h4>componentDidMount</h4>
            <p>
              Metoda zostanie wywołana tylko raz w cyklu życia komponentu zaraz po pierwszym wywołaniu <code>render</code>. Nadaje się ona idealnie dla
              wykonywania operacji asynchronicznych. Powinniśmy unikać wywoływania tutaj operacji zmieniających stan, ponieważ spowoduje to kolejne 
              renderowanie elementu.
            </p>
            <p><b>tak</b></p>
            <ul>
              <li>wywołaj akcje synchroniczne</li>
              <li>zareaguj na zmiany w DOM poprzez analizę referencji</li>
              <li>dodaj nasłuchiwanie na zdarzenia, timery</li>
            </ul>
            <p><b>nie</b></p>
            <ul>
              <li>nie aktualizuj bezopśrednio stanu komponentu</li>
            </ul>   
            <hr />          
            <h4>componentWillUnmount</h4>
            <p>
              Tuż przed usunięciem komponentu wywoływana jest metoda <code>componentWillUnmount</code>, działająca nieco jak destruktor znany z programowania
              obiektowego. Jeżeli nasz komponent zmodyfikował DOM, uruchomił timery (<code>setTimeout()</code>) lub dodał nasłuchiwanie na zdarzenia
              powinniśmy tutaj po sobie "posprzątać". W innym wypadku ryzykujemy wycieki pamięci i zmniejszenie stabilności aplikacji.
            </p>
            <p><b>tak</b></p>
            <ul>
              <li>usuń nasłuchiwanie na zdarzenia, timery</li>
              <li>anuluj wszelkie trwające akcje asynchroniczne</li>
            </ul>
            <p><b>nie</b></p>
            <ul>
              <li>nie pracuj ze stanem komponentu</li>
            </ul> 
            <hr />            
            <h4>componentDidCatch(errorString, errorInfo)</h4>
            <p>
              Specjalna metoda nie związana bezpośrednio z samym cyklem życia komponentu, lecz wywoływana w odpowiedzi na nieobsłużony błąd występujący w 
              metodzie <code>render</code> komponentu lub jego dzieci (o ile nie złapane w nich). Jako parametry otrzymuje komunikat błędu oraz stack
              trace. Możemy użyć jej w celu wyświetlenia komunikatu błędu, którego nie obsłużył żaden z naszych komponentów.
            </p>
            <Example>{`
              componentDidCatch(errorString, errorInfo) {
                this.setState({
                  error: errorString
                });
                /**
                 * Zapiszmy stack trace błędu dla developerów
                 */
                ErrorLoggingTool.log(errorInfo);
              }

              render() {
                if(this.state.error) {
                  /**
                   * Wyświetlmy komunikat błędu dla użytkownika
                   */
                  return <ShowErrorMessage error={this.state.error} />
                }
                return (
                  <InnyKomponentKtoryWywolaBlad />
                );
              }            
            `}</Example>

            <h3>Cykle życia</h3>

            <p>
              Po zapoznaniu się z powyższymi opisami wyróżnić możemy dwa kluczowe cykle:
            </p>
            <p>
              Cykl montowania komponentu:<br />
              <code>
                constructor -> componentWillMount -> render -> componentDidMount
              </code>
            </p>

            <p>
              Cykl aktualizowania komponentu:<br />
              <code>
                componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
              </code>
            </p>     
            
            <p>
              Jak widać cykle te nie pokrywają się (za wyjątkiem metody render, która nie powinna robić nic innego jak zwracać JSX!), tak więc jeżeli
              potrzebujemy by nasz komponent wykonał jakąś operację np. po zamontowaniu oraz po aktualizacji, musimy wywołać ją zarówno w <code>componentDidMount</code>
              jak i w <code>componentDidUpdate</code>.
            </p>

            <h3>Dlaczego nie wywoływać akcji asynchronicznych w <code>componentWill*</code>?</h3>
            <p>
              Metody <code>componentWill*</code> zdają się być stworzone dla zadań asynchronicznych takich jak pobieranie danych z serwera - przecież
              chcemy pobrać dane "zanim komponent"! Niestety w tym wypadku intuicja podpowiada nam nieco źle, a wynika to z powodu zmian wprowadzonych
              w React Fiber, którego głównym celem była poprawa "płynności animacji".
            </p>
            <p>
              W React Fiber wprowadzono nowy mechanizm pozwalający na (wewnętrzne) priorytetyzowanie renderowania komponentów. Każdy z przedstawionych
              wyżej cyklów życia może zostać wstrzymany lub anulowany przed wywołaniem <code>render</code>, a kiedy zapadnie decyzja o jego wznowieniu
              cykl ten będzie wywoływany od nowa.
            </p>
            <p>
              Oznacza to, że wszystkie operacje zaplanowane w <code>componentWillUpdate</code> mogą potencjalnie zostać wykonane nie raz, ale wielokrotnie
              w "jednym" cyklu. Funkcje <code>componentDid*</code> wywoływane są jednokrotnie - nie ma możliwości wstrzymania cyklu po wywołaniu <code>render</code>.
            </p>
            <Uwaga>
              <h4>Uwaga</h4>
              <p>
                Niejako wyjątkiem jest tutaj działałanie <code>componentWillMount</code> i <code>componentDidMount</code> w przypadku, kiedy stosujemy 
                renderowanie na serwerze. W takiej sytuacji <code>componentWillMount</code> wykonywany jest jedynie po stronie serwera, zaś
                <code>componentDidMount</code> w przeglądarce. Jeżeli chcemy wykonać operację jedynie na serwerze, powinniśmy zainicjować ją w pierwszej
                z tych dwóch metod.
              </p>
            </Uwaga>

          </Column>
        </Row>                
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div>
    ) ;   
  }

  renderPrzekazywanieDanychDoRodzica = () => {
    return (
      <div>
        <Row>
          <Column>
            <h3>Przekazywanie danych do rodzica i rodzeństwa</h3>
            <p>
              Wiemy już jak przekazywać dane od rodzica do dziecka - używamy w tym celu props. Mechanizm ten przyda nam się także do przekazywania danych
              w drugą stronę - od dziecka do rodzica. Zanim poznamy sposób, spójrzymy na problem, jaki pozwoli nam to rozwiązać w naszej aplikacji.
            </p>
            <p>
              Aktualnie aplikacja składa się z 2 głównych komponentów - <code>TweetForm</code> oraz <code>TweetList</code>. Komponenty te nie są ze sobą 
              w relacji rodzic-dziecko, więc w jaki sposób mogą się ze sobą komunikować? Standardowym sposobem jest <b>podniesienie stanu wyżej (ang. lift
              the state up).</b>
            </p>
            <p>
              Naszym rozwiązaniem jest stworzenie jednego wspólnego rodzica, który przetrzymywał będzie stan dla swoich dzieci oraz pomagał im w 
              komunikacji.
            </p>
          </Column>
        </Row>   
        <Row>
          <Column width={6}>
            <p>
              Utwórzmy komponent <code>TweetApp</code>, który stanowił będzie trzon naszej aplikacji - będzie on pretrzymywał informację o Tweetach
              oraz renderował wszystkie podległe elementy.
            </p>
            <p>
              Komponent ten otrzyma jako props listę utworzonych na sztywno Tweetów i w konstruktorze przepisze ją sobie do swojego wewnętrznego stanu.
              Rozwiązanie takie pozwoli nam w kolejnym kroku zmodyfikować stan (np. dodając nowy tweet) i odświeżyć listę.
            </p>
          </Column>
          <Column width={6}>
            <Example>{`
              import React from "react";
              import ReactDOM from "react-dom";
              import PropTypes from "prop-types";

              const TweetTime = (props) => {
                const date = \`\${props.date.getDay() + 1} \${props.date.toLocaleString('pl-pl', { month: "long" })}\`;
                return <time>{date}</time>
              };
              TweetTime.propTypes = {
                date: PropTypes.instanceOf(Date).isRequired
              };
              
              const TweetUser = ({ name, handle }) => <span><b>{name}</b> @{handle}</span>;
              TweetUser.propTypes = {
                handle: PropTypes.string.isRequired,
                name: PropTypes.string  
              };
              TweetUser.defaultProps = {
                name: 'Anonim'
              };
              
              class Tweet extends React.Component {

                static propTypes = {
                  tweet: PropTypes.shape({
                    user: PropTypes.shape({
                      handle: PropTypes.string.isReqired,
                      name: PropTypes.string,
                    }),
                    date: PropTypes.instanceOf(Date).isRequired,
                    text: PropTypes.string.isRequired
                  })
                } 
              
                render() {
                  const { user, text, date } = this.props.tweet;
                  return (
                    <div>
                      <TweetUser name={user.name} handle={user.handle} /> -
                      <TweetTime date={date} />
                      <p>
                        {text}
                      </p>
                    </div>
                  )
                }
              }            
                            
              const TweetData = [{
                id: 1,
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "Witaj świecie!"
              }, {
                id: 2,
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "To jest mój prywatny Twitter!"
              }];
                            
              const TweetList = ({ tweets }) => {                
                return (
                  <div>
                    {tweets.map(item => <Tweet tweet={item} key={item.id} />)}
                  </div>
                );
              }   
              TweetList.propTypes = {
                tweets: PropTypes.arrayOf(PropTypes.object)
              }

              
              class TweetForm extends React.Component {

                state = {
                  text: ''
                }

                handleChange = (event) => {
                  this.setState({
                    text: event.target.value
                  })
                }

                render() {
                  const { text } = this.state;
                  return (
                    <div>
                      <input type="text" onChange={this.handleChange} value={text} />
                      <br />
                      <button>Tweetuj!</button>
                      {text && <p>Podgląd: {text}</p>}
                    </div>                    
                  )
                }          
              }

              @important
              class TweetApp extends React.Component {

                constructor(props) {
                  super(props);
                  this.state = {
                    tweets: this.props.tweets
                  }
                }

                render() {
                  return (
                    <div>
                      <TweetForm />
                      <TweetList tweets={this.state.tweets} />                
                    </div>
                  )
                }
              }
              ReactDOM.render(<TweetApp tweets={TweetData} />, document.getElementById('root'));
              @end-important
            `}</Example>            
          </Column>
        </Row>   
        <Row>
          <Column width={6}>
            <p>
              Kolejnym krokiem jest przekazanie danych w drugą stronę - z formularza <code>TweetForm</code> do rodzica - <code>TweetApp</code>. W tym
              celu rodzic musi przekazać do swojego dziecka wywołanie zwrotne (ang. callback) jako props, zaś dziecko powinno wywołać ów callback 
              przekazując do niego dane.
            </p>
            <p>
              Nasz komponent <code>TweetForm</code> posiada guzik, który oznacza, że zakończyliśmy tworzenie wiadomości, więc dodajmy do niego obsługę
              zdarzenia <code>onClick</code>, które pośrednio wywoła przekazany handler <code>this.props.onSubmit</code>.
            </p>
            <p>
              Po wpisaniu treści i przyciśnięciu klawisza dane z komponentu zostaną przekazane w górę - do rodzica - a następnie wyświetlone w oknie
              alertu.
            </p>
            <p>
              Dodatkowo, ponieważ używamy kontrolowanego formularza zmieniając <code>this.state.text</code> na pusty string po przesłaniu danych
              usuwamy tekst wpisany w pole.
            </p>
            <Uwaga>
              <h4>Częste błędy</h4>
              <p>
                Programiści, który dużo pracowali z HTML i JS mogą z rozpędu użyć zapisu:
              </p>
              <Example>{`
                <button onClick={this.handleSubmit()}>Tweetuj!</button>
              `}</Example>
              <p>
                jednak przekonają się, że kod ten wywołany jest od razu, a co gorsze, wywoływany jest za każdym razem, kiedy komponent ponownie się
                wyrenderuje. Do handlerów zdarzeń powinniśmy przekazywać zawsze wskaźnik na funkcję (lub samo wyrażenie funkcji), powyższy przykład
                wpierw wywoła funkcję <code>this.handleSubmit</code> a wartość, którą zwróci przekaże do handlera <code>onClick</code>.
              </p>
            </Uwaga>
          </Column>
          <Column width={6}>
            <Example>{`
              import React from "react";
              import ReactDOM from "react-dom";
              import PropTypes from "prop-types";

              const TweetTime = (props) => {
                const date = \`\${props.date.getDay() + 1} \${props.date.toLocaleString('pl-pl', { month: "long" })}\`;
                return <time>{date}</time>
              };
              TweetTime.propTypes = {
                date: PropTypes.instanceOf(Date).isRequired
              };
              
              const TweetUser = ({ name, handle }) => <span><b>{name}</b> @{handle}</span>;
              TweetUser.propTypes = {
                handle: PropTypes.string.isRequired,
                name: PropTypes.string  
              };
              TweetUser.defaultProps = {
                name: 'Anonim'
              };
              
              class Tweet extends React.Component {

                static propTypes = {
                  tweet: PropTypes.shape({
                    user: PropTypes.shape({
                      handle: PropTypes.string.isReqired,
                      name: PropTypes.string,
                    }),
                    date: PropTypes.instanceOf(Date).isRequired,
                    text: PropTypes.string.isRequired
                  })
                } 
              
                render() {
                  const { user, text, date } = this.props.tweet;
                  return (
                    <div>
                      <TweetUser name={user.name} handle={user.handle} /> -
                      <TweetTime date={date} />
                      <p>
                        {text}
                      </p>
                    </div>
                  )
                }
              }            
                            
              const TweetData = [{
                id: 1,
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "Witaj świecie!"
              }, {
                id: 2,
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "To jest mój prywatny Twitter!"
              }];
                            
              const TweetList = ({ tweets }) => {                
                return (
                  <div>
                    {tweets.map(item => <Tweet tweet={item} key={item.id} />)}
                  </div>
                );
              }   
              TweetList.propTypes = {
                tweets: PropTypes.arrayOf(PropTypes.object)
              }

              @important
              class TweetForm extends React.Component {

                state = {
                  text: ''
                }

                static propTypes = {
                  onSubmit: PropTypes.func.isRequired
                }

                handleChange = (event) => {
                  this.setState({
                    text: event.target.value
                  })
                }

                handleSubmit = () => {
                  this.props.onSubmit(this.state.text);
                  this.setState({ text: '' });
                }

                render() {
                  const { text } = this.state;
                  return (
                    <div>
                      <input type="text" onChange={this.handleChange} value={text} />
                      <br />
                      <button onClick={this.handleSubmit}>Tweetuj!</button>
                    </div>                    
                  )
                }          
              }

              
              class TweetApp extends React.Component {

                constructor(props) {
                  super(props);
                  this.state = {
                    tweets: this.props.tweets
                  }
                }

                addTweet = (text) => {
                  alert(text);
                }

                render() {
                  return (
                    <div>
                      <TweetForm onSubmit={this.addTweet} />
                      <TweetList tweets={this.state.tweets} />                
                    </div>
                  )
                }
              }
              @end-important

              ReactDOM.render(<TweetApp tweets={TweetData} />, document.getElementById('root'));              
            `}</Example>            
          </Column>          
        </Row>   
        <Row>
          <Column width={6}>
            <p>
              Ostatnie, co musimy zrobić to zaktualizować stan rodzica, dodając do niego nowy tweet. W tym celu używamy oczywiście metody 
              <code>this.setState</code>. Upewnijmy się od razu, że dodawany przez nas Tweet ma odpowiednie - unikalne - <code>id</code> oraz, że 
              umieszczony został na początku listy Tweetów.
            </p>            
          </Column>
          <Column width={6}>
            <Example>{`
              import React from "react";
              import ReactDOM from "react-dom";
              import PropTypes from "prop-types";

              const TweetTime = (props) => {
                const date = \`\${props.date.getDay() + 1} \${props.date.toLocaleString('pl-pl', { month: "long" })}\`;
                return <time>{date}</time>
              };
              TweetTime.propTypes = {
                date: PropTypes.instanceOf(Date).isRequired
              };
              
              const TweetUser = ({ name, handle }) => <span><b>{name}</b> @{handle}</span>;
              TweetUser.propTypes = {
                handle: PropTypes.string.isRequired,
                name: PropTypes.string  
              };
              TweetUser.defaultProps = {
                name: 'Anonim'
              };
              
              class Tweet extends React.Component {

                static propTypes = {
                  tweet: PropTypes.shape({
                    user: PropTypes.shape({
                      handle: PropTypes.string.isReqired,
                      name: PropTypes.string,
                    }),
                    date: PropTypes.instanceOf(Date).isRequired,
                    text: PropTypes.string.isRequired
                  })
                } 
              
                render() {
                  const { user, text, date } = this.props.tweet;
                  return (
                    <div>
                      <TweetUser name={user.name} handle={user.handle} /> -
                      <TweetTime date={date} />
                      <p>
                        {text}
                      </p>
                    </div>
                  )
                }
              }            
                            
              const TweetData = [{
                id: 1,
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "Witaj świecie!"
              }, {
                id: 2,
                user: {
                  name: "Bartosz Szczeciński",
                  handle: "btmpl"
                },
                date: new Date(),
                text: "To jest mój prywatny Twitter!"
              }];
                            
              const TweetList = ({ tweets }) => {                
                return (
                  <div>
                    {tweets.map(item => <Tweet tweet={item} key={item.id} />)}
                  </div>
                );
              }   
              TweetList.propTypes = {
                tweets: PropTypes.arrayOf(PropTypes.object)
              }

              
              class TweetForm extends React.Component {

                state = {
                  text: ''
                }

                static propTypes = {
                  onSubmit: PropTypes.func.isRequired
                }

                handleChange = (event) => {
                  this.setState({
                    text: event.target.value
                  })
                }

                handleSubmit = () => {
                  this.props.onSubmit(this.state.text);
                  this.setState({ text: '' });
                }

                render() {
                  const { text } = this.state;
                  return (
                    <div>
                      <input type="text" onChange={this.handleChange} value={text} />
                      <br />
                      <button onClick={this.handleSubmit}>Tweetuj!</button>
                    </div>                    
                  )
                }          
              }

              
              class TweetApp extends React.Component {

                constructor(props) {
                  super(props);
                  this.state = {
                    tweets: this.props.tweets
                  }
                }

                @important
                addTweet = (text) => {
                  const newTweet = {
                    id: this.state.tweets.length + 1,
                    user: {
                      name: "Bartosz Szczeciński",
                      handle: "btmpl"
                    },
                    date: new Date(),
                    text: text
                  }

                  this.setState({
                    tweets: [newTweet, ...this.state.tweets]
                  });
                }
                @end-important

                render() {
                  return (
                    <div>
                      <TweetForm onSubmit={this.addTweet} />
                      <TweetList tweets={this.state.tweets} />                
                    </div>
                  )
                }
              }              

              ReactDOM.render(<TweetApp tweets={TweetData} />, document.getElementById('root'));              
            `}</Example>            
          </Column>          
        </Row>                
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div>
    ) ;  
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