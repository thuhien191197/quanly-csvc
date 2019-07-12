import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Typography, Paper} from '@material-ui/core';
import { Gavel, Help, LocationOn, Call, Email} from '@material-ui/icons';
import { FormattedMessage } from "react-intl";


let imgUrl = 'https://png.pngtree.com/thumb_back/fh260/back_pic/00/15/30/4656e81f6dc57c5.jpg';
const styles = Footer => ({
    root: {
        ...Footer.mixins.gutters(),
        paddingTop: Footer.spacing.unit * 2,
        paddingBottom: Footer.spacing.unit * 16,
        backgroundImage: 'url(' + imgUrl + ')',
        margin: 10,
        backgroundSize: 'cover',
        overflow: 'hidden',
    },
});
function Footer(props) {
    const { classes } = props;

    return (
        <div >
             <Paper style={styles.PaperRight} style={{backgroundColor: '#0c5389'}} >
            <Typography variant="h6" style={{color: '#ffffff'}}   gutterBottom align="center" >
				<FormattedMessage  id="thongtinlienhe.title" defaulMesage="THÔNG TIN LIÊN HỆ" />
            </Typography>
            <Typography style={{color: '#ffffff'}} gutterBottom align="center"> 
				<FormattedMessage  id="page.title" defaulMesage="Phòng cơ sở vật chất" />,  
				<FormattedMessage  id="school.title" defaulMesage="Trường Đại học Bách Khoa Đà Nẵng" /><br/>
            </Typography>
            <Typography style={{color: '#ffffff'}} gutterBottom align="center">
                <LocationOn/>
				<FormattedMessage  id="diachi.title" defaulMesage="54 Nguyễn Lương Bằng, Quận Liên Chiểu, Thành phố Đà Nẵng" />
            </Typography>
            <Typography style={{color: '#ffffff'}} gutterBottom align="center">
                <Call/>
                +84.0236) 3740719
            </Typography>
            <Typography style={{color: '#ffffff'}} gutterBottom align="center">
                <Email gutterBottom align="center"/>
                csvc.dhbk@dut.udn.vn
            </Typography>
        </Paper>
        </div>
    )
}
Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Footer);