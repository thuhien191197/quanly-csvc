import React, { Component } from 'react';
import { withRouter } from "react-router";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { QLCSVCContext } from '../../../Main/Main';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
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

const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[4]



class EditKPComponent extends Component {
	state = this.props.itemKinhPhi || {
		id : 0,
		name: '',
		tongngansach: 0,
		tongchi: 0,
		tongthanhly: 0
	};

	componentDidMount() {
	}

	handleSubmit = (itemsKinhPhi, event, id, name, tongngansach, tongchi, tongthanhly) => {
		// event.preventDefault();
		// console.log("clicked submit");

		this.props.editContextKinhPhi({
			id,
			name,
			tongngansach,
			tongchi,
			tongthanhly
		})
		
		this.props.editAPIKinhPhi({
			id,
			name,
			tongngansach,
			tongchi,
			tongthanhly
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
			tongngansach,
			tongchi,
			tongthanhly
		} = this.state;
		
		return (
			<Paper className={classes.root}>
			<form
				noValidate autoComplete="off"
			>
				<TextField
						id="standard-name"
						label={<FormattedMessage id="danhmuc.nguonkinhphi.table.name" defaulMesage="Tên nguồn kinh phí" />}
						value={name}
						onChange={this.handleChange('name')}
						style={{ marginRight: 30 }}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="standard-name"
						label={<FormattedMessage id="danhmuc.nguonkinhphi.table.tongngansach" defaulMesage="Tổng ngân sách" />}
						value={tongngansach}
						style={{ marginRight: 30 }}
						type="number"
						// fullWidth
						onChange={this.handleChange('tongngansach')}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<br />
					<TextField
						id="standard-name"
						label={<FormattedMessage id="danhmuc.nguonkinhphi.table.tongchi" defaulMesage="Tổng chi" />}
						value={tongchi}
						style={{ marginRight: 30 }}
						type="number"
						// fullWidth
						helperText="tổng chi!"
						onChange={this.handleChange('tongchi')}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="standard-name"
						label={<FormattedMessage id="danhmuc.nguonkinhphi.table.tongthanhly" defaulMesage="Tổng thanh lý" />}
						value={tongthanhly}
						style={{ marginRight: 30 }}
						type="number"
						// fullWidth
						helperText="ổng thanh lý!"
						onChange={this.handleChange('tongthanhly')}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<br />
					<Button 
						variant="contained" 
					>
						<Link button  to={`/danhmuc/Nguồn Kinh Phí`} >
							<FormattedMessage id="cancel.title" defaulMesage="Hủy" />
						</Link>
					</Button>	
				<Button variant="contained" color="primary"
					onClick={(event) => this.handleSubmit(
						resource.nguonkinhphi,
						event,
						this.props.itemKinhPhi.id,
						name,
						tongngansach,
						tongchi,
						tongthanhly
					)}
					href="http://localhost:3000/Nguồn%20Kinh%20Phí"
				>
					<FormattedMessage id="edit.title" defaulMesage="Sửa" />
				</Button>
			</form>
		</Paper>
		);
	}
}


class Edit extends Component {
	
	render() {
		const { resource, classes } = this.props;
		const itemsKinhPhi = resource.nguonkinhphi;
		const currentId = parseInt(getParentPath(this.props.match.url))
		let itemKinhPhi = itemsKinhPhi.find((item) => { return item.id === currentId });;
		console.log("currentId:", currentId)
		return (
			<EditKPComponent 
				itemKinhPhi={itemKinhPhi} 
				editAPIKinhPhi={this.props.editAPIKinhPhi} 
				resource={resource}
				classes={classes}
				editContextKinhPhi={this.props.editContextKinhPhi}
			/>
		)
	}
}


class EditKP extends Component {
	render() {
		const { match, classes } = this.props
		return(
			<QLCSVCContext.Consumer>
				{({ resource, editContextKinhPhi }) => <Edit 
							editAPIKinhPhi={this.props.editAPIKinhPhi} 
							resource={resource} 
							match={this.props.match} 
							classes={classes}
							editContextKinhPhi={editContextKinhPhi} />}
			</QLCSVCContext.Consumer>
		)
	}

}


export default withRouter(withStyles(styles)(EditKP));