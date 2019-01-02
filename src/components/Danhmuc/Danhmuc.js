import React, { Component } from 'react';
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom'
import './Danhmuc.css';
import axios from 'axios';
import LoaiTaiSan from './LoaiTaiSan';
import * as R from 'ramda';
import NguonKinhPhi from './NguonKinhPhi';
import { QLCSVCContext } from '../Main/Main';

import Table1 from '../../general/Table/Table';
import NavBar from '../../general/NavBar/NavBar';
import AddDM from './component/AddDM/AddDM';
import EditDM from './component/EditDM/EditDM';

const getParentPathTitle = (path) => path.split('/').length > 0 && path.split('/')[1]

class DanhmucComponent extends Component {
	constructor(props) {
		super(props);
		const data = this.handleGetListTable(props.resource || []);
		console.log("[Danhmuc] props.resource :", props.resource )
		this.state = {
			data,
			selectedTS: []
		}
	}

	handleGetListTable = (resourceTS) =>{
		var itemsDanhmuc = resourceTS.danhmuc
		console.log("[Danhmuc] itemsDanhmuc:", itemsDanhmuc)
		var b =[]
		var length = itemsDanhmuc.length
		for(var i = 0; i < length; i++){
			var item = itemsDanhmuc[i]
			const a = {
				'id' :item.id, 
				'name': item.name, 
			};
			b.push(a);
		}
		return b
	}

	componentWillReceiveProps(props, state) {
		// console.log("Next props", props);
		const data = this.handleGetListTable(props.resource || []);
		this.setState({
			data,
		})
	}

	handleDelete = (selected) => {
		// console.log("[TaiSan] props:", this.props)
		var itemsDanhmuc = this.props.resource.danhmuc;
		const dataDeleted = R.reject((item) => selected.indexOf(item.id)!== -1, itemsDanhmuc);
		this.props.deleteContextDanhMuc(dataDeleted);
		
		
		selected.forEach(function(select, i) {
			fetch('http://localhost:5500/danhmuc/'+ select, {
				method: 'DELETE'
			});
		});
		// this.setState({selected: [] });
	}

	render() {
		const { rows,  } = this.props;
		const { data } = this.state;
		// console.log("[TaiSan] openDC:", this.state.openDieuChuyen)
		return (
			<div>
				<Table1 
					rows={rows} 
					items={data} 
					handleDelete = {this.handleDelete}  
				/>
			</div>
		)
	}
}

class Danhmuc extends Component {
	state = {
		rows : [
			{ id: 'id', numeric: false, disablePadding: false, label: 'Id' },
			{ id: 'name', numeric: false, disablePadding: false, label: 'Tên danh mục' },
			{ id: 'function', numeric: false, disablePadding: false, label: 'Chức năng', function:['edit'] },
		],

		navBar : {
			danhsachTS:{
				route:"/danhmuc",
				title: "Tất cả danh mục danh mục",
				// component: "DanhSachTaiSan"
			},
		}
	}

	renderDanhMuc = () => {
		const { match, classes } = this.props
		const { rows, navBar } = this.state
		const parentKey = Object.keys(navBar)
		return (
			<QLCSVCContext.Consumer>
				{({ resource, deleteContextDanhMuc}) => {
					console.log("[Danhmuc] resource:", resource)
					return (
						<div>
							
							<NavBar
								match={match}
								classes={classes}
								parentKey={parentKey}
								navBar={navBar}
								title= {"Danh mục"}
							/>
							<DanhmucComponent 
								rows={rows} 
								resource={resource}  
								deleteContextDanhMuc={deleteContextDanhMuc} 
								match={match}
							/>
						</div>
					)
				}}
			</QLCSVCContext.Consumer>
		);
	}

	addAPIDanhSach = ({id, name}) => {
		axios.post(`http://localhost:5500/danhmuc`, { name})
		.then(res => {
		})
		// console.log("[TaiSan] name:",name)
	}

	editAPIDanhSach = ({id,name}) => {
		// console.log('Edit item server', id);
		axios.put(`http://localhost:5500/danhmuc/${id}`, {id, name})
		.then(res => {
			console.log("Edit done");
		})
      
	}

	render() {
		const { match, classes } = this.props
		const { navBar } = this.state;
		return (
			<div>
				<Switch>
					<Route path="/danhmuc" exact render={this.renderDanhMuc}></Route>
					<Route exact path="/danhmuc/add" component={() => <AddDM addAPIDanhSach={this.addAPIDanhSach} />}></Route>
					<Route exact path="/danhmuc/edit/:id" component={() => <EditDM editAPIDanhSach={this.editAPIDanhSach} />}></Route>
					{/* <Route exact path="/danhmuc/Loại tài sản" render={() => <LoaiTaiSan />} /> */}
					{/* <Route exact path="/danhmuc/Nguồn kinh phí" render={() => <NguonKinhPhi />} /> */}
					<NguonKinhPhi />
				</Switch>
			</div>
		);
	}
}

export default withRouter(Danhmuc);
