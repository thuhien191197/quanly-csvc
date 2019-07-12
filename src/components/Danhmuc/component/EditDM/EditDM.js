import React, { Component } from 'react';
import { withRouter } from "react-router";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { QLCSVCContext } from '../../../Main/Main';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import NavBar from '../../../../general/NavBar/NavBar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { FormattedMessage } from "react-intl";

const styles = theme => ({
	root: {
	  display: 'flex',
	  justifyContent: 'center',
	  flexWrap: 'wrap',
	  padding: theme.spacing.unit * 15,
	  marginTop: "-8em",
	},
});


const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[3]


class EditDMComponent extends Component {
	state = this.props.itemDanhMuc || {
		id: 0,
		name: '',
	};

	componentDidMount() {
	}

	handleSubmit = (itemsDanhMuc, event, id, name) => {
		event.preventDefault();
		// console.log("clicked submit");

		this.props.editContextDanhMuc({
			id,
			name,
		})
		
		this.props.editAPIDanhSach({
			id,
			name,
		})
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	render() {
		const { resource, classes } = this.props
		// console.log(">>loaitaisan: ", this.state.itemsLoaitaisan);
		const {
			id,
			name,
		} = this.state;
		
		return (
		<div>
			<Paper className={classes.root}>
			<form
				noValidate autoComplete="off"
			>
				<TextField
					id="standard-name"
					label={<FormattedMessage id="danhmuc.table.name" defaulMesage="Tên danh mục" />}
					value={name}
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
						resource.taisan,
						event,
						this.props.itemDanhMuc.id,
						name,
					)}
				>
					<FormattedMessage id="edit.title" defaulMesage="Sửa" />
				</Button>
			</form>
			</Paper>
		</div>
		);
	}
}


class Edit extends Component {
	render() {
		const { resource, classes } = this.props;
		const itemsDanhMuc = resource.danhmuc;
		const currentId = getParentPath(this.props.match.url);
		let itemDanhMuc = itemsDanhMuc.find((item) => { return item.id == currentId });;

		return (
			<EditDMComponent 
				itemDanhMuc={itemDanhMuc}
				editAPIDanhSach={this.props.editAPIDanhSach} 
				resource={resource} 
				classes={classes}
				editContextDanhMuc={this.props.editContextDanhMuc}/>
		)
	}
}


class EditDM extends Component {
	state ={
		navBar : {
			eidtdanhmuc:{
				route:"/danhmuc/edit",
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
					title=  {"edit.title"}
				/>
				<QLCSVCContext.Consumer>
					{({ resource, editContextDanhMuc }) => <Edit 
								editAPIDanhSach={this.props.editAPIDanhSach} 
								resource={resource} 
								classes={classes}
								match={this.props.match} editContextDanhMuc={editContextDanhMuc} />}
				</QLCSVCContext.Consumer>
			</div>
		)
	}

}


export default withRouter(withStyles(styles)(EditDM));
