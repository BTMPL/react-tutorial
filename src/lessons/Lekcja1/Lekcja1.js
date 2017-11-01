import React from "react";
import PropTypes from "prop-types";
import Navigate from "../../common/Navigate/Navigate";
import { Row, Column } from "../../common/Layout/Layout";
import Example from "./../../common/example/Example";

export const title = "Lekcja 1 - Podstawowe pojęcia, konfiguracja środowiska pracy";

export default class Lesson extends React.Component {

  static propTypes = {
    section: PropTypes.string
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
        <Navigate prev="/lekcja/intro" next="/lekcja/lekcja1/srodowisko-pracy" />
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
        <Navigate prev="/lekcja/lekcja1/podstawowe-pojecia" next="/lekcja/lekcja1/narzedzia-wspomagajace" />
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
        <Navigate prev="/lekcja/lekcja1/srodowisko-pracy" next="/lekcja/lekcja1/create-react-app" />
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
    
    return <div>Lesson 2</div>
  }
}