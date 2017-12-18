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
              {" "}<code>&lt;link&gt;</code>. Można także użyć loaderów webpack - css-loader + style-loader które pozwolą nam zaimportować plik CSS do naszej
              aplikacji. Jeżeli używasz create-react-app masz dostęp do tej funkcjonalności.
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
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div>
    );  
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