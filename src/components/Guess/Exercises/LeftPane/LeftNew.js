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
import { FormattedMessage } from "react-intl";


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
        width: 160,

    },
    cardL: {
        display: 'flex',
        flexGrow: 1,
        margin: 10,
        padding: 5,


    },
    posrt: {
        maxWidth:  250,
        // margin: `${LeftNew.spacing.unit}px auto`,
        // padding: LeftNew.spacing.unit * 2,
    }
});


class LeftNew extends React.Component {
    constructor(props){

        super(props);

        this.state = {
            data: [],
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            page: 0,
            rowsPerPage: 2,
            value: -1
        }
        this.apiUrl = `http://localhost:5500/posts`
    }

    componentDidMount(){
        axios.get(this.apiUrl)
            .then((res) => {

                this.setState({data:res.data});
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
                {this.state.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(post => (
                    <Grid  xs={12} md={6}
                           onClick={this.handleClickOpen('body')}
                           tabIndex={-1}
                           key={post.id}>
                        <Card className={classes.cardL}
                              onClick={() => this.handleClick(post.id)}>
                            <div className={classes.cardDetails}>
                                <CardContent>
                                    <Typography component="h2" variant="h6" >
                                        {post.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {post.date}
                                    </Typography>
                                    <Typography  component="p" gutterBottom noWrap className={classes.posrt}>
                                        {post.content}
                                    </Typography>
                                    <Typography variant="subtitle2" color="primary">
										<FormattedMessage  id="xemthem.title" defaulMesage="Xem thêm" />
                                    </Typography>
                                </CardContent>
                            </div>
                            <Hidden xsDown>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={post.image}
                                    title={post.title}
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
                    rowsPerPageOptions={[2, 4, 6, 8]}
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