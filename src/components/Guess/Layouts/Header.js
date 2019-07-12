import React from 'react';
import Logo from '../../../images/Logo.png'
import './Header.css';
import { AppBar, Toolbar, Typography, Button,  } from '@material-ui/core';
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
		flexGrow: 1,
		marginLeft: '10px'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Header extends React.Component {
    state = {
       
    };

    render() {
        return (
            <div style ={styles.root} className="root">
            <AppBar position="absolute" >
                <Toolbar>
                    <img width="65" height="65" alt="abc" src={Logo}/>
                   
                      	<Typography variant="h7" color="inherit" style={styles.grow} className="uppercase">
							<FormattedMessage  id="school.title" defaulMesage="TRƯỜNG ĐẠI HỌC BÁCH KHOA" /><br/>
							<FormattedMessage  id="page.title" defaulMesage="PHÒNG CƠ SỞ VẬT CHẤT" /><br/>
                        </Typography>
                        
					{/* <Button color="inherit">Login</Button> */}
					<div className="pull-right">
						<ul>
							<li className="rad-dropdown lang" >
								<a role="button" onClick={ ()=> this.props.handleLang('ja')}> JA </a> |
								<a role="button" onClick={ ()=> this.props.handleLang('vi')}> VI </a>
							</li>
							
							<li className=" no-color">
								<a href="/">
									<FormattedMessage  id="login.title" defaulMesage="Login" />
								</a>
							</li>
						</ul>
					</div>
                </Toolbar>
            </AppBar>
        </div>
        );
    }
}

export default withRouter(Header);


