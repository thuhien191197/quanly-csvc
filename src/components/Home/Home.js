import React, { Component } from 'react';
import './Home.css';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import { QLCSVCContext } from '../Main/Main';
import NavBar from '../../general/NavBar/NavBar';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { withRouter } from "react-router";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
const styles = theme => ({
	root: {
	  display: 'flex',
	  justifyContent: 'center',
	  flexWrap: 'wrap',
	  padding: theme.spacing.unit * 5,
	},
	form:{
		marginBottom: '20px'
	},
	heroContent: {
		maxWidth: 600,
		margin: '0 auto',
		padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
	  },
	  cardHeader: {
		backgroundColor: theme.palette.grey[200],
	  },
	  cardPricing: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'baseline',
		marginBottom: theme.spacing.unit * 2,
	  },
	  cardActions: {
		[theme.breakpoints.up('sm')]: {
		  paddingBottom: theme.spacing.unit * 2,
		},
	  },
	  grid:{
		  marginBottom: '2%'
	  },
	  card:{
		  height:'200px'
	  }
});

const tiers = [
	{
	  title: 'Người dùng',
	  subheader: 'Người có quyền hạn trong trang CSVC',
	  price: '0',
	  description: [''],
	  buttonText: 'Sign up for free',
	  buttonVariant: 'outlined',
	  link:'user'
	},
	{
	  title: 'Tài Sản',
	  subheader: 'Số đợt Tài sản được thêm vào',
	  price: '15',
	  description: [
	  ],
	  buttonText: 'Get started',
	  buttonVariant: 'contained',
	  link:'taisan'
	},
	{
	  title: 'Đơn vị',
	  subheader: 'Các đơn vị trong trường',
	  price: '30',
	  description: [
	  ],
	  buttonText: 'Contact us',
	  buttonVariant: 'outlined',
	  link:'donvi'
	},
  ];

class HomeComponent extends Component {
	constructor(props) {
		super(props);
		const data = this.handleDataChart(props.resource || []);
		this.state = {
			data,
			lengthTaiSan : 0	
		}
	}
		
		// data : [
		// 	{ name: 'Mon', Visits: 2200, Orders: 3400 },
		// 	{ name: 'Tue', Visits: 1280, Orders: 2398 },
		// 	{ name: 'Wed', Visits: 5000, Orders: 4300 },
		// 	{ name: 'Thu', Visits: 4780, Orders: 2908 },
		// 	{ name: 'Fri', Visits: 5890, Orders: 4800 },
		// 	{ name: 'Sat', Visits: 4390, Orders: 3800 },
		// 	{ name: 'Sun', Visits: 4490, Orders: 4300 },
		// ],
	componentWillReceiveProps(props, state) {
		// console.log("Next props", props);
		const data = this.handleDataChart(props.resource || []);
		this.setState({
			data,
		})
	}

	deduplicate = (arr)=> {
		let isExist = (arr, x) => {
		  for(let i = 0; i < arr.length; i++) {
			if (arr[i] === x) return true;
		  }
		  return false;
		}
	  
		let ans = [];
		arr.forEach(element => {
		  if(!isExist(ans, element)) ans.push(element);
		});
		return ans;
	}

	handleDataChart =(resourceHome) => {
		let data = []
		let year = []
		let item = {}
		let itemsTaiSan = resourceHome.taisan
		let length = itemsTaiSan.length
		for(let i =0; i < length; i++){
			let item = itemsTaiSan[i]
			console.log("[Home] item:" ,item.ngaynhap)
			var date = []
			date = item.ngaynhap.split('-')
			year.push(date[0])
		}
		const yearFilter = this.deduplicate(year)
		console.log("[Home] yearFilter:" ,yearFilter)
		for(var i = 0; i < yearFilter.length; i++){
			var countSoLuong = 0
			for(var j = 0; j < year.length; j++){
				if(yearFilter[i] === year[j] ){
					countSoLuong++
				}
			}
			const newData = {
				'YEAR': yearFilter[i], 
				'Số đợt thêm tài sản': countSoLuong
			};
			data.push(newData)
		}
		
		console.log("[Home] data:" ,data);
		return data.reverse()
	}

	render(){
		const { data } = this.state
		const { resource, classes } = this.props
		return(
			<Paper className={classes.root}>
				<Grid container spacing={40} alignItems="flex-end" className={classes.grid}>
				{tiers.map(tier => (
					// Enterprise card is full width at sm breakpoint
					
					<Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
					<Card className={classes.card}>
						<Link to={`/${tier.link}`} >
						<CardHeader
						title={tier.title}
						subheader={tier.subheader}
						titleTypographyProps={{ align: 'center' }}
						subheaderTypographyProps={{ align: 'center' }}
						action={tier.title === 'Tài Sản' ? <StarIcon /> : null}
						className={classes.cardHeader}
						/>
						</Link>
						<CardContent>
						{tier.title === 'Tài Sản'
						?
						
						<div className={classes.cardPricing}>
							<Typography component="h2" variant="h3" color="textPrimary">
							{tier.title === 'Tài Sản'
							?	
								resource.taisan.length.toString()
							:
							''
							}
							</Typography>
							<Typography variant="h6" color="textSecondary">
							/tài sản
							</Typography>
						</div>
						
						: ''}
						{tier.title === 'Người dùng'
						?
						<div className={classes.cardPricing}>
							<Typography component="h2" variant="h3" color="textPrimary">
							{tier.title === 'Người dùng'
							?
								resource.user.length.toString()
							:
							''
							}
							</Typography>
							<Typography variant="h6" color="textSecondary">
							/người
							</Typography>
						</div>
						: ''}
						{tier.title === 'Đơn vị'
						?
						<div className={classes.cardPricing}>
							<Typography component="h2" variant="h3" color="textPrimary">
							{tier.title === 'Đơn vị'
							?
								resource.donvi.length.toString()
							:
							''
							}
							</Typography>
							<Typography variant="h6" color="textSecondary">
							/đơn vị
							</Typography>
						</div>
						: ''}
						
						{tier.description.map(line => (
							<Typography variant="subtitle1" align="center" key={line}>
							{line}
							</Typography>
						))}
						</CardContent>
						{/* <CardActions className={classes.cardActions}>
						<Button fullWidth variant={tier.buttonVariant} color="primary">
							{tier.buttonText}
						</Button>
						</CardActions> */}
					</Card>
					
					</Grid>
				))}
				</Grid>
				<ResponsiveContainer width="100%" height={200}>
					<LineChart data={data}>
						<XAxis dataKey="YEAR" />
						<YAxis />
						<CartesianGrid vertical={false} strokeDasharray="3 3" />
						<Tooltip />
						<Legend />
						{/* <Line type="monotone" dataKey="YEAR" stroke="#82ca9d" /> */}
						<Line type="monotone" dataKey="Số đợt thêm tài sản" stroke="#8884d8" activeDot={{ r: 8 }} />
					</LineChart>
				</ResponsiveContainer>
			</Paper>
		)
	}
}

class Home extends Component {
	state = {
		navBar : {
			home:{
				route:"/home",
				title: "Thống kê trang quản lý",
				// component: "DanhSachTaiSan"
			},
		}
	}
	render() {
		const { match, classes } = this.props
		const { rows, navBar } = this.state
		const parentKey = Object.keys(navBar)
		return (
			<div>
				<NavBar
					match={match}
					classes={classes}
					parentKey={parentKey}
					navBar={navBar}
					title= {"Home"}
				/>
				<QLCSVCContext.Consumer>
					{({ resource}) => {
						return (
							<div>
								<HomeComponent
									resource= {resource}
									classes={classes}
								/>
							</div>
						)
					}}
				</QLCSVCContext.Consumer>
			</div>
		);
	}
}

export default withRouter(withStyles(styles)(Home));
