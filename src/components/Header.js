import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlayFilm from '../images/playfilm.jpg';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged : false
    };
    this.login = this.login.bind(this);
    this.showLogged = this.showLogged.bind(this);
    this.logout = this.logout.bind(this);
    this.hideLogged = this.hideLogged.bind(this);
    this.showError = this.showError.bind(this);
    this.hideError = this.hideError.bind(this);
    this.showElement= this.showElement.bind(this);
    this.hideElement = this.hideElement.bind(this);
  }

  componentDidMount(){
    if( sessionStorage.getItem('userLogged') !== null ){
      this.showLogged();
    }
  }

  login(){
    let user = document.getElementById('inputEmail');
    let password = document.getElementById('inputPassword');

    if (user.value === "" || password.value === "") {
      this.showError('* You must entry user and password');
    } else {
      let sessionUser = JSON.parse(sessionStorage.getItem("users"));
      if (sessionUser[user.value] === undefined) {
        this.showError('* User or passsword wrong');
      } else if(sessionUser[user.value] !== password.value){
        this.showError('* User or passsword wrong');
      } else {
        sessionStorage.setItem('userLogged', user.value);
        this.showLogged();
        this.props.updateLoginState(true);
      }
    }
  }

  showLogged(){
    let logoutButton = document.getElementById('logoutButton');
    let userLogged = sessionStorage.getItem('userLogged');
    let userName = document.getElementById('userName');
    userName.classList.add('d-block');
    userName.innerHTML=userLogged;
    this.showElement(logoutButton);
    let user = document.getElementById('inputEmail');
    this.hideElement(user);
    let password = document.getElementById('inputPassword');
    this.hideElement(password);
    let loginButton = document.getElementById('loginButton');
    this.hideElement(loginButton);
    this.hideError();
  }

  logout(){
    sessionStorage.removeItem('userLogged');
    this.hideLogged();
    this.props.updateLoginState(false);
  }

  hideLogged(){
    let logoutButton = document.getElementById('logoutButton');
    this.hideElement(logoutButton);
    let userName = document.getElementById('userName');
    userName.classList.remove('d-block');
    let user = document.getElementById('inputEmail');
    this.showElement(user);
    let password = document.getElementById('inputPassword');
    this.showElement(password);
    let loginButton = document.getElementById('loginButton');
    this.showElement(loginButton);
  }

  showError(message){
    let usersError = document.querySelector('.users__error');
    usersError.innerHTML = message;
    if(usersError.classList.contains('d-none')) {
      usersError.classList.remove('d-none')
      usersError.classList.add('d-block');
    }
  }

  hideError(){
    let usersError = document.querySelector('.users__error');
    usersError.innerHTML = '';
    if(usersError.classList.contains('d-block')) {
      usersError.classList.remove('d-block')
      usersError.classList.add('d-none');
    }
  }

  showElement(element){
    if(element.classList.contains('d-none')) {
      element.classList.remove('d-none')
      element.classList.add('d-block');
    }
  }

  hideElement(element){
    if(element.classList.contains('d-block')) {
      element.classList.remove('d-block')
      element.classList.add('d-none');
    }
  }
      
  render() { 
      return ( 
        <div className="header d-flex flex-column flex-md-row align-items-center justify-content-md-between">
          <div className="d-flex align-items-center ">
            <Link
              to={'/'}>
              <img className="icon__film" src={PlayFilm} alt="Home" />
            </Link>
            <h1 className="main__title pl-3 pt-3">Find your movie...</h1>
          </div>
          <div className="d-flex flex-column">
            <form className="form-inline mt-sm-1">
              <div className="form-group mx-sm-3 mb-2">
                <p class="font-weight-bold mb-1" id="userName"></p>
                <input type="text" className="form-control mb-2 mb-sm-0 mr-sm-2  input__login d-block" id="inputEmail" placeholder="Username"/>
                <input type="password" className="form-control input__login d-block" id="inputPassword" placeholder="Password"></input>
              </div>
              <button className="btn btn-dark ml-2 ml-sm-3 mb-sm-2 font-weight-bold d-block" id="loginButton" onClick={this.login}>Login</button>
              <button className="btn btn-dark ml-2 ml-sm-0 mb-sm-2 font-weight-bold d-none" id="logoutButton" onClick={this.logout}>Logout</button>
            </form>
            <div>
              <p className="text-danger users__error "></p>
            </div>
          </div>
        </div>
        );
  }
}
 
export default Header; 