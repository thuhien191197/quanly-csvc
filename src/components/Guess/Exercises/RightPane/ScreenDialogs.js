import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Avatar,
    List,
    ListItem,
    ListItemText,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    ListItemAvatar,
    ListItemSecondaryAction,
    Slide,
} from "@material-ui/core";
import {FileCopy, Close ,CloudDownload, Visibility} from "@material-ui/icons";
import BienBanBanGiao from '../Store/Mau_CSVC_BienBanBanGiao.doc';
import BienBanKienTraThucTrangThietBi from '../Store/Mau_CSVC_BienBanKiemTraThucTrangThietBi.doc';
import KeHoachMuaSamVatTu from '../Store/Mau_CSVC_KeHoachMuaSamVatTu.doc';
import KeHoachSuaChuaNangCap from '../Store/Mau_CSVC_KeHoachSuaChuaNangCapCSVC.doc'
import MauSoNhatKySuDungThietBi from '../Store/Mau_CSVC_Mau_So_nhat_ky_su_dung_thiet_bi.doc'

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};
const store = [
    {
        name: 'Biên Bản Bàn Giao',
        address: BienBanBanGiao,
    },
    {
        name: 'Biên Bản Kiểm Tra Thiết Bị',
        address: BienBanKienTraThucTrangThietBi
    },
    {
        name: 'Kế Hoạch Mua Săm Vật Tư',
        address: KeHoachMuaSamVatTu
    },
    {
        name: 'Kế Hoạch Sửa Chửa Nâng Cấp',
        address: KeHoachSuaChuaNangCap
    },
    {
        name: 'Mẩu Số Nhật Ký Sử Dụng Thiết Bị',
        address: MauSoNhatKySuDungThietBi
    },


];

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ScreenDialogs extends React.Component {
    state = {
        open: false,
        dense: false,
        secondary: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { dense, secondary } = this.state;


        return (
            <div>
                <ListItem button onClick={this.handleClickOpen}>
                    <Avatar>
                        <FileCopy />
                    </Avatar>
                    <ListItemText primary="Biểu Mẩu" />
                </ListItem>

                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <Close />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                Biểu Mẩu
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div >
                        <List dense={dense}>
                            {store.map ( doc =>(
                                <ListItem key={doc.name}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FileCopy />
                                        </Avatar>
                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={doc.name}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="View">
                                            <Visibility />
                                        </IconButton>
                                        <IconButton aria-label="Download" href={doc.address} download>
                                            <CloudDownload />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Dialog>
            </div>
        );
    }
}

ScreenDialogs.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScreenDialogs)