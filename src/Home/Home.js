import React from "react";
import { Row, Column, Align } from "../common/Layout/Layout";

import { Link } from "react-router-dom";

import Styles from "./Home.less";

export default class Home extends React.Component {

  render() {
    return (
      <Row className={Styles.home}>
        <Column>
          <h2>Dlaczego warto zainwestować w naukę React?</h2>
          <p>
            Zarówno ilość developerów, jak i ofert pracy dla developerów React <b>rośnie praktycznie nieprzerwanie od 2013 roku</b> <sup><a href="http://www.reallyhyped.com/?keywords=reactjs" target="_blank">1</a></sup>. Pojawiają się kolejne dziedziny w, w których React ma zastosowanie - <b>React Native</b> (Android, iOS, Windows Mobile), <b>React Native for Windows</b>, <b>ReactVR</b> czy <b>Xbox</b> (przy użyciu Universal Windows Platform).            
          </p>
          <p>
            Stosunkowo niski "próg wejścia", całkowita kompatybilność wsteczna oraz duża i aktywna społeczność developerów, kontrybutorów i autorów niezależnych bibliotek sprawia, że React nie jest technologią, obok której można przejść obojętnie. <b>Brak unikalnego języka domenowego</b> (ang. domain specific language) <b>sprawia, że wiedza nabyta podczas nauki React przyda się również w innych projektach</b> - oznacza to, że inwestując czas w naukę React nie zmniejszamy szansy na zmianę technologii w której pracujemy w przyszłości.
          </p>
          <p>
            <b>React będzie doskonałym wyborem, wszędzie tam, gdzie celem jest wytworzenie rozbudowanego interfejsu użytkownika</b>, reagującego w czasie rzeczywistym na interakcję zarówno użytkownika jak i serwera.
          </p>
        </Column>
        <Column>
          <h2>Dlaczego właśnie ten kurs?</h2>
          <p>
            Swoją przygodę z React rozpocząłem w 2015 roku - od tego czasu ukończyłem już kilka komercyjnych produktów, z których korzystają setki tysięcy użytkowników.
          </p>
          <p>
            Duża część mojej pracy polega na wprowadzaniu nowych developerów do istniejących już zespołów, dbanie o przekazywanie i utrwalanie wiedzy oraz egzekwowanie dobrych praktyk. Jako moderator społeczności <a href="https://www.reactiflux.com/" target="_blank">Reactiflux</a>, <a href="https://www.meetup.com/pl-PL/meet-js-lodz/" target="_blank">meet.js łódź</a> oraz <a href="https://nodeschool.io/lodz/" target="_blank">NodeSchool Łódź</a> codziennie mam styczność z osobami o różnym stopniu wiedzy (zarówno z zakresu React jak i samego JavaScript) więc doskonale wiem, jakie błędy popełniane są najczęściej i na co należy zwrócić uwagę.
          </p>
          <p>
            Kurs przygotowany jest z myślą o osobach, które nie czują się jeszcze całkowicie pewnie w standardzie ES6 - wszelkie <b>nowe pojęcia są dokładnie opisane i wytłumaczone</b> zanim zaczniesz znajdywać je w kolejnych przykładach. Kurs jest także <b>aktualizowany na bieżąco</b> dzięki czemu masz pewność, że kod, który poznasz będzie bez problemu działał z aktualną wersją React i innych bibliotek.
          </p>          
        </Column>

        <Column>
          <Align center>
            <Link to="/lekcja/lekcja1/podstawowe-pojecia" className="button">Rozpocznij kurs</Link>
          </Align>         
        </Column>        

      </Row>
    )
  }
}