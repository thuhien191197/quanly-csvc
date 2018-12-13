import React, { Component } from 'react';
// import './addAPIDanhSach.css';
import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router";
import Button from '@material-ui/core/Button';
import { QLCSVCContext } from '../../../Main/Main';





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
		const { resource } = this.props
		const {
			id,
			name
		} = this.state;
		return (
			<div>
				{/* ADD tài sản */}
				<form
					noValidate autoComplete="off"
				>
					<TextField
						id="standard-name"
						label="Tên danh mục"
						value={name}
						placeholder="Nhập tên danh mục"
						onChange={this.handleChange('name')}
						style={{ marginRight: 30 }}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<br />
					<Button variant="contained" color="primary"
						onClick={(event) => this.handleSubmit(
							resource.danhmuc,
							event,
							id,
							name
						)}
						// href="http://localhost:3000/taisan"
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
			<AddDMComponent  
				addAPIDanhSach={this.props.addAPIDanhSach} 
				resource={resource} 
				addContextDanhMuc={this.props.addContextDanhMuc}
			/>
		)
	}
}


class AddDM extends Component {
	render() {
		return(
			<QLCSVCContext.Consumer>
				{({ resource, addContextDanhMuc }) => <Add 
							addAPIDanhSach={this.props.addAPIDanhSach} 
							resource={resource} 
							match={this.props.match} 
							addContextDanhMuc={addContextDanhMuc} />}
			</QLCSVCContext.Consumer>
		)
	}

}
	
	export default withRouter(AddDM);
