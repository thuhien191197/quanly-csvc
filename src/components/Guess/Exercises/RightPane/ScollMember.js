import React from 'react';
import {
    Button, Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions, ListItem,
    CardActionArea, CardMedia, CardContent, Typography, Avatar, ListItemText
} from "@material-ui/core";

import { Gavel, Help, LocationOn, Call, Email} from '@material-ui/icons'
import { FormattedMessage } from "react-intl";


class ScrollMember extends React.Component {
    state = {
    open: false,
    scroll: 'paper',
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

    render() {
        return (
        	<dev>
        	<ListItem button onClick={this.handleClickOpen('body')}>
                <Avatar>
                        <Gavel />
                </Avatar>
				<ListItemText 
					primary={<FormattedMessage id="tochucnhansu.title" defaulMesage="Tổ chức nhân sự"  />} 
				/>
            </ListItem>

           <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
           maxWidth = 'lg'
        >
          <DialogTitle id="scroll-dialog-title"  gutterBottom align="center">
			  <h2>
			  	<FormattedMessage id="tochucnhansu.title" defaulMesage="Tổ chức nhân sự"  />
			  </h2>
		</DialogTitle>

          <DialogContent>            
            <img style={{marginLeft: '100px'}} src={"http://dut.udn.vn/images/csvc_gioithieu.png"} alt={"Tổ Chức Nhân Sự"} />            
          </DialogContent>
          <br/>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
				<FormattedMessage  id="close.title" defaulMesage="Close" />
            </Button>
          </DialogActions>
        </Dialog>
        	</dev>
        );
    }
}

export default ScrollMember;