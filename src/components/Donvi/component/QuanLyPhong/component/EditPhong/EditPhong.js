import React, { Component } from 'react';
// import './ThongKe.css';
import { withRouter } from "react-router";
import { QLCSVCContext } from '../../../../../Main/Main';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as R from 'ramda';
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[5]

class EditPhongComponent extends Component {
	state = this.props.itemPhong || {
		id: 0,
		name: '',
		id_donvi: 0,
	};
	
	handleSubmit = (itemsPhong, event, id, name, id_donvi) => {
		// event.preventDefault();
		// console.log("clicked submit");
		var id_donvi = parseInt(id_donvi);
		console.log("[Edit] Phong] name: ", name);

		
		this.props.editContextPhong({
			id,
			name,
			id_donvi
		})
		console.log("[Edit] Phong] id: ", id);
		this.props.editAPIPhong({
			id,
			name,
			id_donvi
		})
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleChangeDV = (value) => {
		this.setState({
			id_donvi: value
		});
	};

	getIDDonViCurrent = (resourceTS, nameDVCurrent) =>{
		console.log("[phong] nameDVCurrent:",nameDVCurrent)
		var itemsDonVi  = resourceTS.donvi
		var lengthDV  = itemsDonVi.length
		var idDonVi = 0
		for(var j =0; j < lengthDV; j++){
			var item = itemsDonVi[j]
			if(item.name === nameDVCurrent){
				idDonVi = item.id
			}
		}
		return idDonVi
	}

	render(){
		const { resource } = this.props
		const {
			id,
			name,
			id_donvi
		} = this.state;
		return(
			<div>
				<form noValidate autoComplete="off">
					<TextField
						id="standard-name"
						label="Tên tài sản"
						value={name}
						placeholder="Nhập tên tài sản"
						onChange={this.handleChange('name')}
						style={{ marginRight: 30 }}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="standard-name"
						select
						disabled
						label="Đơn vị"
						value={id_donvi}
						onChange={this.handleChange('id_donvi')}
						SelectProps={{
							native: true,
							MenuProps: {
							},
						}}
						InputLabelProps={{
							shrink: true,
						}}
						style={{ marginRight: 30 }}
						helperText="Please select your currency"
						margin="normal"
					>
						{resource.donvi.map((item, i) => (
							<option key={i} value={item.id}>
								{item.name}
							</option>
						))}
					</TextField>
					<br />
					<Button variant="contained" color="primary"
						onClick={(event) => this.handleSubmit(
							resource.phong,
							event,
							id,
							name,
							id_donvi
						)}
						// href="http://localhost:3000/"
					>
						Sửa
					</Button>
				</form>
			</div>
		)
	}
}

class Add extends Component {
	render() {
		const { resource } = this.props;
		const itemsPhong = resource.phong;
		const currentId = getParentPath(this.props.match.url);
		let itemPhong = itemsPhong.find((item) => { return item.id === parseInt(currentId) });;
		console.log("[phong] itemPhong:",itemPhong)
		console.log("[phong] currentId:",currentId)
		return (
			<EditPhongComponent 
				itemPhong={itemPhong} 
				editAPIPhong={this.props.editAPIPhong} 
				resource={resource} 
				editContextPhong={this.props.editContextPhong}
			/>
		)
	}
}


class EditPhong extends Component {
	render() {
		const { match, editAPIPhong } = this.props
		
		return (
			<QLCSVCContext.Consumer>
				{({ resource, editContextPhong }) => <Add 
					editAPIPhong={editAPIPhong} 
					resource={resource} 
					match={match} 
					editContextPhong={editContextPhong} />}
			</QLCSVCContext.Consumer>
		);
	}
}

export default withRouter(EditPhong);
