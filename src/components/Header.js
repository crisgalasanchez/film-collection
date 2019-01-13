import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlayFilm from '../images/playfilm.jpg';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged : false
    };
    this.validateLogin = this.validateLogin.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    if( sessionStorage.getItem('userLogged') !== null ){
      this.login();
    }
  }

  validateLogin(){
    let user = document.getElementById('inputEmail');
    let password = document.getElementById('inputPassword');
    let usersError = document.querySelector('.users__error');

    if (user.value === "" || password.value === "") {
      usersError.innerHTML ='* You must entry user and password';
      usersError.style.display='block';
    } else {
      let sessionUser = JSON.parse(sessionStorage.getItem("users"));
      if (sessionUser[user.value] === undefined) {
        usersError.innerHTML ='* User or passsword wrong';
        usersError.style.display='block';
      } else if(sessionUser[user.value] !== password.value){
          usersError.innerHTML ='* User or passsword wrong';
          usersError.style.display='block';
      } else {
        this.login();
      }
    }
  }

  login(){
    // TODO let logoutButton = document.getElementById('logoutButton');
    // TODO let userName = document.getElementById('userName');
    let user = document.getElementById('inputEmail');
    let password = document.getElementById('inputPassword');
    let loginButton = document.getElementById('loginButton');
    // TODO logoutButton.style.display='block';
    // TODO userName.style.display='block';
    user.style.display='none';
    password.style.display='none';
    loginButton.style.display='none';
    sessionStorage.setItem('userLogged', user.value);
    
    let usersError = document.querySelector('.users__error');
    usersError.style.display='none';
    this.props.updateLoginState(true);
  }

  logout(){
    let logoutButton = document.getElementById('logoutButton');
    // TODO let userName = document.getElementById('userName');
    let user = document.getElementById('inputEmail');
    let password = document.getElementById('inputPassword');
    let loginButton = document.getElementById('loginButton');
    logoutButton.style.display='none';
    // TODO userName.style.display='none';
    user.style.display='block';
    password.style.display='block';
    loginButton.style.display='block';

    sessionStorage.removeItem('userLogged');
    this.props.updateLoginState(false);
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
              <form className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
                  {/* <p class="text-info">Email@gmail.com</p> */}
                  <input type="text" className="form-control mb-2 mb-sm-0 mr-sm-2  input__login" id="inputEmail" placeholder="Username"/>
                  <input type="password" className="form-control input__login" id="inputPassword" placeholder="Password"></input>
                </div>
                <button type="submit" className="btn btn-dark ml-2 ml-sm-0 mb-sm-2 font-weight-bold" id="loginButton" onClick={this.validateLogin}>Login</button>
                {/* <button type="submit" className="btn btn-dark ml-2 ml-sm-0 mb-sm-2 font-weight-bold" id="logoutButton" onClick={this.validateLogin}>Logout</button> */}
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