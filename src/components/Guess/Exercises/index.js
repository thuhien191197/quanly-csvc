import React from "react";
import {Grid} from "@material-ui/core";
import LeftPane from './LeftPane';
import RightPane from './RightPane';
import TopPanne from './TopPane';

let imgUrl = 'https://live.staticflickr.com/65535/48264342181_ec4cb54c31_k.jpg';
const styles ={
    root: {
        width: '100%',
        maxWidth: 360

    },
    inline: {
        display: 'inline',
    },

    PaperRight: {
        maxWidth: '100%',
        padding: 20,
        margin: 10,
    },
    mainFeaturedPost: {
		paddingLeft:0,
		paddingRight: 60,
		paddingTop: 260,
		paddingBottom : 220,
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundSize: 'cover',
        overflow: 'hidden',
    },
    mainFeaturedPostContent: {
        padding: 20,
        margin: 10,
    
        height: 250,
    },
    card: {
        maxWidth: '100%',
        margin: 10,
        overflow: 'hidden',
    },
    media: {
        height: 160,
    },
    rootL: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',

    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {

    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },

    rootRightList: {
        width: '100%',
    },
    moreRight: {
        width: '100%',
    },
    heading: {
        fontSize: 15,
    },
};
export default props =>
    <div style={{backgroundColor:'white'}}>
        <TopPanne styles={styles}/>
        <Grid container >
            <Grid item sm= {8} >
                <LeftPane  styles ={styles}/>
            </Grid>
            <Grid item sm = {4} >
                <RightPane styles ={styles}/>
            </Grid>
        </Grid>
    </div>

