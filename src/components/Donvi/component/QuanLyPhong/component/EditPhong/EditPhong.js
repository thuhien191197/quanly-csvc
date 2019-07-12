import React, { Component } from 'react';
// import './ThongKe.css';
import { withRouter } from "react-router";
import { QLCSVCContext } from '../../../../../Main/Main';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as R from 'ramda';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { FormattedMessage } from "react-intl";

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

	getNameTaiSanCurrent = (resourceTS, idTSCurrent) =>{
		console.log("[phong] nameDVCurrent:",idTSCurrent)
		var itemsDonVi  = resourceTS.donvi
		var lengthDV  = itemsDonVi.length
		var nameDonVi = ''
		for(var j =0; j < lengthDV; j++){
			var item = itemsDonVi[j]
			if(item.id === idTSCurrent){
				nameDonVi = item.name
			}
		}
		return nameDonVi
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
						label={<FormattedMessage id="quanlyphong.table.name" defaulMesage="Tên phòng" />}
						value={name}
						onChange={this.handleChange('name')}
						style={{ marginRight: 30 }}
						helperText={<FormattedMessage id="quanlyphong.input.name" defaulMesage="Nhập tên phòng" />}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="standard-name"
						select
						disabled
						label={<FormattedMessage id="donvi.title" defaulMesage="Đơn vị" />}
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
						margin="normal"
					>
						{resource.donvi.map((item, i) => (
							<option key={i} value={item.id}>
								{item.name}
							</option>
						))}
					</TextField>
					<br />
					<Button 
						variant="contained" 
					>
						<Link button to={`${this.getNameTaiSanCurrent(resource, id_donvi)}/quanlyphong`} >
							<FormattedMessage id="cancel.title" defaulMesage="Hủy" />
						</Link>
					</Button>
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
						<FormattedMessage id="edit.title" defaulMesage="Sửa" />
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
