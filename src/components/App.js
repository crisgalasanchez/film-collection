import React, { Component } from "react";
import Info from "./Info";
import Header from "./Header";
import Collection from "./Collection";
import { Route, Switch } from "react-router-dom"; 
import Filters from './Filters.js';
import NoFilms from './NoFilms.js';
import Nav from './Nav.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filmList: [],
      favoriteList: [],
      filmData:{},
      searchValue: "",
      logged : false
    };

    this.callApi = this.callApi.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.addInLocalStorage = this.addInLocalStorage.bind(this);
    this.removeInLocalStorage = this.removeInLocalStorage.bind(this);
    this.updateLoginState = this.updateLoginState.bind(this);
  }
  
  componentWillMount() { 
    //users to mock sessionStorage
    sessionStorage.setItem('users', JSON.stringify({
      'lola@gmail.com':'lola',
      'maria@gmail.com':'maria',
      'ana@gmail.com':'ana'
    }));
  };
  // Rescatar datos de LS (si hay) o preparar llamada a la API

  componentDidMount() { 
    let user = sessionStorage.getItem('userLogged');
    const listFromLocalStorage = JSON.parse(localStorage.getItem(user));
    if (listFromLocalStorage !==  null) {
      this.setState({ 
        favoriteList: listFromLocalStorage
      });
    }
  };
  
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
            searchValue : search,
            filmList: []
          }); 
        }
    });
  }
  
  //Save data in Local Storage
  updateLocalStorage(action, id) {
    if(action === 'remove'){
      this.removeInLocalStorage(id);
    }else{
      this.state.filmList.map((film) =>{
        if(film.imdbID === id){
          this.addInLocalStorage(film);        
        }
      });
    }
    //localStorage.setItem("favorite-list", JSON.stringify(this.state.filmList));
  }

  addInLocalStorage(film){
    let list;
    let user = sessionStorage.getItem('userLogged');
    if(localStorage.getItem(user) !== null){
      list = JSON.parse(localStorage.getItem(user));
    }else{
      list = [];
    }
    list.push(film);
    localStorage.setItem(user, JSON.stringify(list));
  }
 
  removeInLocalStorage(id){
    let user = sessionStorage.getItem('userLogged');
    let list = JSON.parse(localStorage.getItem(user));
    list.map((film, index) =>{
      if(film.imdbID === id){
        list.splice(index, 1);
      }
    });
    localStorage.setItem(user, JSON.stringify(list));
  }

  updateLoginState(state){
    if(this.logged != state){
      this.setState({
        logged : state
      });
    }
  }

  /* // select the correct list
  selectListToPrint() {
    const { favoriteList, filmList, searchValue } = this.state;
    return !searchValue ? filmList : favoriteList;
  } 
 // this.props.isFavorite?" active":""
 createArray(filmData){
  const { counter, filmList } = this.state;
  filmList[counter] = filmData;
  this.saveDataInLocalStorage(filmList);
}

 */
  //Input value event and filter favorite
  handleSearch(e) {
    let search = e.target.value.toLowerCase();
    if (search !== "") {
      this.callApi(search)
    }else{
      this.setState({
        searchValue: search
      });
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/"
          render={() => { 
            return this.state.filmList.length !== 0
            ? <div>
              <Header updateLoginState={this.updateLoginState}/> 
              <Nav/> 
              <Filters 
                handleSearch={this.handleSearch}
                searchValue={this.state.searchValue}/>
              <Collection
                filmList={this.state.filmList}
                favoriteHandler={this.updateLocalStorage}
                favoriteList={this.state.favoriteList}
                />
              </div>
            : <div>
                <Header updateLoginState={this.updateLoginState}/> 
                <Nav/> 
                <Filters 
                    handleSearch={this.handleSearch}
                    searchValue={this.state.searchValue}/>
              </div>
                    
          }}
        />
        <Route exact path="/favorite"
          render={() => { 
            return this.state.favoriteList.length !== 0
            ? <div>
              <Header updateLoginState={this.updateLoginState}/> 
              <Nav/> 
              <Collection
                 filmList={this.state.favoriteList}
                 favoriteHandler={this.updateLocalStorage}
                 favoriteList={this.state.favoriteList}
                /> 
              </div>
            : <div>
                <Header updateLoginState={this.updateLoginState}/> 
                <Nav/> 
                <NoFilms/> 
              </div>
                    
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

