import React, { Component } from 'react';
// import './QuanLyPhong.css';
import { withRouter } from "react-router";
import { QLCSVCContext } from '../../../Main/Main';
import Table1 from '../../../../general/Table/Table';
import * as R from 'ramda';
import { Switch, Route } from 'react-router-dom'
import AddPhong from './component/AddPhong/AddPhong';
import axios from 'axios';
import EditPhong from './component/EditPhong/EditPhong';
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[2]

class PhongComponent extends Component {
	constructor(props) {
		super(props);
		const data = this.handleGetListTable(props.resource, getParentPath(props.match.url) || []);
		console.log("[phong] data:",data)
		this.state = {
			data,
			selectedTS: []
		}
		// console.log("[DanhSachphong]getParentPath(props.match.url):", getParentPath(props.match.url))
	}

	componentWillReceiveProps(props, state) {
		// console.log("Next props", props);
		const data = this.handleGetListTable(props.resource, getParentPath(props.match.url) || []);
		this.setState({
			data,
		})
	}

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

	handleGetListTable = (resourceTS, nameDVCurrent) =>{
		var itemsPhong = resourceTS.phong
		
		var b =[]
		var length = itemsPhong.length
		var idDonVi = 0;
		idDonVi = this.getIDDonViCurrent(resourceTS, nameDVCurrent)
		console.log("[phong] idDonVi:",idDonVi)
		for(var i = 0; i < length; i++){
			var item = itemsPhong[i]
			if(item.id_donvi === idDonVi){
				console.log("[DS phong] itemsPhong[i].name:",itemsPhong[i].name)
				const a = {
					'id' :item.id, 
					'name': item.name, 
				};
				b.push(a);
			}
		}
		return b
	}

	handleDelete = (selected) => {
		if(window.confirm('Bạn có chắc muốn xóa không?')){
			var itemsPhong = this.props.resource.phong;
			const dataDeleted = R.reject((item) => selected.indexOf(item.id)!== -1, itemsPhong);
			this.props.deleteContextPhong(dataDeleted);
			
			
			selected.forEach(function(select, i) {
				fetch('http://localhost:5500/phong/'+ select, {
					method: 'DELETE'
				});
			});
			this.setState({selected: [] });
		}
	}

	render() {
		const {rows} = this.props
		const {data} = this.state
		
		return (
			<div>
				{/* QuanLyPhong */}
				<Table1
					rows={rows} 
					items={data} 
					handleDelete = {this.handleDelete}  
				/>
			</div>
		)
	}
}

class QuanLyPhong extends Component {
	state = {
		rows : [
			{ id: 'id', numeric: false, disablePadding: false, label: 'Id' },
			{ id: 'name', numeric: false, disablePadding: false, label: 'Tên tài sản' },
			{ id: 'function', numeric: false, disablePadding: true, label: 'Chức năng', function:['edit', 'add'] },
		],
	}

	render1 = () => {
		const { match } = this.props
		const { rows } = this.state
		return (
			<QLCSVCContext.Consumer>
				{({ resource, deleteContextPhong}) => {
					
					return (
						<PhongComponent 
							rows={rows} 
							resource={resource}  
							deleteContextPhong={deleteContextPhong} 
							match={match}
							
						/>
					)
				}}
			</QLCSVCContext.Consumer>
		);
	}
	addAPIPhong = (id, name,id_donvi) => {
		console.log("[QL Phong] name: ", name);
		axios.post(`http://localhost:5500/phong`, {name,id_donvi})
		.then(res => {
		})
	}

	editAPIPhong = ({id, name,id_donvi}) => {
		console.log("[QL Phong] id_donvi: ", id_donvi);
		axios.put(`http://localhost:5500/phong/${id}`, {id, name,id_donvi})
		.then(res => {
			console.log("Edit done");
		})
	}

	render() {
		const { match } = this.props
		const { rows } = this.state
		return (
			// <div>
			// 	QuanLyPhong
			// 	{getParentPath(match.url)}
			// </div>
			<Switch>
				<Route exact path="/donvi/:name/quanlyphong" exact render={this.render1}></Route>
				<Route path="/donvi/:name/quanlyphong/add" render={() => <AddPhong addAPIPhong={this.addAPIPhong} />}></Route>
				<Route path="/donvi/:name/quanlyphong/edit/:id" component={() => <EditPhong editAPIPhong={this.editAPIPhong} />}></Route>
			</Switch>
		);
	}
}

export default withRouter(QuanLyPhong);
