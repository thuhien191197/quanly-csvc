import React, { Component } from 'react';
import { withRouter } from "react-router";

import './SideBar.css';

import Content from "../Content/Content";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MenuLink from "../../general/MenuLink";

const mapUrlToId = {
	donvi: 2,
	danhmuc: 3,

}

const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[1]

class SlideBar extends Component {

	state = {
		itemsDonvi: [],
		itemsDanhMuc: [],
		tree : [
			{
				id: 0,
				name: "Home",
				isOpen: false,
			},
			{
				id: 1,
				name: "User",
				isOpen: false,
			},
			{
				id: 2,
				name: "Đơn vị",
				isOpen: false,
				// children: [
				// 	{
				// 		name: "Khoa CNTT",
				// 		id: 0,
				// 	},
				// 	{
				// 		name: "Khoa Hóa",
				// 		id: 1,
				// 	},
				// 	{
				// 		name: "Phòng Đào tạo",
				// 		id: 2,
				// 	}
				// ]
			},
			{
				id: 3,
				name: "Danh mục",
				isOpen: false,
			},
			{
				id: 4,
				name: "Tài sản",
				isOpen: false,
			},
			{
				id: 5,
				name: "Kế hoạch",
				isOpen: false,
			}
		]
	};

	componentDidMount(){
		const { location } = this.props
		// console.log('>Location', location)
		const parentId = getParentPath(location.pathname)
		const id = mapUrlToId[parentId]
		console.log(">>>>id : " +id)
		this.toggleDropdown(id)

		// fetch('https://5be3c0cfd53daf0013250f97.mockapi.io/api/donvi')
		// 	.then(res => res.json())
		// 	.then(json => {
		// 		this.setState({
		// 			itemsDonvi: json
		// 		})
		// 	});

		fetch('http://localhost:5500/donvi')
		.then(res => res.json())
		.then(json => {
			this.setState({
				itemsDonvi: json
			})
		});
		// fetch('https://5be3c0cfd53daf0013250f97.mockapi.io/api/danhmuc')
		// 	.then(res => res.json())
		// 	.then(json => {
		// 		this.setState({
		// 			itemsDanhMuc: json
		// 	})
		// })
		fetch('http://localhost:5500/danhmuc')
			.then(res => res.json())
			.then(json => {
				this.setState({
					itemsDanhMuc: json
			})
		})

			
	}
	toggleDropdown = (id, key) => {
		// console.log("id" + id);
		// console.log("key" + key);
		var { tree } = this.state
		if(!id){
			return
		}
		tree[id].isOpen = !tree[id].isOpen
		// console.log("isOpen" + tree[id].isOpen );
		this.setState({
			tree: tree
		})
		
	  }

	// toggleDropdown(id) {
	// 	this.setState({
	// 	  isOpen: !this.state.isOpen
	// 	});

	// }

	render() {
		var {tree, itemsDonvi, itemsDanhMuc} = this.state;
		
		return (
			<div>
				<div className="s-layout">
					<div className="s-layout__sidebar">
						
						<div className="s-sidebar__trigger" href="#0">
							<i className="fa fa-bars"></i>
							<ul className="pull-right">
								<li className="rad-dropdown no-color bell">
									<a href="#">
										<i className="fas fa-bell"></i>
									</a>
								</li>
								<li className="rad-dropdown no-color">
									<a href="#">
										<img className="rad-list-img sm-img" alt="IMG_0432 - 3x4" src="https://farm2.staticflickr.com/1738/42575021701_788f8b74b0_z.jpg"/>
									</a>
									
								</li>
								<li className="rad-dropdown no-color">
									<a href="#">
										<i className="fa fa-cog"></i>
									</a>
								</li>
								
							</ul>
						</div>
						
						<nav className="s-sidebar__nav" id="style-4">
      						<div className="force-overflow"></div>
							
							<div className="s-sidebar__nav-avartar">
								
								<img className="s-sidebar__nav-avartar-image" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Logo_dhbkdn.jpg"  />
								{/* style={{width:'55px', height:'55px' }} */}
								<span className="s-sidebar__nav-avartar-csvc">Quản Lý Cơ sở vật chất</span>
								
							</div>
							<ul>
								<li>
									<MenuLink className="s-sidebar__nav-link" activeOnlyWhenExact={true} to="/" label="Home" nameIcon="fa fa-home" />
								</li>
								<li>
									<MenuLink className="s-sidebar__nav-link" to="/user" label="User" nameIcon="fa fa-user" />
								</li>
								<li >
									<div onClick={() => this.toggleDropdown(2,2)}>
										{/* <Link to="/donvi" className="s-sidebar__nav-link">
											<i class="fas fa-landmark"></i><em>Đơn vị</em>
										</Link> */}
										<MenuLink className="s-sidebar__nav-link" to="/donvi" label="Đơn vị" nameIcon="fas fa-landmark" />
									</div>
									
									{tree[2].isOpen
									?
										<ul>
											{itemsDonvi.map(item => (
												<li className="li" key={item.id}>
													{/* <Link to={`${match.url}/rendering`}> */}
													{/* <a className="s-sidebar__nav-linksub" href="#0">
														<i class="fas fa-angle-right"></i><em>{item.name}</em>
													</a> */}
													{/* </Link> */}
													{/* <MenuLink className="s-sidebar__nav-linksub" to={`donvi/${item.name}`} label={item.name} nameIcon="fas fa-landmark" /> */}
													<MenuLink className="s-sidebar__nav-linksub" to={{
														pathname: '/donvi' + '/' + item.name + '/' + item.id + '/',
													}} label={item.name} nameIcon="fas fa-angle-right" />

												
												</li>
											))}
										</ul>
									:
										''
									}
									
								</li>
								<li>
									<div onClick={() => this.toggleDropdown(3,3)}>
										<MenuLink className="s-sidebar__nav-link" to="/danhmuc" label="Danh mục" nameIcon="fas fa-list-ul" />
										{/* <Link to="/danhmuc" className="s-sidebar__nav-link">
											<i className="fas fa-list-ul"></i><em>Danh mục</em>
										</Link> */}
									</div>
									{tree[3].isOpen
									?
									<ul>
										<li className="li">
											<MenuLink className="s-sidebar__nav-linksub" to="/danhmuc" label="Quản lý danh mục" nameIcon="fas fa-angle-right" />
											{/* <a className="s-sidebar__nav-linksub" href="#0">
												<i class="fas fa-angle-right"></i><em>Quản lý danh mục</em>
											</a> */}
										</li>
										{itemsDanhMuc.map(item => (
											<li className="li" key={item.id}>
													<MenuLink className="s-sidebar__nav-linksub" to={{
														pathname: '/danhmuc' + '/' + item.name + '/' + item.id + '/',
													}} label={item.name} nameIcon="fas fa-angle-right" />
												{/* <a className="s-sidebar__nav-linksub" href="#0">
													<i class="fas fa-angle-right"></i><em>{item.name}</em>
												</a> */}
											</li>
										))}
									
										<li className="li">
										<MenuLink className="s-sidebar__nav-linksub" to="/danhmuc/nguonkinhphi" label="Ngườn kinh phí" nameIcon="fas fa-angle-right" />
											{/* <a className="s-sidebar__nav-linksub" href="#0">
												<i className="fa fa-home"></i><em>Ngườn kinh phí</em>
											</a> */}
										</li>
									</ul>
									:
									''
									}
								</li>
								<li>
									<div onClick={() => this.toggleDropdown(4,4)}>
										<MenuLink className="s-sidebar__nav-link" to="/taisan" label="Tài sản" nameIcon="fas fa-warehouse" />
										{/* <Link to="/taisan" className="s-sidebar__nav-link">
											<i className="fas fa-warehouse"></i><em>Tài sản</em>
										</Link> */}
									</div>
									{tree[4].isOpen
									?
									<ul>
										<li className="li">
										<MenuLink className="s-sidebar__nav-linksub" to="/taisan" label="Quản lý tài sản" nameIcon="fas fa-angle-right" />
											{/* <a className="s-sidebar__nav-linksub" href="#0">
												<i className="fas fa-angle-right"></i><em>Quản lý tài sản</em>
											</a> */}
										</li>
										<li  className="li">
											<MenuLink className="s-sidebar__nav-linksub" to={{
														pathname: '/taisan/Điều chuyển tài sản' ,
											}} label="Điều chuyển tài sản" nameIcon="fas fa-angle-right" />
											{/* <a className="s-sidebar__nav-linksub" href="#0">
												<i className="fas fa-angle-right"></i><em>Điều chuyển tài sản</em>
											</a> */}
										</li>
										<li  className="li">
											<MenuLink className="s-sidebar__nav-linksub" to={{
														pathname: '/taisan/Thanh lý' ,
													}} label="Thanh lý" nameIcon="fas fa-angle-right" />
											{/* <a className="s-sidebar__nav-linksub" href="#0">
												<i className="fas fa-angle-right"></i><em>Thanh lý</em>
											</a> */}
										</li>
										<li  className="li">
											<MenuLink className="s-sidebar__nav-linksub" to={{
														pathname: '/taisan/Thống kê' ,
											}} label="Thống kê" nameIcon="fas fa-angle-right" />
											{/* <a className="s-sidebar__nav-linksub" href="#0">
												<i className="fas fa-angle-right"></i><em>Thống kê</em>
											</a> */}
										</li>
									</ul>
									:
										''
									}
								</li>
								<li >
									<div onClick={() => this.toggleDropdown(5,5)}>
									<MenuLink className="s-sidebar__nav-link" activeOnlyWhenExact={true} to="/kehoach" label="Kế hoạch" nameIcon="fas fa-book" />
										{/* <Link to="/kehoach" className="s-sidebar__nav-link">
											<i className="fas fa-book"></i><em>Kế hoạch</em>
										</Link> */}
									</div>
									{tree[5].isOpen
									?
										<ul>
											<li className="li">
												<MenuLink className="s-sidebar__nav-linksub" to={{
															pathname: '/kehoach' ,
												}} label="Kế hoạch" nameIcon="fas fa-angle-right" />
												{/* <a className="s-sidebar__nav-linksub" href="#0">
													<i className="fas fa-angle-right"></i><em>Kế hoạch</em>
												</a> */}
											</li>
											<li  className="li">
												<MenuLink className="s-sidebar__nav-linksub" to={{
															pathname: '/kehoach/Văn bản mẫu' ,
												}} label="Văn bản mẫu" nameIcon="fas fa-angle-right" />
												{/* <a className="s-sidebar__nav-linksub" href="#0">
													<i className="fas fa-angle-right"></i><em>Văn bản mẫu</em>
												</a> */}
											</li>
										</ul>
									:
										''
									}
								</li>
								
							</ul>
						</nav>
					</div>

					<main className="s-layout__content">
						<Content />
					</main>
					
				</div>
			</div>
			
		);
	}
}

export default withRouter(SlideBar);
