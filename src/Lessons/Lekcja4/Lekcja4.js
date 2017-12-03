import React from "react";
import PropTypes from "prop-types";
import Navigate from "./../../common/Navigate/Navigate";
import { Row, Column } from "./../../common/Layout/Layout";
import Example from "./../../common/example/Example";

import { Uwaga } from "./../../common/Inserts/Inserts";

import Lekcja from "../Lekcja";

export default class Lesson extends Lekcja {

  static title = "Lekcja 4 - Interakcja z komponentami";

  static getSections = () => {
    return [      
      {
        url: '/lekcja/lekcja4/props',
        title: 'Przekazywanie danych w relacji rodzic : dziecko'
      },      
      {
        url: '/lekcja/lekcja4/prop-types',
        title: 'propTypes i defaultProps'
      },
      {
        url: '/lekcja/lekcja4/listy-komponentow',
        title: 'Listy komponentów'
      },
      {
        url: '/lekcja/lekcja4/wprowadzenie-do-formularzy',
        title: 'Formularze niekontrolowane, referencje'
      }, 
      {
        url: '/lekcja/lekcja4/zdarzenia',
        title: 'Zdarzenia'
      }, 
      {
        url: '/lekcja/lekcja4/stan-komponentu',
        title: 'Stan komponentu'
      },        
      {
        url: '/lekcja/lekcja4/cykl-zycia-komponentu',
        title: 'Cykl życia komponentu',
      },
      {
        url: '/lekcja/lekcja4/przekazywanie-danych-do-rodzica',
        title: 'Przekazywanie danych do rodzica i rodzeństwa'
      }
    ]
  }  

  renderProps = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Przekazywanie danych w relacji rodzic : dziecko</h2>
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
 
            <p>
              Parametry przekazywane od rodzica do dziecka w React nazywamy <code>props</code>. Props zapisujemy podobnie jak atrybuty w HTML. Wartości tekstowe 
              przekazujemy otoczone cudzysłowem (nie ma znaczenia czy będzie to pojedyncze czy podwójne cudzysłowie), wartości dynamiczne otaczamy natomiast 
              znacznikami <code>{'{}'}</code>. Jako wartości dynamiczne możemy przekazać zarówno zmienne jak i wyrażenia dokładnie tak samo jak w przypadku ES6 
              template literals.
            </p>
            <p>
              W przypadku komponentów bezstanowych, props zostaną przekazane do naszej funkcji jako pierwszy parametr w postaci obiektu, którego klucze odpowiadają
              nazwom propów.
            </p>                             
          </Column>
        </Row>  

        
        <Row>
          <Column width={6}>
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
            <p>
              Każdy komponent, który zawiera w sobie jakieś elementy (komponenty, HTML) otrzymuje także niejawnie jeden dodatkowy props 
              - <code>props.children</code>, który zawiera właśnie te komponenty. 
            </p>
            <p>
              W niektórych przykładach zobaczysz składnię <code>{'propName={{ }}'}</code> - bez obaw! Po prostu do propsu <code>propName</code> przekazujemy 
              obiekt JS!
            </p>
          </Column>        
          <Column width={6}>
            <Example isRunable>{`
              import React from "react";
              import ReactDOM from "react-dom";
              
              const TweetTime = (props) => {
                const date = \`\${props.date.getDate()} \${props.date.toLocaleString('pl-pl', { month: "long" })}\`;
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
        <Row>
          <Column>
            <Uwaga>
              <h4>Uwaga</h4>
              <p>
                Jeżeli komponent zawiera tylko jeden bezpośredni komponent potomny, <code>props.children</code> będzie właśnie tym komponentem, lecz jeżeli
                komponent zawiera więcej niże jeden bezpośredni komponent potomny, <code>props.children</code> będzie tablicą komponentów. W celu zapewnienia 
                spójnej obsługi takich sytuacji zaleca się użycie API <a href="https://reactjs.org/docs/react-api.html#reactchildren" target="_blank">React.Children</a>.
              </p>
            </Uwaga>          
          </Column>
        </Row>                 
        <Navigate prev={{url: '/lekcja/lekcja3/wprowadzenie-do-react', title: 'Lekcja 3'}} next={this.getNext(this.props.section)} />    
      </div>
    )
  }

  renderPropTypes = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Definiowanie props oraz wartości domyślne</h2>
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
            <Example isRunable>{`
              import React from "react";
              import ReactDOM from "react-dom";
              @important
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
              babel-plugin-transform-class-properties</a> możesz używać alternatywnego, krótszego zapisu PropTypes dla komponentów stanowych.
            </p>
            <p>
              Opiera on się o nowy typ pola danych - <code>static</code> ale w praktyce wciąż transpilowany jest na poprzednią notację.
            </p>
          </Column>
          <Column width={6}>
            <Example isRunable>{`
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
            <Example isRunable>{`
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
            <Example isRunable>{`
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
              Nasza aplikacja generuje już listę Tweetów, ale nie działa to jeszcze tak, jak byśmy chcieli. Dane o Tweetach pobiera on z aplikacji,
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
            <Example isRunable>{`
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

  renderWprowadzenieDoFormularzy = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Formularze niekontrolowane</h2>
            <p>
              Duża część interakcji, w jaką nasi użytkownicy wchodzą z naszą aplikacją opiera się o pracę z formularzami. W React wyróżniamy dwa typy formularzy.
              Pierwszy z nich to tzw. formularz niekontrolowany (ang. uncontrolled forms). Praca z nimi wygląda dokładnie tak, jak praca z formularzami w czystym
              HTML i JS.
            </p>     
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              Dodajmy zatem do naszego projektu komponent <code>TweetForm</code>, który składa się z jednego pola tekstowego (treści tweetu) i guzika 
              odpowiedzialnego za przesłanie formularza.
            </p>     
            <p>
              Podczas wdrażania rozwiązania pojawia się kilka obserwacji i problemów:
            </p>
            <ul>
              <li>
                pole nie może mieć zdefiniowanego przez nas atrybutu <code>value</code> - kiedy go dodamy, nie mamy możliwości zmiany wartości pola, jeżeli potrzebujemy
                nadać polu wartość domyślną, używamy <code>defaultValue</code>
              </li>
              <li>
                nie mamy możliwości odczytania wartości pola z poziomu JS
              </li>              
            </ul>
            <p>
              Osoby pracujące wcześniej z frameworkami pozwalającymi na dwu kierunkowy przepływ danych modły by pokusić się o rozwiązanie typu <code>value={`{this.value}`}</code>
              , jednak React nie wspiera takiego rozwiązania.
            </p>
          </Column>
          <Column width={6}>
            <Example isRunable>{`
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
                
                render() {
                  return (
                    <div>
                      <input type="text" />
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
          <Column>
            <h3>Referencje do DOM</h3>
            <p>
              Co prawda w React możemy korzystać z API DOM i użyć np. <code>document.querySelector</code> by dostać referencję na konkretny element DOM, ale
              rozwiązanie takie gryzie się nieco z ideą separacji React (VDOM) i DOM. Czasem jednak jest to konieczne - w takich wypadkach React oferuje nam
              kilka wyjść bezpieczeństwa, najpopularniejszym z których są referencje.
            </p>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>
              Każdy komponent (czy to komponent Reactowy, czy też HTML) przyjmuje funkcję w property <code>ref</code>. Po każdym renderowaniu się komponentu,
              funkcja ta będzie wywoływana z parametrem, który stanowi odniesienie do węzła DOM (lub jego odpowiednika na danej platformie, np. React Native).
            </p>
            <Uwaga>
              <h4>Uwaga</h4>
              <p>
                Funkcja ta wywoływana jest w <code>render</code> oznacza to, że referencje nie są dostępne w <code>componentWillMount</code> i innych funkcjach
                wywoływanych przed pierwszym renderowaniem komponentu.
              </p>
            </Uwaga>
            <p>
              Mając odwołanie do elementu DOM pola formularza możemy odczytać jego wartość w polu <code>value</code>.
            </p>
          </Column>
          <Column width={6}>
            <Example isRunable>{`
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

              setRef = (node) => this.inputField = node

              handleSubmit = () => alert(this.inputField.value);
              
              render() {
                return (
                  <div>
                    <input type="text" ref={this.setRef}/>
                    <br />
                    <button onClick={this.handleSubmit}>Tweetuj!</button>
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
          <Column>
            <p>
              Poza zastosowaniem w formularzach, referencje przydatne są wszędzie tam, gdzie potrzebujemy odczytać / zmienić wartości bezpośrednio w DOM, 
              przykładowo w celu pobrania wymiarów czy pozycji elementu.
            </p>
            <h3>referencje na komponent</h3>
            <p>
              Referencje mogą wskazywać także na komponent - np. <code>&lt;TweetForm ref={`{el => this.form = el}`} /&gt;</code> dzięki czemu uzyskamy
              dostęp do instancji danego komponentu (a nie jego HTML!) i możemy odczytać jego prywatne dane. Rozwiązanie takie nie jest jednak typowym 
              i nie powinno być stosowane w celu zapewnienia komunikacji między komponentami.
            </p>

            <h3>findDOMNode</h3>
            <p>
              Drugim z rozwiązań jest użycie funkcji <code>ReactDOM.findDOMNode</code>, która jako parametr akceptuje komponent (np. <code>this</code>) i zwraca
              nam główny węzeł DOM zwrócony przez <code>render()</code>. Jeżeli komponent renderuje tablicę elementów, zwrócona zostanie referencja do 
              pierwszego elementu tablicy.
            </p>
          </Column>
        </Row>        
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div>
    )
  }

  renderZdarzenia = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Zdarzenia</h2>
            <h3>Dodawanie listenerów</h3>
            <p>
              Dodawanie listenerów dla zdarzeń w React działa bardzo podobnie do tego, jak wykonywane jest to w czystym HTML, należy mieć na uwadze jedynie:
            </p>
            <ul>
              <li>nazwy listenerów używają notacji camelCase</li>
              <li>do listenera musimy przekazać wskazanie na funkcję, a nie nową funkcję lub wywołanie funkcji</li>
            </ul>
            <p>
              Ostatni warunek jest częstym pododem błędów wśród początkujących developerów - nasz kod powinien przekazywać wskazanie na funkcję - 
              np. <code>onClick={`{this.handleClick}`}</code> a nie jej wywołanie - <code>onClick={`{this.handleClick()}`}</code>
            </p>
            <h3>Przekazywanie danych do handlerów</h3>
            <p>
              Każdy z handlerów wywoływany jest z odpowiednią wartością - dla handlerów dodanych do elementów HTML będzie to zwyczajowo obiekt reprezentujący
              dany typ zdarzenia (nie jest to do końca prawda, o czym dowiesz się w dalszej części tej sekcji). Dla komponentów będzie to wartość, którą
              zadeklarowali twórcy danego komponentu.
            </p>
            <p>
              Jeżeli chcemy przekazać do wywołania zdarzenia własne parametry, możemy utworzyć i przekazać anonimową funkcję, lub użyć bind:
            </p>
            <Example>{`
              <div onClick={() => this.handleClick(42)}></div>
              <div onClick={this.handleClick.bind(this, 42)}</div>
            `}</Example>

            <h3>this</h3>
            <p>
              Musimy pamiętać, że JS jako język późnego wiązania (ang. late-bound langage) może zmienić wartość <code>this</code> w wywołanej funkcji, jeżeli
              nie jest ona wywoływana np. jako callback lub po określonym czasie (<code>setTimeout</code>, <code>setInterval</code>). Aby zapobiec temu "problemowi"
              możemy wykorzystać jedno z 3 rozwiązań:
            </p>
            <Example isRunable>{`
              import React from "react";
              import ReactDOM from "react-dom";

              class Example extends React.Component {
                handleClick() {
                  alert(this);
                }

                handleClickBound = () => {
                  alert(this);
                }

                render() {
                  return (
                    <div>
                      <div onClick={this.handleClick}>błędna wartość this</div>
                      <div onClick={this.handleClickBound}>poprawna wartość this - użycie związanej funkcji</div>
                      <div onClick={this.handleClick.bind(this)}>poprawna wartość this - wiązanie dynamiczne</div>
                      <div onClick={() => this.handleClick()}>poprawna wartość this - this przechowywane w closure</div>
                    </div>
                  )
                }
              }

              ReactDOM.render(<Example />, document.getElementById('root'));
            `}</Example>

            <h3>SyntheticEvent</h3>
            <p>
              W celu ujednolicenia API zdarzeń pomiędzy różnymi przeglądarkami, React zmienia typ zdarzeń, które przekazywane są w odpowiedzi na interakcję
              z DOM na swój natywny typ - <code>SyntheticEvent</code>. Wszystkie takie zdarzenia mają dokładnie to sami API, co zdarzenia DOM wg. WHATWG. 
            </p>
            <p>
              Jedną różnicą, wartą uwagi jest handler <code>onChange</code> który dla pól tekstowych formularza wywoływany jest za każdym razem, kiedy wartość
              pola ulegnie zmianie, podczas gdy w zwykłym HTML+JS wywołany on będzie w momencie, w którym użytkownik opuści modyfikowane pole.
            </p>
            <p>
              W danym momencie istnieje tylko jedna instancja zdarzenia i jest ona przekazywana do kolejnych elementów. Za każdym razem gdy wywołany zostanie
              handler jakiegoś zdarzenia, obiekt SyntheticEvent jest zerowany i jego wartości zapełniane są wartościami natywnego zdarzenia. Oznacza to, że jeżeli
              zamierzamy pracować ze zdarzeniem w trybie asynchronicznym przekonamy się, że wartości zostały usunięte lub uległy zmianie.
            </p>
            <p>
              W większości wypadków wystarczy skopiować interesujące nas wartości zdarzenia do zmiennych lokalnych, np. <code>const value = event.target.value</code> lub
              jeżeli potrzebujemy wykorzystać więcej wartości i kopiowanie ich nie jest nam na rękę, możemy wywołać <code>event.persist()</code> co wyłączy daną
              instancję SyntheticEvent "z obiegu" i utworzy nową na potrzeby kolejnych zdarzeń.
            </p>
          </Column>
        </Row>
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div> 
    );
  }

  renderStanKomponentu = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Stan komponentu</h2>
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
              Kiedy uruchomimy aplikację, strona wyrenderuje się z nowym - pustym formularzem. Zmień w kodzie stan:
            </p>
            <pre>
              state = {`{ text: 'test' }`}
            </pre>
            <p>aby sprawdzić, czy wszystko działa OK - strona powinna odświeżyć się i pokazać nową zawartość.</p>
          </Column>
          <Column width={6}>
            <Example isRunable>{`
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
                      <input type="text" value={this.state.text} />
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
              skorzystamy ze poznanych we wcześniejszym rozdziale zdarzeń.
            </p>
          </Column>
          <Column width={6}>
            <Example isRunable>{`
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
              otrzymuje obiekt ze zmienionymi wartościami. Jeżeli nasz komponent poza tekstem przechowywał by też inne dane w swoim stanie,
              a my chcieli byśmy zmienić jedynie tekst, nie musimy przekazywać ponownie całego stanu (nie zmienionych elementów) a jedynie
              obiekt zawierający pole <code>text</code>.
            </p>
            <p>
              Po wpisaniu treści pojawi się dodatkowy paragraf zawierający podgląd wpisywanego Tweetu. Po sprawdzeniu, że rzeczywiście się tak
              dzieje możemy go usunąć.
            </p>
          </Column>
          <Column width={6}>
            <Example isRunable>{`
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

  renderCyklZyciaKomponentu = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Cykl życia komponentu</h2>
            <p>
              Kolejnym ważnym tematem odróżniającym komponenty stanowe i bezstanowe jest tzw. cykl życia (ang. life cycle) komponentu. Komponenty
              bezstanowe tworzone są i niszczone za każdym razem, kiedy ich rodzic jest ponownie renderowany. Gdyby to samo działo się z komponentami
              stanowymi ich stan był by resetowany. React niszczy i tworzy ponownie komponenty stanowe tylko gdy przestaniemy je renderować w rodzicu
              po czym wyrenderujemy ponownie (lub zmienimy im props <code>key</code>).
            </p>
            <p>
              Z uwagi na to, że komponenty takie nie są niszczone przydatny jest jakiś sposób pozwalający im na współpracę z otoczeniem np. w celu
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
              <li>zainicjuj zmienne klasy</li>
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
              <code>shoulComponentUpdate</code> i chcemy zareagować na zmianę propsów - <code>componentWillReceiveProps</code> jest wywoływane przed {" "}
              <code>sCU</code> więc jeżeli chcemy mieć pewność, że operacja wykona się przed render, ale tylko jeżeli komponent zamierza się ponownie
              wyrenderować, możemy wywołać ją właśnie tutaj.
            </p> 
            <p><b>tak</b></p> 
            <ul>
              <li>zareaguj na zmiany props (np. w celu synchronizacji stanu i propsów) jeżeli używasz także <code>shouldComponentUpdate</code></li>
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
              <li>nie aktualizuj bezpośrednio stanu komponentu</li>
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
              <li>nie aktualizuj bezpośrednio stanu komponentu</li>
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
                Niejako wyjątkiem jest tutaj działanie <code>componentWillMount</code> i <code>componentDidMount</code> w przypadku, kiedy stosujemy 
                renderowanie na serwerze. W takiej sytuacji <code>componentWillMount</code> wykonywany jest jedynie po stronie serwera, 
                zaś <code>componentDidMount</code> w przeglądarce. Jeżeli chcemy wykonać operację jedynie na serwerze, powinniśmy zainicjować ją w pierwszej
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
            <h2>Przekazywanie danych do rodzica i rodzeństwa</h2>
            <p>
              Wiemy już jak przekazywać dane od rodzica do dziecka - używamy w tym celu props. Mechanizm ten przyda nam się także do przekazywania danych
              w drugą stronę - od dziecka do rodzica. Zanim poznamy sposób, spójrzmy na problem, jaki pozwoli nam to rozwiązać w naszej aplikacji.
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
              Utwórzmy komponent <code>TweetApp</code>, który stanowił będzie trzon naszej aplikacji - będzie on przetrzymywał informację o Tweetach
              oraz renderował wszystkie podległe elementy.
            </p>
            <p>
              Komponent ten otrzyma jako props listę utworzonych na sztywno Tweetów i w konstruktorze przepisze ją sobie do swojego wewnętrznego stanu.
              Rozwiązanie takie pozwoli nam w kolejnym kroku zmodyfikować stan (np. dodając nowy tweet) i odświeżyć listę.
            </p>
          </Column>
          <Column width={6}>
            <Example isRunable>{`
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
            <Example isRunable>{`
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
            <Example isRunable>{`
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

}