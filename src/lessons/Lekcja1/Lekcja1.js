import React from "react";
import PropTypes from "prop-types";
import Navigate from "../../common/Navigate/Navigate";
import { Row, Column } from "../../common/Layout/Layout";
import Example from "./../../common/example/Example";

import devtools from "./react-devtools.jpg";

export default class Lesson extends React.Component {

  static propTypes = {
    section: PropTypes.string
  }

  static title = "Lekcja 1 - Podstawowe pojęcia, konfiguracja środowiska pracy";

  static getSections = () => {
    return [
      {
        url: '/lekcja/lekcja1/podstawowe-pojecia',
        title: 'Podstawowe pojęcia',
      },
      {
        url: '/lekcja/lekcja1/srodowisko-pracy',
        title: 'Środowisko NodeJS',
      },
      {
        url: '/lekcja/lekcja1/narzedzia-wspomagajace',
        title: 'Narzędzia wspomagające',
      },
      {
        url: '/lekcja/lekcja1/create-react-app',
        title: 'create react app',
      }
    ]
  }

  renderIndex = () => {

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

  renderPodstawowePojecia = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Podstawowe pojęcia</h2>
            <p>
              Przed rozpoczęciem pracy omówmy kilka podstawowych pojęć, którymi będziemy posługiwać się w kursie.
            </p>
            <p>
              <b>ECMAScript, ES</b> - specyfikacja języka skryptowego, którego jedną z implementacji jest JavaScript. Obecnie używa się określeń typu <b>ES6</b> lub <b>ES2015</b> w celu określeni werji ECMAScript, której używamy w tworzonym kodzie JavaScript.
            </p>
            <p>
              <b>node, nodejs</b> - środowisko, w którym możliwe jest wykonywanie aplikacji napisanych w języku JavaScript. Pozwala na uruchamianie aplikacji w odseparowaniu od systemu operacyjnego dzięki czemu aplikacje stworzone dla systemów Unixowych działają bez problemu lub z drobnymi modyfikacjami np. na platformie Windows.
            </p>
            <p>
              <b>npm, yarn</b> - ang. <em>node package manager</em> manadżery pakietów instalowany wraz z Node. yarn sanowi alternatywę stworzoną przez Facebook. Oba projekty korzystają ze wspólnego repozytorium więc można je stosować naprzemiennie.
            </p>
            <p>
              <b>moduł</b> - aplikacja udostępniona poprzez platformę npm, którą możemy dodać do naszego programu w celu zapewnienia składowej funkcjonalności; jako moduły npm dystrybuowane są także całe niezależne aplikacje, uruchamiane z linii poleceń.
            </p>
            <p>
              <b>biblioteka</b> - kod rozserzający aplikacje o dodatkową funkcjonalność, nie stanowiący oddzielnej aplikacji i zwykle nie wystarczający do zaspokojenia skomplikowanych założeń biznesowych.
            </p>            
            <p>
              <b>framework</b> - samowystarczalny i kompletny zestaw bibliotek, narzędzi i standardów pozwalający na tworzenie aplikacji.
            </p>
            <h3>Pojęcia związane z React</h3>
            <p>
              <b>VDOM</b> - "virtualna" reprezentacja DOM, czyli modelu obiektowego strony. W celu optymalizacji ilości operacji zmiany HTML React przeprowadza wszystkie operacja na virtualnym modelu - aktualizuje go w oparciu o przetworzone dane i porównuje z poprzednią wersją, po czym oblicza jakie elementy HTML należy dodać, usunąć lub zmienić.
            </p>
            <p>
              <b>JSX</b> - język znaczników, który pozwala na opisanie wyglądu i funkcjonalności elementów za pomocą składni przypominającej HTML
            </p>
            <p>
              <b>boilerplate</b> - zaopiniowany zestaw bibliotek, skryptów konfiguracyjnych i wytycznych co do standardów pozwalający na szybkie przystąpienie do realizowania funkcji biznesowych.
            </p>            
          </Column>
        </Row>
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div>
    )
  }

  renderSrodowiskoPracy = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Środowisko NodeJS</h2>
            <p>
              Kurs przygotowany jest z myślą o użytkownikach systemów Unixowych oraz Windows. Większość poleceń wykonywanych będzie w powłoce, dlatego zaleca się, by czytelnik znał podstawy obsługi odpowiedniej powłoki, zaś użytkownicy Windows używali powłoki bash (np. git-bash.exe)
            </p>
            <p>
              Pierwszym krokiem powinno być upewnieni się, że w naszym systemie znajduje się środowisko NodeJS. Jeżeli nie, odpowiednie paczki można <a href="https://nodejs.org/en/" target="_blank">pobrać ze strony nodejs.org</a> lub zainstalować za pomocą managera odpowiedniego dla naszego systemu.
            </p>
          </Column>
        </Row>
        <Row>
          <Column width={6}>
            <p>W następnej kolejności, upewnijmy się, że dysponujemy odpowiednimi wersjami node oraz npm. Najnowsze wersje nie są wymagane, ale na pewno pomagają. Upewnijmy się więc, że node posiadamy w wersji minimum 7.x, a npm 5.x. Aby uaktualnić npm wystarczy najczęściej wydać polecenie <code>npm install -G npm</code></p>
          </Column>
          <Column width={6}>
            <Example showLineNumbers={false}>{`
              λ node --version
              v7.10.0
              
              λ npm --version
              5.4.1
            `}</Example>
          </Column>
        </Row>  
        <Row>
          <Column>
            <h2>Edytor kodu</h2>
            <p>
              React nie posiada dedykowanego środowiska IDE (istnieje co prawda projekt <a href="https://nuclide.io/" target="_blank">Nuclide</a> dedykowany dla React Native) więc wybór edytora pozostaje preferencją developera. Ze swojej strony polecam świetny i darmowy edytor <a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a> lub <a href="https://atom.io/" target="_blank">Atom</a> - głównie ze względu na bogate środowisko dodatków i rozszerzeń. Warto upewnić się, że wybrany przez nas edytor posiada wsparcie dla podświetlania nowej składni ES6 oraz JSX.
            </p>
          </Column>
        </Row>  
        <Row>
          <Column>
            <h2>Folder projektu</h2>
            <p>
              Może wydawać się to oczywiste, jednak wybierając lokację naszego projektu powinniśmy pamiętać o kilku rzeczach, które pozwolą nam uniknąć problemów:
            </p>
            <ul>
              <li>nazwa folderu nie powinna zawierać spacji ani znaków specjalnych</li>
              <li>nazwa folderu nie powinna pokrywać się z nazwami modułów, które będziemy dodawać do projektu</li>
              <li>na systemach Windows, pamiętaj, by ścieżka folderu nie była zbyt długa - npm potrafi generować głęboką strukturę, a starsze wersje Windowsa posiadają ograniczenie co do długości ścieżki</li>
            </ul>
          </Column>
        </Row>                      
        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div>      
    )
  }

  renderNarzedziaWspomagajace = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>Narzędzia wspomagające</h2>
            <p>
              W ostatnich latach JavaScript rozwija się bardzo dynamicznie - pojawia się wiele rozwiązań, które stopniowo wdrażane są przez producentów przeglądarek. Niestety, tworząc aplikacje webowe musimy liczyć się z tym, że nasi użytkownicy nie zawsze będą posiadali najnowsze wersje przeglądarek, wspierające wszelkie rozwiązania, które chcemy zastosować. Może okazać się też, że chcemy skorzystać z dobrodziejstwa ECMAScript, które nie są jeszcze obsługiwane przez żadną z dostępnych przeglądarek. W tym celu korzystać będziemy z 2 popularnych narzędzi. Nie musisz być biegły w ich konfiguracji, ale chciałym byś wiedział do czego służą oraz znał ich ograniczenia.
            </p>            
          </Column>
        </Row>     
        <Row>
          <Column><h3>babel</h3></Column>
          <Column width={6}>
            <p>
              <a href="http://babeljs.io/" target="_blank">Babel</a> to tak zwany transpilator (lub kompilator), czyli narzędzie pozwalające na przekształcanie kodu źródłowego napisanego w jednym języku na inny. Dzięki odpowiednim "presetom" oraz "pluginom" możemy już dziś pisać aplikacje wykorzystując standard ECMAScript 2017 i transpilować go do wersji ECMAScript 5, którą obsługuje nawet Internet Explorer 8. To również dzięki Babel jesteśmy w stanie używać składni JSX.
            </p>   
            <p>
              Należy pamiętać, iż o ile babel pozwala nam na dodanie funkcjonalności, która nie jest jeszcze oficjalnym standardem ECMAScript, o tyle musimy liczyć się z tym, że używana w tym wypadku przez nas funkcjonalność (lub jej składnia) może ulec zmianie lub zostać ostatecznie odrzucona.
            </p>       
          </Column>          
          <Column width={6}>
            <Example>{`
              // .babelrc
              {
                presets: ["env", "react"],
                plugins: ["babel-plugin-transform-class-properties"]
              }
            `}</Example>
            <p>
              <small>Przykładowy plik konfiguracyjny Babel dodający wsparcie dla starszych przeglądarek, składni JSX oraz wsparcie dla class fields.</small>
            </p>
          </Column>
        </Row>
        <Row>
          <Column><h3>webpack</h3></Column>
          <Column width={6}>
            <p>
              <a href="https://webpack.js.org/" target="_blank">Webpack</a> pełni wiele funkcji, ale jego podstawową jest przetwarzanie wszelkich zasobów naszej aplikacji, takich jak plik JS, grafiki, arkusze CSS w celu przygotowania tzw. "bundli" czyli pakietów, które mogą odczytywać przeglądarki. Moduły npm w dużej większości składają się z dziesiątek plików, setek zależności, różnych wersji etc. - przeglądarki nie są jeszcze gotowe na obsłużenie tak dostarczanych aplikacji. Dzięki odpowiedniej konfiguracji Webpack jest w stanie zebrać cały kod naszej aplikacji i zapisać go do jednego (lub więcej) plików wynikowych, dzięki czemu możemy bez problemu dostarczyć go przeglądarce (a przy okazji, używając Babel zmienić na kod, który będzie ona w stanie rozpoznać).
            </p>
            <p>
              Zastępuje on rozwiązania takie jak gulp, grunt czy browserify - jest w stanie przetworzyć na bieżąco nasz kod LESS/SASS do CSS, skompresować pliki graficzne i skopiować je do odpowiedniego katalogu tak, by były dostępne dla aplikacji niezależnie od tego gdzie ją uruchamiamy. Webpack monitoruje nasze zmiany w czasie rzeczywistym dzięki czemu po zapisaniu kodu nasza strona natychmiast aktualizuje się bez konieczności odświeżania przeglądarki.
            </p>
            <p>
              Webpack uruchamiany jest w środowisku developerskim, lub w celu stworzenia produkcyjnej wersji aplikacji, dlatego też musi on mieć dostęp do wszystkich materiałów, które chcemy na stałe zapisać w publicznych plikach aplikacji. Tak wygenerowane pliki następnie umieszczamy na dowolnym serwerze HTTP w celu udostępnienia w Internecie.
            </p>
          </Column>          
          <Column width={6}>
            <Example>{`
              // webpack.config.js
              module.exports = {
                entry: ["./src/index.js"],
                output: {
                  path: path.join(__dirname, "..", "dist"),
                  filename: "bundle.js",
                  publicPath: "/"
                },
                module: {
                  rules: [
                    {
                      test: /\.js?/,
                      use: ["babel-loader"]
                    },
                    {
                      test: /\.less/,
                      use: ["style-loader", "css-loader", "less-loader"]
                    }
                  ]
                },
                resolve: {
                  modules: ["node_modules"]
                }
              }              
            `}</Example>
            <p>
              <small>Przykładowy plik konfiguracyjny Webpack, zapewniający transpilację kodu JS oraz LESS.</small>
            </p>
          </Column>
        </Row>   
        <Row>
          <Column><h3>eslint</h3></Column>
          <Column width={6}>
            <p>
              <a href="https://eslint.org/" target="_blank">ESLint</a> pozwala na narzucenie standardów dotyczących tworzonego kodu a następnie skanowanie naszej aplikacji w celu wykrycia fragmentów nie spełniających tych założeń. Pozwala on zarówno na wychwycenie błędów (t.j. użycie nie zadeklarowanych zmiennych), dbanie o spójny kod (średniki lub ich brak, pojedyncze lub podwójne cudzysłowia ... spacje czy tabulatory?) ale także na wychwytywanie błędów w użytkowaniu konkretnych bibliotek (np. React!).
            </p>         
          </Column>          
          <Column width={6}>
            <Example>{`
                /projects/react/src/index.js
                34:44  error  'match' is missing in props validation          react/prop-types
                34:50  error  'match.params' is missing in props validation   react/prop-types
                47:7   error  Do not use setState in componentDidUpdate       react/no-did-update-set-state
            `}</Example>
            <p>
              <small>Przykładowe podsumowanie znalezionych błedów</small>
            </p>
          </Column>
        </Row>
        <Row>
          <Column><h3>React Developer Tools</h3></Column>
          <Column width={6}>
            <p>
              Oficjalny dodatek do narzędzi przeglądarki, wspomagający pracę z Reactem - podobnie jak domyślne narzędzia pozwalają na pracę z HTML, tak React Developer Tools pokazuje (i pozwala nam modyfikować) w przeglądarce strukturę aplikacji Reactowej.
            </p>  
            <ul>
              <li><a href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi" target="_blank">Pobierz dla Chrome</a></li>
              <li><a href="https://addons.mozilla.org/pl/firefox/addon/react-devtools/" target="_blank">Pobierz dla Firefox</a></li>
              <li><a href="https://www.npmjs.com/package/react-devtools" target="_blank">Pobierz wersję Standalone</a></li>
            </ul>                   
          </Column>          
          <Column width={6}>            
            <img src={devtools} alt="React Developer Tools" />
          </Column>
        </Row>

        <Navigate prev={this.getPrev(this.props.section)} next={this.getNext(this.props.section)} />
      </div>      
    )    
  }

  renderCreateReactApp = () => {
    return (
      <div>
        <Row>
          <Column>
            <h2>create react app</h2>
            <p>
              Jednym z najczęstszych zarzutów, z jakimi początkowo borykał się React była znacząca ilość pracy, jaką developerzy musieli poświęcić na przygotowanie środowiska pracy - dobór pakietów, konfiguracja babel, webpack etc. Odpowiedzią na to był wysyp nieoficjalnych boilerplate udostępnianych jako pakiety npm lub repozytoria git.
            </p>
            <p>
              <b>create react app</b> to oficjalny boilerplate przygotowany przez zespół Facebook do tworzenia aplikacji React. Od typowych boilerplate odróżnia go:
            </p>  
            <ul>
              <li>sposób instalacji - cra instaluje się globalnie w naszym systemie i pozwala na tworzenie nowych projektów za pomocą jednej komendy</li>
              <li>ukrycie konfiguracji - pliki konfiguracyjne przechowywane są w katalogu create-react-app, nie katalogu aplikacji, przez co mamy pewność, że nie wprowadzimy w nich przypadkowych zmian i projekt stworzony u jednego developera zadziała bez problemów u innego developera</li>
              <li>mniej dependencji - w teorii nasz projekt potrzebuje tylko create-react-app jako zależność, dzięki czemu aktualizując naszą globalną instalację CRA automatycznie aktualizujemy nasz projekt</li>
            </ul>
            <p>
              Ukrycie konfiguracji pozwala nam na zapobieganie przypadkowym zmianom w plikach konfiguracyjnych, ale jednocześnie uniemożliwia celowe zmiany. Jeżeli musimy dodać jakąś brakującą funkcjonalność - do dyspozycji pozostaję nam mechanizm ejectowania (<b>npm run eject</b>) który "wypakuje" nam wszystkie pliki do katalogu naszego projektu, jednak tracimy możliwość aktualizowania projektu wraz z CRA.
            </p>
          </Column>
        </Row>     
        <Row>
          <Column><h3>instalacja</h3></Column>
          <Column width={6}>
            <p>
              Aby rozpocząć, zainstalujmy create-react-app globalnie wywołując komendę:<br />
              <code>npm install create-react-app --global</code>
            </p>   
            <p>
              Kiedy proces zakończy się, powinniśmy mieć możliwość uruchomienia nowej komendy - <code>create-react-app</code>. Jeżeli po wywołaniu w/w komendy otrzymasz komunikat informujący o braku programu, uruchom nowe okno powłoki.
            </p>       
            <p>
              Możemy teraz utworzyć nasz nowy projekt za pomocą komendy:<br />
              <code>create-react-app nazwa-katalogu</code><br />
              Należy pamiętać, że nazwa katalogu nie może pokrywać się z nazwą instalowanych w nim pakietów npm, dlatego nie używajmy naz typu "react" etc.
            </p>
          </Column>          
          <Column width={6}>
            <Example>{`
              λ npm install create-react-app --global
              + create-react-app@1.4.3
            `}</Example>
            <p><small>Instalacja create-react-app jako pakiet globalny</small></p>
            <Example>{`
              λ create-react-app react-tweetorial
              
              Creating a new React app in D:\Praca\Projekty\react-tweetorial.
              
              Installing packages. This might take a couple of minutes.
              Installing react, react-dom, and react-scripts...            
              // ...
              Success! Created react-tweetorial at D:\Praca\Projekty\react-tweetorial          
              Inside that directory, you can run several commands:                             
                                                                                               
                yarn start                                                                     
                  Starts the development server.                                               
                                                                                               
                yarn build                                                                     
                  Bundles the app into static files for production.                            
                                                                                               
                yarn test                                                                      
                  Starts the test runner.                                                      
                                                                                               
                yarn eject                                                                     
                  Removes this tool and copies build dependencies, configuration files         
                  and scripts into the app directory. If you do this, you can’t go back!       
                                                                                               
              We suggest that you begin by typing:                                             
                                                                                               
                cd react-tweetorial                                                            
                yarn start                                                                     
                                                                                               
              Happy hacking!                                                                                 
            `}</Example>
            <p><small>Przygotowanie nowego projektu</small></p>
          </Column>
        </Row>
        <Row>
          <Column><h3>uruchomenie</h3></Column>
          <Column width={6}>
            <p>Po utworzeniu nowego projektu możemy od razu uruchomić go przechodząc do katalogu projektu i wywołując komendę `<code>npm start</code>`</p>
            <p>
              W terminalu pojawi się informacja o uruchomionym serwerze a strona projektu otworzy się automatycznie w domyślnej przeglądarce systemowej. Jeżeli tak się nie stało, ręcznie otwórzmy domyślny adres <a href="http://localhost:3000">http://localhost:3000</a>
            </p>
          </Column>          
          <Column width={6}>
            <Example>{`
              λ cd react-tweetorial
              λ npm start

              Compiled successfully!
              
              You can now view react-tweetorial in the browser.
              
                Local:            http://localhost:3000/
                On Your Network:  http://192.168.1.27:3000/
              
              Note that the development build is not optimized.
              To create a production build, use yarn build.              
            `}</Example>
            <p>
              <small>Przykładowy plik konfiguracyjny Webpack, zapewniający transpilację kodu JS oraz LESS.</small>
            </p>
          </Column>
        </Row>   
        <Row>
          <Column><h3>struktura projektu</h3></Column>
          <Column width={6}>
            <p>
              W katalogu projektu utworzone zostało kilka plików i folderów, są to:
            </p>         
            <ul>
              <li>node_modules - wszystkie używane przez projekt moduły</li>
              <li>package.json - plik zawierające podstawowe informacje o naszym projekcie jak jego nazwa, lista pakietów etc.</li>
              <li>yarn.lock (lub package-lock.json) - pliki określające dokładne wersje pobranych pakietów, dzięki czemu ponowna instalacja nie pobierze "przypadkiem" nowszych</li>
              <li>public - katalog zawierający "statyczne" zasoby projektu (jak ikona, manifest i plik index.html)</li>
              <li>src - katalog ze źródłem naszej aplikacji</li> 
            </ul>
          </Column>          
          <Column width={6}>
            <Example>{`
              λ ls -la
              total 729
              -rw-r--r-- 1 btm 197610    285 Nov  8 22:26 .gitignore
              -rw-r--r-- 1 btm 197610 108987 Nov  8 22:26 README.md
              drwxr-xr-x 1 btm 197610      0 Nov  8 22:30 node_modules
              -rw-r--r-- 1 btm 197610    353 Nov  8 22:26 package.json
              drwxr-xr-x 1 btm 197610      0 Nov  8 22:26 public
              drwxr-xr-x 1 btm 197610      0 Nov  8 22:26 src
              -rw-r--r-- 1 btm 197610 234792 Nov  8 22:26 yarn.lock
            `}</Example>
            <p>
              <small>Przykładowe podsumowanie znalezionych błedów</small>
            </p>
          </Column>
        </Row>
        <Navigate prev={this.getPrev(this.props.section)} next={{title:'Lekcja 2', url: '/lekcja/lekcja2/wprowadzenie-do-react'}} />
      </div>      
    )      
  }

  render() {
    if(this.props.section) {
      const section = 'render' + this.props.section.split('-').reduce((acc, item, index) => {
        return acc.concat(`${item.substr(0, 1).toUpperCase()}${item.substr(1)}`);
      }, []).join('')
    
      return this[section]()
    }

    else return this.renderPodstawowePojecia();
  }
}