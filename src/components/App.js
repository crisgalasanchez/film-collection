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

  componentDidMount() { 
    //users to mock sessionStorage
    sessionStorage.setItem('users', JSON.stringify({
      'lola@gmail.com':'lola',
      'maria@gmail.com':'maria',
      'ana@gmail.com':'ana'
    }));
    //recover favorite from the localStorage
    let user = sessionStorage.getItem('userLogged');
    const listFromLocalStorage = JSON.parse(localStorage.getItem(user));
    if (listFromLocalStorage !==  null) {
      this.setState({ 
        favoriteList: listFromLocalStorage
      });
    }
  };
  
  callApi(search) {
    const URL = 'https://www.omdbapi.com/?apikey=f12ba140&s=';
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
    let user = sessionStorage.getItem('userLogged');
    let list = JSON.parse(localStorage.getItem(user));
    this.setState({
      favoriteList : list
    });
  }

  addInLocalStorage(film){
    let list;
    let user = sessionStorage.getItem('userLogged');
    if(localStorage.getItem(user) !== null){
      list = JSON.parse(localStorage.getItem(user));
    }else{
      list = [];
    }
    if (!list.some(e => e.imdbID === film.imdbID)) {
      list.push(film);
    }
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

  updateLoginState(newStateLogged){
    if(this.state.logged !== newStateLogged){
      this.setState({
        logged : newStateLogged
      });
    }
  }

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
              <Header 
                updateLoginState={this.updateLoginState}
                logged={this.state.logged}/> 
              <Nav/> 
              <Filters 
                handleSearch={this.handleSearch}
                searchValue={this.state.searchValue}/>
              <Collection
                filmList={this.state.filmList}
                favoriteHandler={this.updateLocalStorage}
                favoriteList={this.state.favoriteList}
                logged={this.state.logged}/>
              </div>
            : <div>
                <Header 
                  updateLoginState={this.updateLoginState}
                  logged={this.state.logged}/> 
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
              <Header 
                updateLoginState={this.updateLoginState}
                logged={this.state.logged}/> 
              <Nav/> 
              <Collection
                 filmList={this.state.favoriteList}
                 favoriteHandler={this.updateLocalStorage}
                 favoriteList={this.state.favoriteList}
                 logged={this.state.logged}/> 
              </div>
            : <div>
                <Header 
                  updateLoginState={this.updateLoginState}
                  logged={this.state.logged}/> 
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

