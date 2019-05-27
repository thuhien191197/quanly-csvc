import React from 'react';
import Logo from '../../../images/Logo.png'
import { AppBar, Toolbar, Typography, Button,  } from '@material-ui/core';



const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

export default props =>
        <div style ={styles.root}>
            <AppBar position="absolute" >
                <Toolbar>
                    <img width="65" height="65" alt="abc" src={Logo}/>
                   
                      <Typography variant="h7" color="inherit" style={styles.grow}>
                            TRƯỜNG ĐẠI HỌC BÁCH KHOA <br/>
                            PHÒNG CƠ SỞ VẬT CHẤT
                        </Typography>
                        
                    {/* <Button color="inherit">Login</Button> */}
					<a href="/">Login</a>
                </Toolbar>
            </AppBar>
        </div>




