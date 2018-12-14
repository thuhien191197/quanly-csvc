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
    Paper
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';


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
});

const featuredPosts = [
    {
        id: 1,
        title: 'Sinh viên đoạt giải Đồng tại...',
        date: '12/12/2018 15:21',
        description:
            'Trần Nhật Tiến và Trần Phước Bảo Thư (lớp 14 KT) là 2 gương mặt sinh viên điển hình của ...',
        image: 'http://dut.udn.vn/Files/admin/images/Tin_tuc/KhoaKientruc/2018/ThietketreCA/image002.jpg'
    },
    {
        id: 2,
        title: 'Tham quan học tập tại Vương...',
        date: '04/12/2018 15:56',
        description:
            'Nhằm mục đích xây dựng mối quan hệ hợp tác hiệu quả giữa trường đại học và doanh nghiệ...',
        image: 'http://dut.udn.vn/Files/admin/images/Tin_tuc/CBVC/2018/ThamquanVQAnh/image002.jpg'
    },
    {
        id: 3,
        title: 'DUT thắng lớn trong kỳ thi...',
        date: '03/12/2018 11:23',
        description:
            'Đội tuyển Trường Đại học Bách Khoa – ĐHĐN đã tham gia kỳ thi Olympic Tin học Sinh viê...',
        image: 'http://dut.udn.vn/Files/admin/images/Tin_tuc/KhoaCNTT/2018/ICPCAsia/image002.jpg'
    },
    {
        id: 4,
        title: 'Lễ ký kết MOU giữa Khoa Điện...',
        date: '30/11/2018 14:08',
        description:
            'Sáng ngày 27/11/2018, Khoa Điện, Trường Đại học Quốc Gia Thành Công (NCKU) Đài Loan v...',
        image: 'http://dut.udn.vn/Files/admin/images/Tin_tuc/KhoaDien/2018/MOU_NCKU/image008.jpg'
    },
    {
        id: 5,
        title: 'DUT thắng lớn trong kỳ thi  ...',
        date: '03/12/2018 11:23',
        description:
            'Đội tuyển Trường Đại học Bách Khoa – ĐHĐN đã tham gia kỳ thi Olympic Tin học Sinh vi...',
        image: 'http://dut.udn.vn/Files/admin/images/Tin_tuc/KhoaCNTT/2018/ICPCAsia/image002.jpg'
    },
    {
        id: 6,
        title: 'Lễ ký kết MOU giữa Khoa Điện ...',
        date: '30/11/2018 14:08',
        description:
            'Sáng ngày 27/11/2018, Khoa Điện, Trường Đại học Quốc Gia Thành Công (NCKU) Đài Loan...',
        image: 'http://dut.udn.vn/Files/admin/images/Tin_tuc/KhoaDien/2018/MOU_NCKU/image008.jpg'
    },
];

class LeftNew extends React.Component {
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
                                    <Typography component="h2" variant="h6" maxlength="50" >
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

LeftNew.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeftNew);