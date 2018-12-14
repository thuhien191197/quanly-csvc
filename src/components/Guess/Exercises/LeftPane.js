import React from 'react';
import {Tabs, Tab, Paper} from '@material-ui/core';
import LeftBody from './LeftPane/LeftNew'
import Typography from "@material-ui/core/es/Typography/Typography";
import LeftNotification from "./LeftPane/LeftNotification";



class LeftPane extends React.Component {
    state = {
        value: 0,
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };


    render() {

        const {value} = this.state;

        return (

            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden',}}>
                <Paper style={{flexGrow: 1, margin: 10, marginBottom: 0,}}>
                    <Tabs

                        value={value}
                        onChange={this.handleChange}

                        indicatorColor="primary"
                        textColor="primary"

                    >
                        <Tab label="Tin Tức"/>
                        <Tab label="Thông Báo"/>
                        <Tab label="Thông Tin"/>
                    </Tabs>
                </Paper>
                {value === 0 && <LeftBody/>}
                {value === 1 && <LeftNotification/>}
                {value === 2 && <Typography> a </Typography>}
                <br/>

            </div>
        )
    }
}
export default LeftPane;