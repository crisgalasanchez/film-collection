import React, { Component } from "react";
/* import Main from "./Main";*/
import Info from "./Info";
import Collection from "./Collection";
import { Route, Switch } from "react-router-dom"; 

import Filters from './Filters.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filmList: [],
      filteredList: [],
      //filmInfoSelected:{},
      searchValue: ""
    };

    this.callApi = this.callApi.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    // this.selectListToPrint = this.selectListToPrint.bind(this);
    // this.saveDataInState = this.saveDataInState.bind(this);
    // this.saveDataInLocalStorage = this.saveDataInLocalStorage.bind(this);
    // this.addFavourite = this.addFavourite.bind(this);
  }

  //1. Rescatar datos de LS (si hay) o preparar llamada a la API

  /*componentDidMount() { 
     const listFromLocalStorage = JSON.parse(localStorage.getItem("film-list"));
     if (listFromLocalStorage.length > 0) {
      console.log("LS");
      this.setState({ 
        filmList: listFromLocalStorage
      });
    } else {
      this.callApi();
    };  
    
  };*/
  
  // 2. Llamada a la API y construcción de objeto con datos.

  callApi(search) {
    const URL = 'http://www.omdbapi.com/?apikey=f12ba140&s=';
    fetch(`${URL}${search}&type=movie`)
      .then(response => response.json())
      .then(json => {
        if(json.Error === undefined){
          this.setState({
            searchValue : search,
            filmList : json.Search
          }); 
        }else{
          this.setState({
            searchValue : search
          }); 
        }
    });
  }
  //3. Meter datos de la API en el estado

 /*  saveDataInState() {
    this.setState({
        filmList: arrayFilms
      },
      this.saveDataInLocalStorage()
    );
  } */

  //4. Guardar datos en el Local Storage

/*   saveDataInLocalStorage() {
    localStorage.setItem("film-list", JSON.stringify(arrayFilms));
  }
 */
  //5. Controlar el evento del input: cuando escribes, se filtra la lista inicial y los filtrados se meten en el array filteredList del estado.

  handleSearch(e) {
    let search = e.target.value.toLowerCase();
    // this.setState({
    //   searchValue: search,
    //   filteredList: this.state.filmList.filter(film => {
    //     return film.Title.includes(search);
    //   })
    // });
    if (search !== "") {
      this.callApi(search)
    } 
   
  }

  //6. Seleccionar la listaque renderizar: la inicial o la filtrada

/*   selectListToPrint() {
    const { filteredList, filmList, searchValue } = this.state;
    return !searchValue ? filmList : filteredList;
  } */
 
  render() {
   
   
    return (
      <Switch>
        <Route exact path="/"
          render={() => {
            /*return this.state.filmList.length > 0 
            ? <Main
                handleSearch={this.handleSearch}
                filmList={this.selectListToPrint}
                searchValue={this.state.searchValue}
              /> 
            : <Loading />;*/
            
            return this.state.filmList.length !== 0
            ? <div>
              <Filters 
                handleSearch={this.handleSearch}
                searchValue={this.state.searchValue}/>
              <Collection
                 filmList={this.state.filmList}
                /> 
              </div>
            : <Filters 
                handleSearch={this.handleSearch}
                searchValue={this.state.searchValue}/>
          }}
        />
        <Route path="/film/:imdbID"
          render={props => (
            <Info match={props.match} filmList={this.state.filmList} />
          )}
        />
      </Switch>
    ); 
  };
};

export default App;

