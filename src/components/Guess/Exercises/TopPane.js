import React from 'react';
import {Grid, Paper, Typography} from "@material-ui/core";

export default ({styles}) =>
    <div>
        <Paper style={styles.mainFeaturedPost}>
            <Grid container>
                <Grid item md={6}>
                    <div style={styles.mainFeaturedPostContent}>
                 
                      
                    </div>
                </Grid>
            </Grid>
        </Paper>
    </div>