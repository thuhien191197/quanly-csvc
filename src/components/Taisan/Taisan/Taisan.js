import React, { Component } from 'react';
import './Taisan.css';
// import Table from './component/Table';
import Table1 from '../../../general/Table/Table'

class Taisan extends Component {
	state = {
		rows : [
			{ id: 'id_taisan', numeric: true, disablePadding: false, label: 'Id' },
			{ id: 'name', numeric: false, disablePadding: false, label: 'Tên tài sản' },
			{ id: 'dongia', numeric: false, disablePadding: false, label: 'Đơn giá' },
			{ id: 'soluong', numeric: false, disablePadding: true, label: 'Số lượng' },
			{ id: 'ngaynhap', numeric: false, disablePadding: false, label: 'Ngày nhập' },
			{ id: 'id_loaitaisan', numeric: false, disablePadding: false, label: 'Loại tài sản' },
			{ id: 'id_donvi', numeric: false, disablePadding: false, label: 'Đơn vị' },
			{ id: 'id_user', numeric: false, disablePadding: false, label: 'Người nhập' },
		],
		itemsTaisan: [],
		itemsTable:[]
	}

	componentDidMount(){
		fetch('https://5bf551f82a6f080013a34e67.mockapi.io/api/taisan')
			.then(res => res.json())
			.then(json => {
				var b =[]
				{json.map(item => {
					const a = {'id_taisan' :item.id_taisan, 'name': item.name, 'dongia': item.dongia, 'soluong': item.soluong, 'ngaynhap': item.ngaynhap, 'id_loaitaisan': item.id_loaitaisan, 'id_donvi':item.id_donvi, 'id_user': item.id_user};
					// const a = [item.id_taisan, item.name, item.dongia, item.soluong, item.ngaynhap, item.id_loaitaisan, item.id_donvi, item.id_user]
					b.push(a);
				})}
			
				// console.log("json:",json)
				this.setState({
					itemsTaisan: json,
					itemsTable: b
				
				})
		});
		
	}

	render() {
		
		// console.log("DATA:",this.state);
		
		const { itemsTable } = this.state;
		return (
			
			<div>Taisan
				<Table1 rows={this.state.rows} items={itemsTable}/>
			</div>
		);
	}
}

export default Taisan;
