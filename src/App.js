import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    if (title.length === 2) {
      const handle = setTimeout(() => {
        fetch(`https://corona-api.com/countries/${title}`)
          .then((stream) => stream.json())
          .then((r) => setData(r.data));
      }, 500);
      return () => {
        clearInterval(handle);
      };
    }
  }, [title]);

  let name = "";
  let population = "";
  let updated_at = "";
  let confirmed = "";
  let recovered = "";
  let deaths = "";
  let today_confirmed = "";
  let today_deaths = "";

  if (data !== undefined) {
    name = data.name;
    population = data.population;
    updated_at = data.updated_at;
    confirmed = data.latest_data.confirmed;
    recovered = data.latest_data.recovered;
    deaths = data.latest_data.deaths;
    today_confirmed = data.today.confirmed;
    today_deaths = data.today.deaths;
  }
  console.log(data);
  return (
    <div className="App">
      <h1>CoronaVirus</h1>
      <h3> Վիճակագրական Տվյալներ</h3>
      <p>
        {" "}
        Ճշտեք ձեր նախընտրած երկրում համաճարակի վիճակագրական տվյալները,ներքևի
        դաշտում լրացնելով տվյալ երկրի կոդը։
      </p>
      <h6>Օրինակ՝ am(Հայաստան),ru(Ռուսաստան), ․․․</h6>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="statistical">
        <h2>- Երկիրը -</h2>
        <span>{name}</span>
        <hr />
        <h4>- Բնակչությունը -</h4>
        <span>{population}</span>
        <hr />
        <h4> - Հաստատված դեպքերի ընդհանուր քանակը - </h4>
        <span>
          <h6>{updated_at}</h6>
          {confirmed}
        </span>
        <hr />
        <h4>- Առողջացածները -</h4>
        <span>{recovered}</span>
        <hr />
        <h4>- Մահվան ելքերը -</h4>
        <span>{deaths}</span>
        <hr />
        <h4> - Հաստատված դեպքերի ընդհանուր քանակը այսօր - </h4>
        <span>
          <span>{today_confirmed}</span>
        </span>
        <h4>- Մահվան ելքերը այսօր -</h4>
        <span>{today_deaths}</span>
        <hr />
      </div>
      <div className="info">
        <h4> Հավելյալ տեղեկությունների համար ՝</h4>
        <a
          href="https://www.worldometers.info/coronavirus/"
          target="_blank"
          rel="noreferrer"
        >
          CoronaVirus Info
        </a>
      </div>
      <div className="my-info">
        <h5>
          {" "}
          © 2021 / Corona Statistical Information / All Rights Reserved.{" "}
        </h5>
      </div>
    </div>
  );
}

export default App;
