import React, { Component } from 'react';
import './login.css';
import axios from 'axios';
import { IntlProvider } from 'react-intl';
import { FormattedMessage } from "react-intl";


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
	  password: "",
	  
	  isOpenUser: false,
	  isOpenPass: false,

	  lang:"vi",
	  message: {
		  vi: {
			  'project.title' : "Đăng nhập trang quản lý cơ sở vật chất",
			  'rememberme.title' : "Remember me",
			  'login.title' : "Đăng nhập",
			  'username.title' : "Tên của bạn là gì ?",
			  'password.title' : "Mật khẩu của bạn là gì ?"
		  },
		  ja: {
			  'project.title' : "ダナン工科大学の施設管理ページにログイン",
			  'rememberme.title' : "ログイン情報を記憶する",
			  'login.title' : "ログイン",
			  'username.title' : "ユーザー名は何ですか？",
			  'password.title' : "パスワードは何ですか？"
			  
		  }
	  }
    }
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
	this.handleChangePassword = this.handleChangePassword.bind(this);
	this.handleChangeOpenUser = this.handleChangeOpenUser.bind(this);
	this.handleChangeCloseUser = this.handleChangeCloseUser.bind(this);
	this.handleChangeOpenPass = this.handleChangeOpenPass.bind(this);
	this.handleChangeClosePass = this.handleChangeClosePass.bind(this);
    // this.login = this.login.bind(this);
  }
  
  handleChangePassword(event) {
     this.setState({password: event.target.value});
     console.log("change pw")
  }
  
  handleChangeUsername(event) {
     this.setState({
		username: event.target.value
	});
  }
  handleChangeOpenUser(){
	this.setState({
		isOpenUser: true
	});
  }
  handleChangeCloseUser(){
	this.setState({
		isOpenUser: false
	});
  }
  handleChangeOpenPass(){
	this.setState({
		isOpenPass: true
	});
  }
  handleChangeClosePass(){
	this.setState({
		isOpenPass: false
	});
  }
  


  // login() {
  //    var form = new FormData()
  //     form.append("username", this.state.username)
  //     form.append("password", this.state.password)
  //     console.log(form.get("username"))
  //     console.log(form.get("password"))
  //     axios({
  //         method:'post',
  //         url:'/api/login',
  //         headers: { 'content-type': 'application/x-www-form-urlencoded' },
  //         data: form,
  //         // headers: {'Content-Type': 'multipart/form-data' }
  //       })
  //       .then(function (response) {
  //           console.log(response)
  //           var d = new Date();
  //           d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
  //           var expires = "expires="+d.toUTCString();
  //           window.document.cookie = "_token_jwt=" + response.data.token + ";" + expires + ";path=/";
  //           window.location.reload();
  //         });
  // }
	handleLang = (text) => {
		this.setState(state => ({ lang: text}));
	};

  render() {
		console.log("isOpenUser: " , this.state.isOpenUser)
    return (
		<IntlProvider 
			locale={this.state.lang} 
			messages={this.state.message[this.state.lang]}	
		>
			<div className="form-container flip">
				<form id="login" action="/api/login" method="POST" className="login-form">
				<h3 className="title">
					<FormattedMessage id="project.title" defaulMesage="Quản Lý Cơ Sở Vật Chât" />
				</h3>
				<div className="form-group" id="username">
					<input className="form-input"  name="username" value={this.state.username} onChange={this.handleChangeUsername} onFocus={this.handleChangeOpenUser} onBlur={this.handleChangeCloseUser} tooltip-class="username-tooltip" placeholder="Username" id="email"  required={true}></input>
					{this.state.isOpenUser
					?
						<span id="username-tool"className="tooltip username-tooltip">
							<FormattedMessage id="username.title" defaulMesage="What's your username?" />	
						</span>
					:''
					}
					
				</div>
				<div className="form-group" id="password">
					<input  type="password" name="password" value={this.state.password} onChange={this.handleChangePassword} onFocus={this.handleChangeOpenPass} onBlur={this.handleChangeClosePass} className="form-input" tooltip-class="password-tooltip" placeholder="Password" required={true}></input>
					{this.state.isOpenPass
					?
						<span className="tooltip password-tooltip">
							<FormattedMessage id="password.title" defaulMesage="What's your password?" />	
						</span>
					:''
					}
				</div>
				<div className="form-group">
					<button type="submit" value="LOGIN" id="loginbtn" className="login-button">
						<FormattedMessage id="login.title" defaulMesage="Login" />	
					</button>
					<input className="remember-checkbox" type="checkbox"></input>
					<p className="remember-p">
						<FormattedMessage id="rememberme.title" defaulMesage="Remember me" />	
					</p>

					
				</div>

				<a className="form-group remember-p" role="button" onClick={ ()=> this.handleLang('ja')}> 日本語 </a> |
				<a className="form-group remember-p" role="button" onClick={ ()=> this.handleLang('vi')}> Tiếng Việt</a> <br />

				</form>
				<div className="loading">
				<div className="loading-spinner-large" ></div>
				<div className="loading-spinner-small" ></div>
				</div>
				<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
				<script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js'></script>
				<script src='https://code.jquery.com/jquery-2.1.4.min.js'></script>

				
			</div>
		</IntlProvider>
    );
  }                    
}