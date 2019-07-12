import React, { Component } from 'react';
// import './addAPIKinhPhi.css';
import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router";
import Button from '@material-ui/core/Button';
import { QLCSVCContext } from '../../../Main/Main';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
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

class AddKPComponent extends Component {
	state = {
		id : 0,
		name : '',
		tongngansach: 0,
		tongchi : 0,
		tongthanhly: 0
	};

	componentDidMount() {

	}

	handleSubmit = (itemsKinhPhi, event, id, name, tongngansach, tongchi, tongthanhly) => {
		// event.preventDefault();
		itemsKinhPhi.length!==0
		? id = parseInt(itemsKinhPhi[itemsKinhPhi.length - 1].id) + 1
		: id = 1

		this.props.addContextKinhPhi({
			id,
			name,
			tongngansach,
			tongchi,
			tongthanhly
		})

		this.props.addAPIKinhPhi({
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
		const {
			id,
			name,
			tongngansach,
			tongchi,
			tongthanhly
		} = this.state;

		return (
			<Paper className={classes.root}>
				{/* ADD tài sản */}
				<form noValidate autoComplete="off">
					<TextField
						id="standard-name"
						label={<FormattedMessage id="danhmuc.nguonkinhphi.table.name" defaulMesage="Tên nguồn kinh phí" />}
						value={name}
						helperText={<FormattedMessage id="danhmuc.nguonkinhphi.input.name" defaulMesage="Nhập tên nguồn kinh phí" />}
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
						helperText={<FormattedMessage id="danhmuc.nguonkinhphi.input.tongngansach" defaulMesage="Nhập tổng ngân sách" />}
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
						placeholder="Nhập tổng chi"
						// fullWidth
						helperText={<FormattedMessage id="danhmuc.nguonkinhphi.input.tongchi" defaulMesage="Nhập tổng chi" />}
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
						placeholder="Nhập tổng thanh lý"
						// fullWidth
						helperText={<FormattedMessage id="danhmuc.nguonkinhphi.input.tongthanhly" defaulMesage="Nhập tổng thanh lý" />}
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
							id,
							name,
							tongngansach,
							tongchi,
							tongthanhly
						)}
						href="http://localhost:3000/danhmuc/Nguồn%20Kinh%20Phí"
					>
						<FormattedMessage id="add.title" defaulMesage="Thêm" />
					</Button>
				</form>
			</Paper>
	
			);
	} //aaaa
}


class Add extends Component {
	render() {
		const { resource, classes } = this.props;
		return (
			<AddKPComponent  
				addAPIKinhPhi={this.props.addAPIKinhPhi} 
				resource={resource} 
				classes={classes}
				addContextKinhPhi={this.props.addContextKinhPhi}
			/>
		)
	}
}


class AddKP extends Component {
	render() {
		const { match, classes } = this.props
		return(
			<QLCSVCContext.Consumer>
				{({ resource, addContextKinhPhi }) => <Add 
							addAPIKinhPhi={this.props.addAPIKinhPhi} 
							resource={resource} 
							match={this.props.match} 
							classes={classes}
							addContextKinhPhi={addContextKinhPhi} />}
			</QLCSVCContext.Consumer>
		)
	}

}
	

export default withRouter(withStyles(styles)(AddKP));
