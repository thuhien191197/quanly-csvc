import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.login = this.login.bind(this);
  }
  
  handleChangePassword(event) {
     this.setState({password: event.target.value});
     console.log("change pw")
  }
  
  handleChangeUsername(event) {
     this.setState({username: event.target.value});
     console.log("change un")
  }

  login() {
		let formdata = new FormData();
		console.log(this.state.username, this.state.password)
      	formdata.append("username", JSON.stringify(this.state.username))
		formdata.append("password", JSON.stringify(this.state.password))
		console.log("formdatadata", formdata)
		axios({
          method:'post',
          url:'http://localhost:5000/login',
		  data: {
			username: this.state.username,
			password: this.state.password
			},
		headers: {
        'Content-Type': 'application/json'
    	}
        })
        .then(function(response) {
            console.log(response)
            var d = new Date();
            d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = "_token_jwt=" + response.data.token + ";" + expires + ";path=/";
            window.location.reload();
          });
  }

  render() {
    return (
      <div >
        <title />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="keywords" content="Existing Login Form Widget Responsive, Login Form Web Template, Flat Pricing Tables, Flat Drop-Downs, Sign-Up Web Templates, Flat Web Templates, Login Sign-up Responsive Web Template, Smartphone Compatible Web Template, Free Web Designs for Nokia, Samsung, LG, Sony Ericsson, Motorola Web Design" />
        <link href="css/popuo-box.css" rel="stylesheet" type="text/css" media="all" />
        <link rel="stylesheet" href="css/style.css" type="text/css" media="all" />
        <link href="//fonts.googleapis.com/css?family=Quicksand:300,400,500,700" rel="stylesheet" />
        <div className="w3layoutscontaineragileits">

          <div className="title">
            <h2 className="hLogin" >Login</h2>
          </div>
          <div className="component">
            <form id="login">
              <input className="userInput" type="text" name="user" placeholder="USERNAME" value={this.state.username} onChange={this.handleChangeUsername} required id="username" />
              <input className="userInput" type="password" name="password" placeholder="PASSWORD"value={this.state.password} onChange={this.handleChangePassword} required id="password" />
              <ul className="agileinfotickwthree">
                                                                                    <li>
                  <input type="checkbox" id="brand1" defaultValue />
                  <label className="lableInput" htmlFor="brand1" className="remmeberMe"><span />Remember me</label>
                  <a href="#">Forgot password?</a>
                </li>
              </ul>

              <div className="aitssendbuttonw3ls">
                <button className="loginInput" type="submit" value="LOGIN" id="loginbtn" className="button_Login" onClick={this.login}>
                  Login
                </button>
                <div className="clear" />
              </div>
            </form>

            <div className="contentLogin">
              <p>
              </p><h6 className="content_Right">Lưu ý</h6>
              <p>Trang này cho phép đăng nhập một lần đến nhiều hệ thống web ở trường Đại học Bách Khoa Đà Nẵng. Điều này có nghĩa là bạn chỉ đăng nhập một lần cho những hệ thống web đã đăng kí với hệ thống xác thực quản lý truy cập tập trung. <br />
                Vì lí do bảo mật hãy Thoát khỏi trình duyệt web  khi bạn kết thúc việc truy cập các dịch vụ đòi hỏi xác thực ! </p> <br />
              <h6 className="content_Right">Hỗ trợ kĩ thuật</h6>
              <p>Email : duong@gmail.com | ĐT : 09095738936</p>
              <p />
            </div>
          </div>
        </div>
      </div>
    );
  }                    
}