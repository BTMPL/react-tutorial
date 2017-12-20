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
        title: 'Pobieranie danych - AJAX'
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
              Jak narazie nasza aplikacja skupia się na HTML, interakcji z użytkownikiem etc. - nie zapominajmy jednak o tym, że powinna ona też odpowiednio
              wyglądać. W React przyjdzie nam pracować z CSS na kilka sposobów - podstawowym jest praca ze stylami inline i plikami CSS (lub LESS, SCSS etc.)
            </p>
            <h3>Style inline</h3>
          </Column>
        </Row>   
        <Row>
          <Column width={6}>
            <p>
              Podstawowe rozwiązanie opiera się na przekazaniu do elementów styli jako atrybut HTML <code>style</code>. Jako jego wartość przekazujemy zawsze
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
            `}</Example>            
          </Column>
        </Row>
        <Row>
          <Column>
            <h3>Klasy CSS</h3>
            <p>
              W React możemy także korzystać z zewnętrznych (lub osadzonych w dokumencie) arkuszy styli CSS. W tym celu należy dodać do elementu HTML klasę
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
            `}</Example>            
          </Column>        
        </Row> 
        <Row>
          <Column>
            <h3>css-modules</h3>
            <p>
              Popularnym problemem, z którym często spotykamy się przy porjektowaniu HTML i CSS jest kolizja nazw klas - kilku programistów może wybrać tę
              samą nazwę klasy dla różnych elementów i po dodaniu swoich arkuszy styli do projektu ich właściwości zaczną ze sobą oddziałowyać - łączyć się
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
                Opisany tu mechanizm nie jest niestety aktywny w create-react-app - żeby z niego skorzystać konieczne było by ejectowanie się z CRA i zmiana
                konfiguracji webpack.
              </p>
            </Uwaga>
          </Column>  
        </Row>     
        <Row>
          <Column width={6}>
            <p>
              W celu skorzystania z css-modules musimy zmodyfikować nieco proces, w który importujemy nasz plik CSS. Na skutek tej zmiany otrzymamy obiekt,
              który zawierać będzie zdefiniowane przez nas klasy jako klucze, zaś ich wartość zawierać będzie pseudo-losową nazwę klasy, wygenerowaną dla
              konkrentego przypadku użycia. Zakładając, że w naszym projekcie istnieje plik <code>style.css</code> o zawartości:
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

  renderStyledComponents = () => {
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

  renderCssInJs = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Receptury</h2>
            <h3>CSS-in-JS</h3>
            <p>
              Innym, równie popularnym sposobem na osadzanie CSS w JS jest takzwane "css-in-js", czyli stosowanie CSS bezpośrednio w definicji komponentów.
              Kilk wartych uwagi implementacji tego rozwiązania to:
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
              Pierwszym krokiem jest zaimportowanie bibliteki, następnie możemy już konstruować nasze komponenty - najczęściej używając składni taged template
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
              Rozwiązanie takie umożliwia zatem kilka innych ciekaowych zastosować takich jak rozszerzanie elementów na zasadzie dziediczenia oraz 
              parametryzowanie.
            </p>
            <p>
              Dodatkowo, przy wykorzystaniu mechanizmu <code>&lt;ThemeProvider&gt;</code> możemy przygotować zestaw zmiennych zawierających kolory, rozmiary,
              marginesy etc. i następnie dynczmienie podmieniać je w czasie pracy aplikacji.
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

}