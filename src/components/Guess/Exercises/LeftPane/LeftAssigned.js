import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Hidden,
    Typography,
    TableRow,
    TableCell,
    TablePagination,
    Paper,
    Dialog,
    DialogActions,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import * as R from 'ramda';


const styles = LeftNew => ({
    paperL: {
        flex: 1,
        padding: 0,
        margin: 0,

    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
		width: 110,
		height: 110,
    },
    cardL: {
        display: 'flex',
        flexGrow: 1,
        margin: 10,
		padding: 5,
		height: 300
    },
    posrt: {
        maxWidth:  250,
        // margin: `${LeftNew.spacing.unit}px auto`,
        // padding: LeftNew.spacing.unit * 2,
	},
	whiteSpace: {
        whiteSpace:  ' pre-line', //https://hocwebchuan.com/reference/cssSection/pr_white-space.php
    }
});


class LeftNew extends React.Component {
    constructor(props){

        super(props);

        this.state = {
			data: [],
			dataDonvi: [],
			dataRole: [],
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            page: 0,
            rowsPerPage: 8,
            value: -1
		}
		
		this.apiUrl = `http://localhost:5500/user`
		this.apiUrlDonvi = `http://localhost:5500/donvi`
		this.apiUrlRole = `http://localhost:5500/role`
    }

    componentDidMount(){
        axios.get(this.apiUrl)
            .then((res) => {
                this.setState({data:res.data});
			});
			
		axios.get(this.apiUrlDonvi)
			.then((res) => {
				this.setState({dataDonvi:res.data});
			});

		axios.get(this.apiUrlRole)
			.then((res) => {
				this.setState({dataRole:res.data});
			});
    }
    handleClose = () => {
        this.setState({ open: false });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleClickOpen = scroll => () => {
        this.setState({ open: true, scroll });

    };
    handleClick =(id) => {
		axios.get(this.apiUrl+'/'+ id)
			.then(res => {
				this.setState({ selected: res.data });
			});
		console.log(id);
	};
	
	handleShowDonvi = (id) => {
		var getNameDonvi = R.filter(R.propEq("id", id))
		var donvi = R.path([0,'name'],getNameDonvi(this.state.dataDonvi))
		return (
			<span>
				{donvi}
			</span>
		)
	}

	handleShowRole = (id) => {
		var getNameRole = R.filter(R.propEq("id", id))
		var role = R.path([0,'name'],getNameRole(this.state.dataRole))
		var mission = R.path([0,'mission'],getNameRole(this.state.dataRole))
		// console.log(">>mission: "+mission);
		return (
			<span>
				{role}
			</span>
		)
	}
	handleShowMission = (id) => {
		var getNameRole = R.filter(R.propEq("id", id))
		var mission = R.path([0,'mission'],getNameRole(this.state.dataRole))
		return (
			<span>
				{mission}
			</span>
		)
	}



    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    render() {
    const { classes } = this.props;
    const { data, rowsPerPage, page,  } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
        <div>
            <Grid container spacing={0} className={classes.paperL}>
                {this.state.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                    <Grid  xs={12} md={6}
                           onClick={this.handleClickOpen('body')}
                           tabIndex={-1}
                           key={user.id}>
                        <Card className={classes.cardL}
                              onClick={() => this.handleClick(user.id)}>
                            <div className={classes.cardDetails}>
                                <CardContent>
                                    <Typography component="h2" variant="h6" >
                                        Cán bộ: {user.fullname}
                                    </Typography>
                                   
                                    <Typography  component="p" gutterBottom noWrap className={classes.posrt}>
                                        DĐ: {user.phone}
                                    </Typography>
									<Typography  component="p" gutterBottom noWrap className={classes.posrt}>
										Đơn vị: {this.handleShowDonvi(user.id_donvi)}
									</Typography>
									<Typography  component="p" gutterBottom noWrap className={classes.posrt}>
										Chức vụ: {this.handleShowRole(user.id_role)}
									</Typography>
									<Typography  component="p" gutterBottom noWrap className={classes.whiteSpace}>
										Nhiệm vụ: {this.handleShowMission(user.id_role)}
									</Typography>
                                    <Typography variant="subtitle2" color="primary">
                                        Continue reading...
                                    </Typography>
                                </CardContent>
                            </div>
                            <Hidden xsDown>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={user.avatar}
                                    //title={post.title}
                                />
                            </Hidden>
                        </Card>
                    </Grid>
                ))} {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                </TableRow>
            )}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    scroll={this.state.scroll}
                    aria-labelledby="scroll-dialog-title"
                    maxWidth = 'lg'
                >
                    <DialogTitle id="scroll-dialog-title">{this.state.selected.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.state.selected.content}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
            <Paper style={{ flexGrow: 1, margin: 10, padding: 0, marginTop: -5, marginBottom: 2}}>
                <TablePagination
                    rowsPerPageOptions={[8, 16]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>


        </div>
    )}
}

LeftNew.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeftNew);