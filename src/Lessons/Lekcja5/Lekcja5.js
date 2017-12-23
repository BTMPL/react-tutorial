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
        url: '/lekcja/lekcja5/css-in-js',
        title: 'CSS-in-JS'
      },      
      {
        url: '/lekcja/lekcja5/ajax',
        title: 'Wymiana danych - AJAX'
      },
      {
        url: '/lekcja/lekcja5/deploy',
        title: 'Wersja produkcyjna i publikowanie aplikacji'
      }        
    ]
  }  

  renderStyleICss = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Lekcja 5 - Receptury</h2>
            <h3>CSS</h3>
            <p>
              Jak na razie nasza aplikacja skupia się na HTML, interakcji z użytkownikiem etc. - nie zapominajmy jednak o tym, że powinna ona też odpowiednio
              wyglądać. W React przyjdzie nam pracować z CSS na kilka sposobów - podstawowym jest praca ze stylami inline i plikami CSS (lub LESS, SCSS etc.)
            </p>
            <h3>Style inline</h3>
          </Column>
        </Row>   
        <Row>
          <Column width={6}>
            <p>
              Podstawowe rozwiązanie opiera się na przekazaniu do elementów stylów jako atrybut HTML <code>style</code>. Jako jego wartość przekazujemy zawsze
              obiekt, którego klucze przyjmują notację <code>camelCase</code>, dokładnie taką, jak znamy z JavaScriptowego <code>element.style</code>.
            </p>
            <p>
              Dodajmy więc nieco CSS do naszej aplikacji. Zwróć uwagę na stosowanie odpowiedniej składni. W większości przypadków możesz pominąć jednostki
              przy wartościach numerycznych - w takim przypadku React użyje <code>px</code>.
            </p>
            <p>
              Rozwiązanie to działa, ale nie jest najlepsze - nasze style dodawane są do generowanych elementów HTML - nie ma możliwości ich nadpisania, nie
              możemy stosować pseudoselektorów (np. <code>:hover</code>) i powtarzają się one w kodzie wieloktrotnie.
            </p>
          </Column>
          <Column width={6}>
            <Example isRunnable>{`
              import React from "react";
              import ReactDOM from "react-dom";
              import PropTypes from "prop-types";

              const TweetTime = (props) => {
                const date = \`\${props.date.getDate()} \${props.date.toLocaleString('pl-pl', { month: "long" })}\`;
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
                @important              
                render() {
                  const { user, text, date } = this.props.tweet;
                  const styleObj = {
                    fontFamily: 'Arial', 
                    fontSize: '12px', 
                    color: '#222',
                    padding: 10,
                    background: '#f7f7f7',
                    margin: '0 0 10px 0'
                  };

                  return (
                    <div style={styleObj}>
                      <TweetUser name={user.name} handle={user.handle} /> -
                      <TweetTime date={date} />
                      <p style={{margin: '5px 0 0 0'}}>
                        {text}
                      </p>
                    </div>
                  )
                }
                @end-important         
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
        <Row>
          <Column>
            <h3>Klasy CSS</h3>
            <p>
              W React możemy także korzystać z zewnętrznych (lub osadzonych w dokumencie) arkuszy stylów CSS. W tym celu należy dodać do elementu HTML klasę
              CSS za pomocą atrybuty <code>class</code>.
            </p>
            <Uwaga>
              <h4>Uwaga</h4>
              <p>
                Jeżeli używasz React w wersji &lt;16 zamiast <code>class</code> musisz użyć <code>className</code> - w innym wypadku przeglądarka zgłosi błąd!
              </p>
            </Uwaga>
          </Column>
        </Row>     
        <Row>
          <Column width={6}>
            <p>
              Istnieją dwa główne sposoby dołączania samych arkuszy CSS do projektu - można zapisać je w pliku i samemu dodać do naszego pliku HTML znacznik
              {" "}<code>&lt;link&gt;</code>. 
            </p>
            <p>
              Można także użyć loaderów webpack - css-loader + style-loader które pozwolą nam zaimportować plik CSS do naszej aplikacji. Jeżeli używasz 
              create-react-app masz dostęp do tej funkcjonalności.
            </p>
            <p>
              Przykładowa zawartość pliku <code>style.css</code>:
            </p>
            <Example>{`
              .tweet {
                font-family: Arial;
                font-size: 12px;
                color: #222;
                padding: 10;
                background: #f7f7f7;
                margin: 0 0 10px 0;
              }
        
              .tweet p {
                margin: 5px 0 0 0;
              }            
            `}</Example>
          </Column>
          <Column width={6}>
            <Example isRunnable>{`
              import React from "react";
              import ReactDOM from "react-dom";
              import PropTypes from "prop-types";

              @important
              import "./style.css";
              
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
                    <div class="tweet">
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

              const TweetTime = (props) => {
                const date = \`\${props.date.getDate()} \${props.date.toLocaleString('pl-pl', { month: "long" })}\`;
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
        <Row>
          <Column>
            <h3>css-modules</h3>
            <p>
              Popularnym problemem, z którym często spotykamy się przy projektowaniu HTML i CSS jest kolizja nazw klas - kilku programistów może wybrać tę
              samą nazwę klasy dla różnych elementów i po dodaniu swoich arkuszy stylów do projektu ich właściwości zaczną ze sobą oddziałowywać - łączyć się
              lub nadpisywać. W celu uniknięcia tego typu sytuacji stosuje się różne techniki takie jak tworzenie przestrzeni nazw albo metodologie np. BEM.
            </p>
            <p>
              W świecie JS problem ten rozwiązano nieco inaczej - konieczność dbania o to, by klasy były unikalne przesunięta została z programisty na bundler.
              Przy użyciu <code>css-loader</code> z włączoną opcją <code>css-modules</code>, bundler zmieni nasze nazwy klas na pseudo-losowe, zapewniając
              że szansa nadpisywania się klas kilku niezależnych elementów jest znikoma.
            </p>
            <Uwaga>
              <h4>Uwaga</h4>
              <p>
                Opisany tu mechanizm nie jest niestety aktywny w <acronym title="create-react-app">CRA</acronym> - żeby z niego skorzystać konieczne było by 
                ejectowanie się z <acronym title="create-react-app">CRA</acronym> i zmiana konfiguracji webpack.
              </p>
            </Uwaga>
          </Column>  
        </Row>     
        <Row>
          <Column width={6}>
            <p>
              W celu skorzystania z css-modules musimy zmodyfikować nieco proces, w który importujemy nasz plik CSS. Na skutek tej zmiany otrzymamy obiekt,
              który zawierać będzie zdefiniowane przez nas klasy jako klucze, zaś ich wartość zawierać będzie pseudo-losową nazwę klasy, wygenerowaną dla
              konkretnego przypadku użycia. Zakładając, że w naszym projekcie istnieje plik <code>style.css</code> o zawartości:
            </p>
            <Example>{`
              .button {
                color: white;
                background: blue;
                padding: 10px;
              }
            `}</Example>
            <p>
              Możemy użyć css-loader i css-modules w następując sposób:
            </p>            
          </Column>
          <Column width={6}>
            <Example>{`
              import React from "react";
              import ReactDOM from "react-dom";
              
              import Styles from "./style.css";
              console.log(Styles);
              /**
               * {
               *   button: 'RMStbBE9w'
               * }
               */

              ReactDOM.render(
                <button className={Styles.button}>Kliknij mnie!</button>, 
                document.getElementById('root')
              );
            `}</Example>            
          </Column>
        </Row>
        <Row>
          <Column>
            <p>
              Podobnie jak w poprzednich przykładach, webpack zaimportuje nasz plik CSS lecz przed umieszczeniem go w dokumencie przetworzy znajdujące się 
              w nim selektory CSS zastępując klasy wg. podanego w konfiguracji wzorca.
            </p>
          </Column>  
        </Row>         
        <Navigate prev={{url: '/lekcja/lekcja4/przekazywanie-danych-do-rodzica', title: 'Przekazywanie danych do rodzica i rodzeństwa'}} next={this.getNext(this.props.section)} />
      </div>
    );  
  }

  renderAjax = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Receptury</h2>
            <h3>Wymiana danych - AJAX</h3>
            <p>
              React nie posiada zbudowanych mechanizmów pozwalających na komunikację z backendami w celu pobrania lub wysłania danych - developer może dowolnie
              dobrać rozwiązanie pasujące do jego wymagań. Może być to komunikacja za pomocą AJAX (tutaj najczęściej używany jest <code>fetch</code> lub <code>axios</code>),
              sockety (np. <code>socket.io</code>) czy GraphQL.
            </p>
            <p>
              W naszej aplikacji wdrożymy rozwiązanie oparte o AJAX i używające wbudowanej w przeglądarki funkcji <code>fetch</code>
            </p>
            <p>
              Przed przystąpieniem do integracji musimy zdać sobie sprawę z jednej ważnej rzeczy - w React nie ma możliwości aby komponent sam z siebie wstrzymał
              się z renderowaniem do momentu, aż dane zostaną pobrane. Nasze komponenty powinny być skonstruowane tak, by móc obsłużyć stan braku danych (a idealnie
              stany takie jak "dane nie pobrane", "brak danych dla zapytania", "dane pobrane").
            </p>
            <p>
              Kolejną wynikającą z tej sytuacji rzeczą do zapamiętania jest miejsce, w którym inicjujemy żądanie pobrania danych. Jeżeli nie ma możliwości, by
              dane trafiły do nas przed pierwszym wywołaniem <code>render()</code>, nie zyskamy nic z umieszczania go w <code>componentWillMount</code>. Dodatkowo
              przemawia za tym zmiana, jaką wprowadza React Fiber, na skutek której funkcje takie jak <code>constructor</code>, <code>componentWillMount</code> mogą
              zostać wywołane wielokrotnie przed wywołaniem <code>render()</code> - jeżeli tak się stanie, nasze zapytanie AJAX zostanie wysłane wielokrotnie.
            </p>
            <p>
              Uzbrojeni w tę wiedzę dodajmy do naszej aplikacji pobieranie danych z zewnętrznego serwera. Na potrzeby demonstracji skorzystamy z ogólnodostępnego
              serwisu <a href="https://jsonplaceholder.typicode.com/" target="_blank">jsonplaceholder.typicode.com</a>.
            </p>
          </Column>
        </Row>  
        <Row>
          <Column width={6}>
            <p>
              Pierwszą rzeczą o którą musimy zadbać, to ustawienie <code>this.state.tweets</code> na pusty Array. Użyjemy tego by sprawdzić, czy udało nam się już
              załadować jakieś Tweety z API.
            </p>
            <p>
              W metodzie <code>render()</code> dodajemy nasze sprawdzenie - jeżeli kolekcja tweets jest pusta, wyświetlmy komunikat o braku Tweetów, w przeciwnym
              wypadku - komponent <code>&lt;TweetList&gt;</code>.
            </p>
            <p>
              Cała logika pobierania danych jak ustaliliśmy wcześniej znajduje się w <code>componentDidMount()</code>. Używając funkcji <code>fetch</code>
              ( <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" target="_blank">dokumentacja w MDN</a> ):
            </p>
            <ol>
              <li>pobieramy dane z zewnętrznego serwera</li>
              <li>zamieniamy odpowiedź w format JSON</li>
              <li>dodajemy wyniki do tablicy <code>this.state.tweets</code> dbając o to żeby przyjęły one kształt, jakiego oczekuje nasza aplikacja</li>
            </ol>
            <p>
              Dodatkowo, w naszej metodzie <code>addTweet</code> dodajemy przesyłanie danych do serwera i w oparciu o odpowiedź, jaką otrzymujemy na to zapytanie
              modyfikujemy naszą kolekcję Tweetów - dodajemy nowy Tweet na początek listy (musimy tylko upewnić się, że data, którą otrzymamy od serwera jest
              obiektem, a nie stringiem).
            </p>
            <p>
              Rozwiązanie tego typu nazywamy "pesymistycznym aktualizowaniem". Jego przeciwieństwo - "optymistyczne aktualizowanie" - polega na dodaniu elementu
              do stanu lokalnego i "zaufaniu" że dane dotrą do serwera i zostaną pomyślnie zapisane. Oczywiście możemy zaimplementować też ponawianie niepomyślnych
              zapytań etc.
            </p>
          </Column>
          <Column width={6}>
            <Example isRunnable>{`
              import React from "react";
              import ReactDOM from "react-dom";
              import PropTypes from "prop-types";
              
              import "./style.css";
              
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
                    <div class="tweet">
                      <TweetUser name={user.name} handle={user.handle} /> -
                      <TweetTime date={date} />
                      <p>
                        {text}
                      </p>
                    </div>
                  )
                }                
              }                          

              const TweetTime = (props) => {
                const date = \`\${props.date.getDate()} \${props.date.toLocaleString('pl-pl', { month: "long" })}\`;
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
                    <div className="TweetForm">
                      <input type="text" onChange={this.handleChange} value={text} />
                      <button onClick={this.handleSubmit}>Tweetuj!</button>
                    </div>                    
                  )
                }          
              }
              
              @important
              class TweetApp extends React.Component {

                constructor(props) {
                  super(props);
                  this.state = {
                    tweets: []
                  }
                }

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

                  fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: JSON.stringify(newTweet),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8"
                    }
                  })
                  .then(response => response.json())
                  .then(json => {
                    this.setState({
                      tweets: [{
                        ...json,
                        date: new Date(json.date)
                      }, ...this.state.tweets]
                    });                    
                  })
                }                

                render() {
                  return (
                    <div>
                      <TweetForm onSubmit={this.addTweet} />
                      {this.state.tweets.length !== 0 
                        ? <TweetList tweets={this.state.tweets} />
                        : <p>Trwa pobieranie Tweetów ...</p>
                      }
                    </div>
                  )
                }

                componentDidMount() {
                  fetch('https://jsonplaceholder.typicode.com/comments')
                    .then(response => response.json())
                    .then(data => {
                      this.setState({
                        tweets: data.map(input => inputToAppFormat(input))
                      })
                    })
                }
              }

              const inputToAppFormat = (data) => ({
                user: {
                  name: data.name,
                  handle: data.email.split('@')[0],
                },
                date: new Date(),
                text: data.body
              });
              @end-important
              ReactDOM.render(<TweetApp />, document.getElementById('root'));
            `}</Example>            
          </Column>        
        </Row>
        <Row>
          <Column>
            <h3>CORS</h3>
            <p>
              Przeglądarki implementują mechanizm CORS (ang. Cross Origin Request Security), który aktywowany jest w momencie, kiedy przeglądarka wysyła żądanie
              AJAX do serwera dostępnego pod inną domeną (sub-domeną, portem lub protokołem). Mechanizm ten ma za zadanie uniemożliwienie złośliwym skryptom na
              wykonywanie np. połączeń do banków internetowych za pomocą przeglądarki użytkownika, w której mogą znajdować się dane do logowania. Więcej informacji
              nt. tego mechanizmu znaleźć można <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" target="_blank">na stronie MDN</a>.
            </p>
            <p>
              Może zdarzyć się, że podczas łączenia się z API nie będziemy mogli pobrać z niego danych (nawet pomimo tego, że widzimy je w zakładce z połączeniami
              w naszej przeglądarce). <acronym title="create-react-app">CRA</acronym> zapewnia nam obejście tego problemu na czas tworzenia aplikacji (z użyciem webpack), 
              ale docelowo będziemy musieli zadbać o to, żeby komunikacja z API była możliwa bez tego rozwiązania. Więcej na temat wbudowanego serwera proxy 
              znajdziesz w <a href="https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development" target="_blank">
              dokumentacji</a>.
            </p>
          </Column>
        </Row>
        
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />    
      </div>
    )
  }   

  renderCssInJs = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Receptury</h2>
            <h3>CSS-in-JS</h3>
            <p>
              Innym, równie popularnym sposobem na osadzanie CSS w JS jest takzwane "css-in-js", czyli stosowanie CSS bezpośrednio w definicji komponentów.
              Kilka wartych uwagi implementacji tego rozwiązania to:
            </p>                  
            <ul>
              <li><a href="https://www.styled-components.com/" target="_blank">styled-components</a></li>
              <li><a href="https://github.com/paypal/glamorous" target="_blank">glamorous</a></li>
              <li><a href="https://github.com/emotion-js/emotion" target="_blank">emotion</a></li>
            </ul>
            <p>
              Mechanizm CSS-in-JS pozwala na łatwiejsze dystrybuowanie warstwy CSS z naszymi komponentami, pozwala na łatwe nadpisywanie i rozszerzanie
              oraz na traktowanie CSS tak samo jak zwykłe komponenty React.
            </p>
            <p>
              Rozwiązania te są do siebie bardzo podobne - różnią się jednak niektórymi decyzjami architektonicznymi, więc jeżeli zdecydujesz się na to 
              rozwiązanie sprawdź wpierw, które będzie najlepsze dla Ciebie! Poniższe przykłady dotyczą biblioteki styled-components.
            </p>
          </Column>
        </Row>  

        <Row>
          <Column width={6}>
            <p>
              Rozwiązania tego typu skupiają się na definiowaniu elementów z danymi stylami, nie zaś na dodawaniu CSS do istniejących już komponentów. 
              Pierwszym krokiem jest zaimportowanie biblioteki, następnie możemy już konstruować nasze komponenty - najczęściej używając składni taged template
              strings.
            </p>
            <p>
              Rozwiązanie takie działa dwu etapowo:
            </p>
            <ul>
              <li>na podstawie przekazanego CSS tworzy nową klasę z "pseudo losową" nazwą taki selektor dodaje do elementu</li>
              <li>
                tworzy nowy element na podstawie przekazanego (w tym wypadku element HTML <code>&lt;button&gt;</code>) i przekazuje mu wcześniej wygenerowaną
                klasę jako prop <code>className</code>
              </li>
            </ul>
          </Column>
          <Column width={6}>
            <Example isRunnable>{`
              import React from "react";
              import ReactDOM from "react-dom";
              import styled from "styled-components";

              const Button = styled('button')\`
                background: blue;
                color: white;
                padding: 10px;
                border: 0;
                cursor: pointer;
              \`;

              ReactDOM.render(
                <Button>Kliknij mnie!</Button>, 
                document.getElementById('root')
              );
            `}</Example>            
          </Column>
        </Row>   
        
        <Row>
          <Column width={6}>
            <p>
              Rozwiązanie takie umożliwia zatem kilka innych ciekawych zastosować takich jak rozszerzanie elementów na zasadzie dziedziczenia oraz 
              parametryzowanie.
            </p>
            <p>
              Dodatkowo, przy wykorzystaniu mechanizmu <code>&lt;ThemeProvider&gt;</code> możemy przygotować zestaw zmiennych zawierających kolory, rozmiary,
              marginesy etc. i następnie dynamicznie podmieniać je w czasie pracy aplikacji.
            </p>
          </Column>
          <Column width={6}>
            <Example isRunnable>{`
              import React from "react";
              import ReactDOM from "react-dom";
              import styled from "styled-components";              
              const Button = styled('button')\`
                background: blue;
                color: white;
                padding: 10px;
                border: 0;
                cursor: pointer;
              \`;

              @important
              // rozszerzmy definicję komponentu Button
              const RedButton = styled(Button)\`
                background: red;
              \`

              const ColorButton = styled(Button)\`
                background: $\{props => props.background || 'yellow'\}
              \`

              ReactDOM.render(
                <div>
                  <Button>Kliknij mnie!</Button>
                  <RedButton>Kliknij mnie!</RedButton>
                  <ColorButton>Kliknij mnie!</ColorButton>
                  <ColorButton background="pink">Kliknij mnie!</ColorButton>
                </div>, 
                document.getElementById('root')
              );
              @end-important
            `}</Example>            
          </Column>
        </Row>    
        <Row>
          <Column>
            <p>
              styled-components pozwala także na stosowanie pseudo-selektorów (np. <code>:hover</code>), samo tworzenie klas CSS i ręczne dopisywanie ich do
              elementów (przez eksport nazwany <code>css</code>) czy wstrzykiwanie globalnego CSS, nie przypisanego do komponentu (np. dla definicji <code>@font-face</code>
              czy <code>@keyframes</code> przy użyciu <code>injectGlobal</code>).
            </p>
          </Column> 
        </Row>             
        
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />    
      </div>
    )
  }  

  renderDeploy = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Receptury</h2>
            <h3>Wersja produkcyjna i publikowanie aplikacji</h3>

            <p>
              W przypadku gdy nie korzystamy z żadnych rozwiązań server-side, nie potrzebujemy uruchomić własnego API etc. udostępnianie naszej aplikacji napisanej
              w React jest bardzo proste. 
            </p>
            <p>
              Pierwszym co musimy zrobić to wygenerowanie wersji produkcyjnej naszej aplikacji. Typowa aplikacja w czasie developowania zawiera dużo informacji, które
              nie są potrzebne w wersji produkcyjnej, kod jest nie zminimalizowany etc. przez co może ona zajmować kilka lub kilkanaście megabajtów. Aby poprawnie 
              zbudować aplikację w wersji produkcyjnej zwykle używamy oddzielnego pliku konfiguracyjnego dla naszego bundlera. 
              <acronym title="create-react-app">CRA</acronym> zawiera taki plik konfiguracyjny i żeby zbudować wersję publiczną naszej aplikacji wystarczy wywołać 
              komendę:
            </p>
            <Example showLineNumbers={false}>{`
              yarn run build
            `}</Example>
            <p>
              W odpowiedzi powinniśmy zobaczyć informacje związane z postępem przygotowywania wersji produkcyjnej:
            </p>
            <Example showLineNumbers={false}>{`
              yarn run v1.3.2
              $ react-scripts build
              Creating an optimized production build...
              Compiled without warnings.
              
              File sizes after gzip:
              
                36.5 KB  build\static\js\main.4cb50106.js
                126 B    build\static\css\main.11ef35f4.css
              
              The project was built assuming it is hosted at the server root.
              To override this, specify the homepage in your package.json.
              For example, add this to build it for GitHub Pages:
              
                "homepage" : "http://myname.github.io/myapp",
              
              The build folder is ready to be deployed.
              You may serve it with a static server:
              
                yarn global add serve
                serve -s build
              
              Done in 45.26s.            
            `}</Example>
            <p>
              W folderze naszego projektu pojawił się także nowy folder - <code>/build</code> - który zawiera gotową wersję naszej aplikacji, którą możemy umieścić
              na dowolnym serwerze dostępnym w sieci. Serwer ten nie musi obsługiwać żadnych dodatkowych technologi tj. node.
            </p>

            <p>
              Jeżeli nie korzystasz z <acronym title="create-react-app">CRA</acronym> musisz samemu utworzyć odpowiedni plik konfiguracyjny. Webpack jest w stanie 
              samemu zasugerować kilka odpowiednich zmian jeżeli uruchomisz go z odpwiednią flagą <code>webpack -p</code>.
            </p>
            <Uwaga>
              <h4>Uwaga</h4>
              <p>
                Na chwilę obecną wersja webpack 4.0 nie używa flagi <code>-p</code> zamiast tego należy uruchomić webpack komendą <code>webpack --mode production</code>.
              </p>
            </Uwaga>
            <h3>Publikacja z użyciem surge</h3>
            <p>
              Jeżeli nie dysponujesz żadnym serwerem, albo chcesz na szybko udostępnić prostą aplikację możesz skorzystać np. z usługi <a href="http://surge.sh/" target="_blank">surge.sh</a>,
              która pozwala na bezpłatne hostowanie prostych aplikacji. W celu skorzystania z surge zainstaluj globalnie moduł <code>surge</code> z npm:
            </p>
            <Example showLineNumbers={false}>{`
              yarn global add surge
            `}</Example>
            <p>
              A następnie opublikuj dane z katalogu <code>/build</code>:              
            </p>
            <Example showLineNumbers={false}>{`
              λ cd build\

              λ surge
              
                  Surge - surge.sh
              
                            email: twoj@email.com
                            token: *****************
                    project path: D:\\Sciezka\\Do\\Aplikacji\\build\\
                            size: 4 files, 502.3 KB
                          domain: losowa-nazwa.surge.sh
                          upload: [====================] 100%, eta: 0.0s
                propagate on CDN: [====================] 100%
                            plan: Free
                            users: twoj@email.com
                      IP Address: 12.34.56.78
              
                  Success! Project is published and running at losowa-nazwa       
            `}</Example>
            <p>
              Po kilku sekundach Twoja aplikacja powinna być dostępna pod domeną, którą losowo wygenerowało Surge.
            </p>
            <Uwaga>
              <h4>Uwaga</h4>
              <p>
                Pamiętaj by przed wywołaniem surge przejść do katalogu <code>/build</code>! W innym wypadku możesz omyłkowo opublikować kod swojej aplikacji, a nie jej
                uruchamialną wersję!
              </p>
            </Uwaga>
          </Column>
        </Row>
      </div>
    );
  } 

}