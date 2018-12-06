// import React, { Component } from 'react';

// const menu = {
// 	donvi: {
// 		label: 'Donvi',
// 		route: '/dv',
// 		icon: 'smile',
// 	},
// 	qldm: {
// 		label: 'Quan Ly danh muc',
// 		route: '/qldm',
// 		// component: KeHoach
// 		children: {
// 			nguoiKinhPhi: {
// 				label: ' Nguoi Kinh Phi',
// 				route: '/nkp'
// 			}
// 		}
// 	}
// }
// class SildeBar {
// 	render() {

// 	}
// 	componentDidMount() {
// 		const qldm = axios.get('http://something.org')
// 		// [{id: "1", name: "Thiết bị"}, {id: "2", name: "Dụng cụ"}]
// 		const donvi = axios.get('http://something.org')
// 		// [{id: "1", name: "Phòng đào tạo"}, {id: "2", name: "Phòng CTSV"}, {id: "3", name: "Khoa CNTT"},…

// 	}
// }


// class SideBar {
// 	state = {
// 		tree: {
// 			donvi: {

// 			},
// 			danhmuc: {

// 			}
// 		}
// 	}
	
// 	addChildren(key, data) {
// 		this.setState(({tree}) => ({
// 			tree: {
// 				...tree,
// 				[key]: {
// 					...tree[key],
// 					children: data,
// 				}
// 			}
// 		})
// 	)}

// 	async componentDidMount() {
// 		// Handle Fetch 

// 		const donvi = await axios.get('http://localhost:5500/donvi')
// 		const danhmuc = await axios.get('http://localhost:5500/danhmuc')
// 		this.addChildren('donvi', donvi)
// 		this.addChildren('danhmuc', danhmuc)
// 	}

// 	render() {
// 		const {tree} = this.state
// 		const parentKey = Object.keys(tree) // ['donvi', 'danhmuc']
// 		parentKey.map((key) => {
// 			const childrenKeys = Object.keys(tree[key].children) //{ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…} }
// 			return (
// 				<div className="parent">
// 					{tree[key].label}
// 					{childrenKeys.map((keyChildren)=>{

// 					})}
// 				</div>
// 			)
// 		})
// 	}
// }