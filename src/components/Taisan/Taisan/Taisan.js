import React, { Component } from 'react';
import './Taisan.css';
// import Table from './component/Table';
import Table1 from '../../../general/Table/Table'
// import App from './component/App/App'
import * as R from 'ramda';

class Taisan extends Component {
	state = {
		rows : [
			{ id: 'id', numeric: true, disablePadding: false, label: 'Id' },
			{ id: 'name', numeric: false, disablePadding: false, label: 'Tên tài sản' },
			{ id: 'dongia', numeric: false, disablePadding: false, label: 'Đơn giá' },
			{ id: 'soluong', numeric: false, disablePadding: true, label: 'Số lượng' },
			{ id: 'ngaynhap', numeric: false, disablePadding: false, label: 'Ngày nhập' },
			{ id: 'id_loaitaisan', numeric: false, disablePadding: false, label: 'Loại tài sản' },
			{ id: 'id_donvi', numeric: false, disablePadding: false, label: 'Đơn vị' },
			{ id: 'id_user', numeric: false, disablePadding: false, label: 'Người nhập' },
		],
		itemsTaisan: [],
		itemsTable:[],
		selectApp : 'AppTS',
		loaitaisan: '',
		donvi:'',
		user:''
	}

	componentDidMount(){
		fetch('http://localhost:5500/taisan')
		.then(res => res.json())
		.then(json => {
			var b =[]
			{json.map(item => {
				const a = {'id' :item.id, 'name': item.name, 'dongia': item.dongia, 'soluong': item.soluong, 'ngaynhap': item.ngaynhap, 'id_loaitaisan': item.id_loaitaisan, 'id_donvi':item.id_donvi, 'id_user': item.id_user};
				b.push(a);
			})}
				this.setState({
					itemsTaisan: json,
					itemsTable: b
				
				})
		});
		
	}

	handleGetListTable = (itemsTaisan) =>{
		var b =[]
		
		itemsTaisan.map(item => {
			
			fetch('http://localhost:5500/loaitaisan/'+ item.id_loaitaisan)
				.then(res => res.json())
				.then(json1 => {
					this.setState({
						loaitaisan : json1.name
					})
					
					
			})
			
			fetch('http://localhost:5500/donvi/'+ item.id_donvi)
				.then(res => res.json())
				.then(json2 => {
					this.setState({
						donvi : json2.name
					})
			})
			

			fetch('http://localhost:5500/user/'+ item.id_user)
				.then(res => res.json())
				.then(json3 => {
					this.setState({
						user : json3.fullname
					})
			})
			
			const a = {'id' :item.id, 'name': item.name, 'dongia': item.dongia, 'soluong': item.soluong, 'ngaynhap': item.ngaynhap, 'id_loaitaisan': this.state.loaitaisan, 'id_donvi':this.state.donvi, 'id_user': this.state.user};
			b.push(a);
		})
		this.setState({
			itemsTable: b
		})
	}

	// handleDelete(selected){
	// 	const data = this.state.itemsTable.filter(i => 
	// 		selected.filter(j => i.id === j)
	// 	)
	// 	this.setState({items : data})
	// }

	handleDelete = (selected) => {
		const dataDeleted = R.reject((item) => selected.indexOf(item.id)!== -1, this.state.itemsTable)
		// console.log("dataDeleted:",dataDeleted )
		this.setState({ itemsTable: dataDeleted, selected: [] })
		console.log(">>><<<>>selected:",selected )
		
		// selected.forEach(function(select, i) {
		// 	// console.log("-------->select:::",select)
		// 	setTimeout(() => {
		// 		fetch('https://5bf551f82a6f080013a34e67.mockapi.io/api/taisan/'+ select, {
		// 		method: 'DELETE'
		// 	});
		// 	}, i*100)
		// });

		selected.forEach(function(select, i) {
			// console.log("-------->select:::",select)
			setTimeout(() => {
				fetch('http://localhost:5500/taisan/'+ select, {
				method: 'DELETE'
			});
			})
		});
    }

	render() {
		const { itemsTable } = this.state;
		console.log("-------->itemsTaiSan",this.state.itemsTaisan)
		// this.handleGetListTable(this.state.itemsTaisan)
		return (
			
			<div>Taisan
				
				<Table1 rows={this.state.rows} items={itemsTable} handleDelete={this.handleDelete}  selectApp={this.state.selectApp}/>
			</div>
		);
	}
}

export default Taisan;
