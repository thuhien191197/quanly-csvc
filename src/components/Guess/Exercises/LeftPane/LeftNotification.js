import {
    Card,
    CardContent,
    Grid,
    Typography,
    TableRow,
    TableCell,
    TablePagination,
    Paper
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';


const styles = LeftNotification => ({
    paperL: {
        flex: 1,
        padding: 0,
        margin: 0,

    },
    cardDetails: {
        flex: 1,
    },
    cardL: {
        display: 'flex',
        flexGrow: 1,
        margin: 10,
        padding: 5,


    },
});

const featuredPosts = [
    {
        id: 1,
        title: 'Khắc phục hậu quả đợt mưa lớn ',
        date: '09/12/2018 18:52',
        description:
            '+ Sinh viên nghỉ học ngày 10/12/2018;'+

            '+ Cán bộ viên chức của Trường: kiểm tra & khắc phục hậu quả/ thiệt hại do mưa lớn gây ra (nếu có); xử lý phòng ngừa thiệt hại trong trường hợp còn mưa kéo dài.',

    },
    {
        id: 2,
        title: 'Giải thưởng “The Pearson...',
        date: '06/12/2018 09:38',
        description:
            'The Pearson Education Innovation Award Vietnam là một giải thưởng được thiết kế nhằm thúc đẩy hoạt động giảng dạy và học tập sáng tạo dành cho nhóm lĩnh vực STEM trong cộng đồng đối tác BUILT-IT.',

    },
    {
        id: 3,
        title: 'Giải thưởng “The Pearson...',
        date: '06/12/2018 09:38',
        description:
            'The Pearson Education Innovation Award Vietnam là một giải thưởng được thiết kế nhằm thúc đẩy hoạt động giảng dạy và học tập sáng tạo dành cho nhóm lĩnh vực STEM trong cộng đồng đối tác BUILT-IT.',

    },

];

class LeftNotification extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 6,
    };
    componentDidMount(){
        this.setState({data: featuredPosts});
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    render() {
        const { classes } = this.props;
        const { data, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        return (
            <div>
                <Grid container spacing={0} className={classes.paperL}>
                    {featuredPosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(post => (
                        <Grid  xs={12} md={6}
                               tabIndex={-1}
                               key={post.id}>
                            <Card className={classes.cardL}>
                                <div className={classes.cardDetails}>
                                    <CardContent>
                                        <Typography component="h2" variant="h6"  >
                                            {post.title}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            {post.date}
                                        </Typography>
                                        <Typography  component="p">
                                            {post.description}
                                        </Typography>
                                        <Typography variant="subtitle2" color="primary">
                                            Continue reading...
                                        </Typography>
                                    </CardContent>
                                </div>

                            </Card>
                        </Grid>
                    ))} {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell colSpan={6} />
                    </TableRow>
                )}
                </Grid>
                <Paper style={{ flexGrow: 1, margin: 10, padding: 0, marginTop: -5, marginBottom: 2}}>
                    <TablePagination
                        rowsPerPageOptions={[6, 12]}
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

LeftNotification.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeftNotification);