//IMPORTS

import "../styles/App.scss";
import adalabersList from "../data/adalabers.json";
import { useEffect, useState } from "react";
import callToApi from "../services/api";

//import { useState } from "react";

function App() {
  //CONSTANTES
  const [data, setData] = useState([]); //datos de las adalabers. Inicialmente el json. Ahora en fetch
  //función effect para fetch

  useEffect(() => {
    // Dentro de useEffect llamamos al API
    callToApi().then((response) => {
      // Cuando el API responde guardamos los datos en el estado para que se re-renderice el componente
      setData(response);
    });
    // Aquí ponemos un array vacío porque queremos que se llame al API solo la primera vez
  }, []);

  //FUNCIONES MANEJADORAS
  //variable de estado de la búsqueda de la usuaria
  const [search, setSearch] = useState("");
  //función para buscar
  const handleSearchChange = (ev) => {
    setSearch(ev.currentTarget.value);
  };
  //funciones para añadir una nueva adalaber
  const handleNewName = (ev) => {
    setName(ev.currentTarget.value);
  };
  const handleNewCounselor = (ev) => {
    setCounselor(ev.currentTarget.value);
  };

  const handleNewSpeciality = (ev) => {
    setSpeciality(ev.currentTarget.value);
  };
  //variables de estado para los inputs de crear nuevo contacto
  const [name, setName] = useState("");
  const [counselor, setCounselor] = useState("");
  const [speciality, setSpeciality] = useState("");

  //función manejadora del botón añadir una nueva Adalaber
  const handleClick = (ev) => {
    ev.preventDefault();
    const newAdalaber = {
      name: name,
      counselor: counselor,
      speciality: speciality,
    };
    setData([...data, newAdalaber]);
    setName("");
    setCounselor("");
    setSpeciality("");
  };
  //función para pintar la lista de adalabers recorriendo el array adalabersList(data), con map

  const htmlAdalaber = data.map((eachAdalaber, index) => {
    return (
      <tr key={index}>
        <td>{eachAdalaber.name}</td>
        <td>{eachAdalaber.counselor}</td>
        <td>{eachAdalaber.speciality}</td>
      </tr>
    );
  });
  //RETURN

  return (
    <div className="page">
      {/* header */}
      <header>
        <h1>Adalabers</h1>
        <form>
          <input
            type="search"
            name="search"
            placeholder="Ej.MariCarmen"
            onChange={handleSearchChange}
            value={search}
          />
        </form>
      </header>
      {/* main */}
      <main>
        <table>
          {/*Fila de cabecera */}
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tutora</th>
              <th>Especialidad</th>
            </tr>
          </thead>

          {/*Fin fila de cabecera */}
          <tbody>
            {/*Primera fila */}
            {htmlAdalaber}
            {/*Segunda fila */}
          </tbody>
        </table>
        <form>
          <h2>Añadir una Adalaber</h2>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nombre"
            onChange={handleNewName}
            value={name}
          ></input>
          <input
            type="text"
            name="counselor"
            id="counselor"
            placeholder="Tutora"
            onChange={handleNewCounselor}
            value={counselor}
          ></input>
          <input
            type="text"
            name="speciality"
            id="speciality"
            placeholder="Especialidad"
            onChange={handleNewSpeciality}
            value={speciality}
          ></input>
          <input
            type="submit"
            value="Añadir una nueva Adalaber"
            onClick={handleClick}
          ></input>
        </form>
      </main>
    </div>
  );
}

export default App;
