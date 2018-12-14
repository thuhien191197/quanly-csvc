import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Typography, Paper} from '@material-ui/core';

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
        <div>
            <Paper className={classes.root} >
                <Typography component="h3" variant="display1">
                    Trang Quản Lý Cơ Sở Vật Chất
                </Typography>
                <Typography component="p" variant="overline">
                    Đại Học Bách Khoa - Đại Học Đà Nẵng
                </Typography>
            </Paper>
        </div>
    )
}
Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Footer);