import React, { Component } from 'react';
// import './addAPIKinhPhi.css';
import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router";
import Button from '@material-ui/core/Button';
import { QLCSVCContext } from '../../../Main/Main';

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
		const { resource } = this.props
		const {
			id,
			name,
			tongngansach,
			tongchi,
			tongthanhly
		} = this.state;

		return (
			<div>
				{/* ADD tài sản */}
				<form noValidate autoComplete="off">
					<TextField
						id="standard-name"
						label="Tên Kinh phí"
						value={name}
						placeholder="Nhập tên Kinh phí"
						onChange={this.handleChange('name')}
						style={{ marginRight: 30 }}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="standard-name"
						label="Tổng ngân sách"
						value={tongngansach}
						style={{ marginRight: 30 }}
						type="number"
						placeholder="Nhập tổng ngân sách"
						// fullWidth
						helperText="tổng ngân sách!"
						onChange={this.handleChange('tongngansach')}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<br />
					<TextField
						id="standard-name"
						label="Tổng chi"
						value={tongchi}
						style={{ marginRight: 30 }}
						type="number"
						placeholder="Nhập tổng chi"
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
						label="Tổng thanh lý"
						value={tongthanhly}
						style={{ marginRight: 30 }}
						type="number"
						placeholder="Nhập tổng thanh lý"
						// fullWidth
						helperText="tổng thanh lý!"
						onChange={this.handleChange('tongthanhly')}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<br />
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
						href="http://localhost:3000/Nguồn%20Kinh%20Phí"
					>
						Thêm
					</Button>
				</form>
			</div>
	
			);
	} //aaaa
}


class Add extends Component {
	render() {
		const { resource } = this.props;
		return (
			<AddKPComponent  
				addAPIKinhPhi={this.props.addAPIKinhPhi} 
				resource={resource} 
				addContextKinhPhi={this.props.addContextKinhPhi}
			/>
		)
	}
}


class AddKP extends Component {
	render() {
		return(
			<QLCSVCContext.Consumer>
				{({ resource, addContextKinhPhi }) => <Add 
							addAPIKinhPhi={this.props.addAPIKinhPhi} 
							resource={resource} 
							match={this.props.match} 
							addContextKinhPhi={addContextKinhPhi} />}
			</QLCSVCContext.Consumer>
		)
	}

}
	
	export default withRouter(AddKP);
