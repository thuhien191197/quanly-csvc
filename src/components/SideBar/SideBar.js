import React, { Component } from 'react';
import './SideBar.css';


class SlideBar extends Component {
	constructor(props) {
		super(props);
	   
		this.state = {
			itemsUsers: [],
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
	}

	componentDidMount(){
		fetch('https://5be3c0cfd53daf0013250f97.mockapi.io/api/donvi')
			.then(res => res.json())
			.then(json => {
				this.setState({
					itemsUsers: json
				})
			});
		fetch('https://5be3c0cfd53daf0013250f97.mockapi.io/api/danhmuc')
			.then(res => res.json())
			.then(json => {
				this.setState({
					itemsDanhMuc: json
			})
		})

			
	}
	toggleDropdown = (id, key) => {
		console.log("id" + id);
		console.log("key" + key);
		// console.log("thử: " + tree[id].isOpen ?'true':'false');
		var { tree } = this.state
		
		tree[id].isOpen = !tree[id].isOpen
		console.log("isOpen" + tree[id].isOpen );
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
		var {tree, itemsUsers, itemsDanhMuc} = this.state;
		
		return (
			<div className="s-layout">
				
				<div className="s-layout__sidebar">
					<div className="trigger">
					<a className="s-sidebar__trigger" href="#0">
						<i className="fa fa-bars"></i>
					</a>
					</div>

					<nav className="s-sidebar__nav">
						<div className="s-sidebar__nav-avartar">
							<a href="#">α</a>
						</div>
						<div className="s-sidebar__nav-user">
							<a>Admin</a>
						</div>
						<ul>
							<li>
								<a className="s-sidebar__nav-link" href="#0">
									<i className="fa fa-home"></i><em>Home</em>
								</a>
							</li>
							<li>
								<a className="s-sidebar__nav-link" href="#0">
									<i className="fa fa-user"></i><em>User</em>
								</a>
							</li>
							<li >
								<div onClick={() => this.toggleDropdown(2,2)}>
									<a className="s-sidebar__nav-link" href="#0">
										<i class="fas fa-landmark"></i><em>Đơn vị</em>
									</a>
								</div>
								{tree[2].isOpen
								?
									<ul>
										{itemsUsers.map(item => (
											<li className="li" key={item.id_donvi}>
												<a className="s-sidebar__nav-linksub" href="#0">
													<i class="fas fa-angle-right"></i><em>{item.name}</em>
												</a>
											</li>
										))}
									</ul>
								:
									''
								}
								
							</li>
							<li>
								<div onClick={() => this.toggleDropdown(3,3)}>
									<a className="s-sidebar__nav-link" href="#0">
										<i className="fas fa-list-ul"></i><em>Danh mục</em>
									</a>
								</div>
								{tree[3].isOpen
								?
								<ul>
									<li className="li">
										<a className="s-sidebar__nav-linksub" href="#0">
											<i class="fas fa-angle-right"></i><em>Quản lý danh mục</em>
										</a>
									</li>
									{itemsDanhMuc.map(item => (
										<li className="li" key={item.id_danhmuc}>
											<a className="s-sidebar__nav-linksub" href="#0">
												<i class="fas fa-angle-right"></i><em>{item.name}</em>
											</a>
										</li>
									))}
								
									<li className="li">
										<a className="s-sidebar__nav-linksub" href="#0">
											<i className="fa fa-home"></i><em>Ngườn kinh phí</em>
										</a>
									</li>
								</ul>
								:
								''
								}
							</li>
							<li>
								<div onClick={() => this.toggleDropdown(4,4)}>
									<a className="s-sidebar__nav-link" href="#0">
										<i class="fas fa-warehouse"></i><em>Tài sản</em>
									</a>
								</div>
								{tree[4].isOpen
								?
								<ul>
									<li className="li">
										<a className="s-sidebar__nav-linksub" href="#0">
											<i class="fas fa-angle-right"></i><em>Quản lý tài sản</em>
										</a>
									</li>
									<li  className="li">
										<a className="s-sidebar__nav-linksub" href="#0">
											<i class="fas fa-angle-right"></i><em>Điều chuyển tài sản</em>
										</a>
									</li>
									<li  className="li">
										<a className="s-sidebar__nav-linksub" href="#0">
											<i class="fas fa-angle-right"></i><em>Thanh lý</em>
										</a>
									</li>
									<li  className="li">
										<a className="s-sidebar__nav-linksub" href="#0">
											<i class="fas fa-angle-right"></i><em>Thống kê</em>
										</a>
									</li>
								</ul>
								:
									''
								}
							</li>
							<li >
								<div onClick={() => this.toggleDropdown(5,5)}>
									<a className="s-sidebar__nav-link" href="#0">
										<i class="fas fa-book"></i><em>Kế hoạch</em>
									</a>
								</div>
								{tree[5].isOpen
								?
									<ul>
										<li className="li">
											<a className="s-sidebar__nav-linksub" href="#0">
												<i class="fas fa-angle-right"></i><em>Kế hoạch</em>
											</a>
										</li>
										<li  className="li">
											<a className="s-sidebar__nav-linksub" href="#0">
												<i class="fas fa-angle-right"></i><em>Văn bản mẫu</em>
											</a>
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
					<h1>Full View, Please!</h1>
				</main>
				
			</div>
		);
	}
}

export default SlideBar;
