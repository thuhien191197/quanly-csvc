import React, { Component } from 'react';
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom'
import './Danhmuc.css';
import axios from 'axios';
import * as R from 'ramda';
import { QLCSVCContext } from '../Main/Main';

import Table1 from '../../general/Table/Table';
import NavBar from '../../general/NavBar/NavBar';
import AddKP from './component/AddKP/AddKP';
import EditKP from './component/EditKP/EditKP';
import { FormattedMessage } from "react-intl";

const getParentPathTitle = (path) => path.split('/').length > 0 && path.split('/')[1]

class KinhphiComponent extends Component {
	constructor(props) {
		super(props);
		const data = this.handleGetListTable(props.resource || []);
		console.log("[Danhmuc] props.resource :", props.resource )
		this.state = {
			data,
			selectedTS: []
		}
	}

	handleGetListTable = (resourceKP) =>{
		var itemsKinhPhi = resourceKP.nguonkinhphi
		console.log("[Kinh phi] itemsKinhPhi:", itemsKinhPhi)
		var b =[]
		var length = itemsKinhPhi.length
		for(var i = 0; i < length; i++){
			var item = itemsKinhPhi[i]
			const a = {
				'id' :item.id, 
				'name': item.name, 
				'tongngansach': item.tongngansach,
				'tongchi': item.tongchi,
				'tongthanhly': item.tongthanhly
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
		if(window.confirm('Bạn có chắc muốn xóa không?')){
			var itemsKinhPhi = this.props.resource.nguonkinhphi;
			const dataDeleted = R.reject((item) => selected.indexOf(item.id)!== -1, itemsKinhPhi);
			this.props.deleteContextKinhPhi(dataDeleted);
			
			selected.forEach(function(select, i) {
				fetch('http://localhost:5500/nguonkinhphi/'+ select, {
					method: 'DELETE'
				});
			});
			this.setState({selected: [] });
		}
	}

	render() {
		const { rows,  } = this.props;
		const { data } = this.state;
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

class NguonKinhPhi extends Component {

	constructor(props) {
		let name = <FormattedMessage id="danhmuc.nguonkinhphi.table.name" defaulMesage="Tên nguồn kinh phí" />
		let tongngansach = <FormattedMessage id="danhmuc.nguonkinhphi.table.tongngansach" defaulMesage="Tổng ngân sách" />
		let tongchi = <FormattedMessage id="danhmuc.nguonkinhphi.table.tongchi" defaulMesage="Tổng chi" />
		let tongthanhly = <FormattedMessage id="danhmuc.nguonkinhphi.table.tongthanhly" defaulMesage="Tổng thanh lý" />
		let functions = <FormattedMessage id="danhmuc.nguonkinhphi.table.functions" defaulMesage="Chức năng" />

		
		
		super(props);
		this.state = {		
			rows : [
				{ id: 'id', numeric: false, disablePadding: false, label: 'Id' },
				{ id: 'name', numeric: false, disablePadding: false, label: name },
				{ id: 'tongngansach', numeric: false, disablePadding: false, label: tongngansach},
				{ id: 'tongchi', numeric: false, disablePadding: false, label: tongchi },
				{ id: 'tongthanhly', numeric: false, disablePadding: false, label: tongthanhly },
				{ id: 'function', numeric: false, disablePadding: false, label: functions, function:['edit', 'add'] },
			],
	
			navBar : {
				danhsachKP:{
					route:"/danhmuc",
					title: "Tất cả nguồn kinh phí",
					messageId : "danhmuc.nguonkinhphi"
					// component: "DanhSachTaiSan"
				},
			}
		}
	}

	renderKinhPhi = () => {
		const { match, classes } = this.props
		const { rows, navBar } = this.state
		const parentKey = Object.keys(navBar)
		return (
			<QLCSVCContext.Consumer>
				{({ resource, deleteContextKinhPhi}) => {
					console.log("[Danhmuc] resource:", resource)
					return (
						<div>
							<NavBar
								match={match}
								classes={classes}
								parentKey={parentKey}
								navBar={navBar}
								title= {"danhmuc.nguonkinhphi"}
							/>
							<KinhphiComponent 
								rows={rows} 
								resource={resource}  
								deleteContextKinhPhi={deleteContextKinhPhi} 
								match={match}
							/>
						</div>
					)
				}}
			</QLCSVCContext.Consumer>
		);
	}

	addAPIKinhPhi = ({id,name, tongngansach, tongchi, tongthanhly}) => {
		axios.post(`http://localhost:5500/nguonkinhphi`, {name, tongngansach, tongchi, tongthanhly})
		.then(res => {
		})
		// console.log("[TaiSan] name:",name)
	}

	editAPIKinhPhi = ({id,name, tongngansach, tongchi, tongthanhly}) => {
		// console.log('Edit item server', id);
		axios.put(`http://localhost:5500/nguonkinhphi/${id}`, {id,name, tongngansach, tongchi, tongthanhly})
		.then(res => {
			console.log("Edit done");
		})
      
	}

	render() {
		return (
			<div>
				<Switch>
					<Route path="/danhmuc/Nguồn Kinh Phí" exact render={this.renderKinhPhi}></Route>
					<Route exact path="/danhmuc/Nguồn Kinh Phí/add" component={() => <AddKP addAPIKinhPhi={this.addAPIKinhPhi} />}></Route>
					<Route exact path="/danhmuc/Nguồn Kinh Phí/edit/:id" component={() => <EditKP editAPIKinhPhi={this.editAPIKinhPhi} />}></Route>
				</Switch>
			</div>
		);
	}
}

export default withRouter(NguonKinhPhi);
