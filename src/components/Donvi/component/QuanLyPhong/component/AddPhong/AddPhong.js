import React, { Component } from 'react';
// import './ThongKe.css';
import { withRouter } from "react-router";
import { QLCSVCContext } from '../../../../../Main/Main';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as R from 'ramda';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { FormattedMessage } from "react-intl";

const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[2]

class AddPhongComponent extends Component {
	constructor(props) {
		super(props);
		const id_donvi = this.getIDDonViCurrent(props.resource,getParentPath(this.props.match.url))
		this.state = {
			name: '',
			id_donvi
		}
	}
	
	handleSubmit = (itemsPhong, event, id, name, id_donvi) => {
		// event.preventDefault();
		// console.log("clicked submit");
		// var id_donvi = parseInt(id_donvi);
		console.log("[Add Phong] name: ", name);
		itemsPhong.length!==0
		? id = parseInt(itemsPhong[itemsPhong.length - 1].id) + 1
		: id = 1
		
		this.props.addContextPhong({
			id,
			name,
			id_donvi,
		})

		this.props.addAPIPhong(
			id,
			name,
			id_donvi,
		)
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
						label={<FormattedMessage id="quanlyphong.table.name" defaulMesage="Tên phòng" />}
						value={name}
						// placeholder={<FormattedMessage id="quanlyphong.input.name" defaulMesage="Nhập tên phòng" />}
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
						onChange={() => this.handleChangeDV(this.getIDDonViCurrent(resource,getParentPath(this.props.match.url)))}
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
						<Link button  to={`/user`} >
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
						<FormattedMessage id="add.title" defaulMesage="Thêm" />
					</Button>
				</form>
			</div>
		)
	}
}

class Add extends Component {
	render() {
		const { resource, match } = this.props;

		return (
			<AddPhongComponent  
				addAPIPhong={this.props.addAPIPhong} 
				resource={resource} 
				match={match} 
				addContextPhong={this.props.addContextPhong}/>
		)
	}
}


class AddPhong extends Component {
	render() {
		const { match, addAPIPhong } = this.props
		return (
			<QLCSVCContext.Consumer>
				{({ resource, addContextPhong }) => <Add 
							addAPIPhong={addAPIPhong} 
							resource={resource} 
							match={match} 
							addContextPhong={addContextPhong} />}
			</QLCSVCContext.Consumer>
		);
	}
}

export default withRouter(AddPhong);
