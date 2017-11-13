import React from "react";
import PropTypes from "prop-types";
import Navigate from "../../common/Navigate/Navigate";
import { Row, Column } from "../../common/Layout/Layout";
import Example from "./../../common/example/Example";


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
            <div className="uwaga">
              <h4>Uwaga</h4>
              <p>           
                Znaczniki JSX nie są interpretowane przez przeglądarkę i będą prowadzić do powstawania błędów. Od teraz wszystkie przykłady uruchamiaj
                w środowisku create-react-app lub innym boilerplate. Kod z tej sekcji umieść w pliku <code>src/index.js</code>
              </p>
            </div>
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
            <div className="uwaga">
              <h4>Uwaga</h4>
              <p>
                Nazwa naszego komponentu - Tweet - nie przypadkowo zaczyna się dużą literą. W ten sposób dajemy znać JSX, że chodzi nam o komponent,
                a nie o znacznik HTML. Jeżeli utworzymy komponent <code>header</code> i nie użyjemy wielkiej litery, podczas transformacji zostanie
                on potraktowany jako znacznik HTML i nie uzyskamy oczekiwanego efektu.
              </p>
            </div>
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
            <div className="uwaga">
              <h4>Uwaga</h4>
              <p>
                Uwaga - jeżeli postanowiłeś użyć tablicy, nie przejmuj się chwilowo informacją o błędzie, jak React zgłasza w konsoli :)
              </p>
            </div>          
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