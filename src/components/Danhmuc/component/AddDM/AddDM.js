import React, { Component } from 'react';
// import './addAPIDanhSach.css';
import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router";
import Button from '@material-ui/core/Button';
import { QLCSVCContext } from '../../../Main/Main';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import NavBar from '../../../../general/NavBar/NavBar';
import { FormattedMessage } from "react-intl";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const styles = theme => ({
	root: {
	  display: 'flex',
	  justifyContent: 'center',
	  flexWrap: 'wrap',
	  padding: theme.spacing.unit * 15,
	  marginTop: "-8em",
	},
});


class AddDMComponent extends Component {
	state = {
		name: '',
	};

	componentDidMount() {

	}


	handleSubmit = (itemsDanhMuc, event, id, name) => {
		// event.preventDefault();
		itemsDanhMuc.length!==0
		? id = parseInt(itemsDanhMuc[itemsDanhMuc.length - 1].id) + 1
		: id = 1

		this.props.addContextDanhMuc({
			id,
			name
		})

		this.props.addAPIDanhSach(
			id,
			name
		)
	}


	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	render() {
		const { resource, classes } = this.props
		const {
			id,
			name
		} = this.state;
		return (
				<Paper className={classes.root}>
					<form
						noValidate autoComplete="off"
					>
						<TextField
							id="standard-name"
							label={<FormattedMessage id="danhmuc.table.name" defaulMesage="Tên danh mục" />}
							value={name}
							helperText={<FormattedMessage id="danhmuc.input.name" defaulMesage="Nhập tên danh mục" />}
							onChange={this.handleChange('name')}
							style={{ marginRight: 30 }}
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<br />
						<Button 
						variant="contained" 
						>
							<Link button  to={`/danhmuc`} >
								<FormattedMessage id="cancel.title" defaulMesage="Hủy" />
							</Link>
						</Button>	
						<Button variant="contained" color="primary"
							onClick={(event) => this.handleSubmit(
								resource.danhmuc,
								event,
								id,
								name
							)}
							// href="http://localhost:3000/taisan"
						>
							<FormattedMessage id="add.title" defaulMesage="Thêm" />
						</Button>
					</form>
				</Paper>
	
			);
	} 
}


class Add extends Component {
	render() {
		const { resource, classes } = this.props;

		return (
			<AddDMComponent  
				addAPIDanhSach={this.props.addAPIDanhSach} 
				resource={resource} 
				classes={classes}
				addContextDanhMuc={this.props.addContextDanhMuc}
			/>
		)
	}
}


class AddDM extends Component {
	state ={
		navBar : {
			themndanhmuc:{
				route:"/danhmuc/add",
				title: "",
				// component: "DanhSachTaiSan"
				messageId : "danhmuc.title"
			},
		}
	}
	render() {
		const { match, classes } = this.props
		const { navBar } = this.state
		const parentKey = Object.keys(navBar)
		return(
			<div>
				<NavBar
					match={match}
					classes={classes}
					parentKey={parentKey}
					navBar={navBar}
					title= {"add.title"}
				/>
				<QLCSVCContext.Consumer>
					{({ resource, addContextDanhMuc }) => <Add 
								addAPIDanhSach={this.props.addAPIDanhSach} 
								resource={resource} 
								match={this.props.match} 
								classes={classes}
								addContextDanhMuc={addContextDanhMuc} />}
				</QLCSVCContext.Consumer>
			</div>
		)
	}
}
	
export default withRouter(withStyles(styles)(AddDM));

