import React from 'react';
import {Grid, Paper, Typography} from "@material-ui/core";

export default ({styles}) =>
    <div>
        <Paper style={styles.mainFeaturedPost}>
            <Grid container>
                <Grid item md={6}>
                    <div style={styles.mainFeaturedPostContent}>
                        <Typography component="h2" variant="display3" gutterBottom>
                            Trang Quản lý Tài Sản Trường Đại Học Bách Khoa Đà Nẵng
                        </Typography>
                        <Typography variant="overline" paragraph>
                            Thuộc phòng quản lý cơ sở vật chất Trường Đại Học Bách Khoa -Đại Học Đà Nẵng
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    </div>