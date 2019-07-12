import React from 'react';
import {Grid, Paper, Typography} from "@material-ui/core";
import { Slide } from 'react-slideshow-image'; //https://www.npmjs.com/package/react-slideshow-image
import './TopPane.css';

const slideImages = [
	'https://live.staticflickr.com/65535/48264342181_ec4cb54c31_k.jpg', //https://imgbb.com/
	'https://i.ibb.co/kM2F27p/12240999-933791266700313-430259579522157878-o.jpg',
	'https://i.ibb.co/X4nTbzh/12938243-221952011502973-1982366948297890678-n.jpg'
];

const properties = {
	duration: 5000,
	transitionDuration: 500,
	infinite: true,
	indicators: true,
	arrows: true,
	onChange: (oldIndex, newIndex) => {
	  console.log(`slide transition from ${oldIndex} to ${newIndex}`);
	}
}

export default ({styles}) =>
    <div>
        {/* <Paper style={styles.mainFeaturedPost}>
            <Grid container>
                <Grid item md={6}>
                    <div style={styles.mainFeaturedPostContent}>
                 
                      
                    </div>
                </Grid>
            </Grid>
		</Paper> */}
		<div className="slide-container">
			<Slide {...properties}>
				<div className="each-slide">
					<div style={{backgroundImage: `url('${slideImages[0]}')`}}>
					{/* <span>Slide 1</span> */}
					</div>
					
				</div>
				<div className="each-slide">
					<div style={{backgroundImage: `url('${slideImages[1]}')`}}>
					{/* <span>Slide 2</span> */}
					</div>
				</div>
				<div className="each-slide">
					<div style={{backgroundImage: `url('${slideImages[2]}')`}}>
					{/* <span>Slide 3</span> */}
					</div>
				</div>
			</Slide>
        </div>
    </div>