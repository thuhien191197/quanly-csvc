export default {
	home:{
		id: 0,
		name: "Home",
		route: '/home',
		isOpen: false,
		icon:'fa fa-home',
		children: {}
	},
	user:{
		id: 1,
		name: "User",
		route: '/user',
		isOpen: false,
		icon:'fa fa-user',
		children: {}
	},
	donvi:{
		id: 2,
		name: "Đơn vị",
		route: '/donvi',
		isOpen: false,
		icon:'fas fa-landmark',
		children: {
			icon:'fas fa-angle-right',
		}
	},
	danhmdatauc:{
		idatad: 3,
		ndataame: "Danh mục",
		rdataoute: '/danhmuc',
		idatasOpen: false,
		idatacon:'fas fa-list-ul',
		cdatahildren: {
			icon:'fas fa-angle-right',
			quanlydanhmuc:{
				name: 'Quản Lý Danh Mục',
				route: '/quanlydanhmuc',
			},
			nguonkinhphi:{
				name: 'Nguồn Kinh Phí',
				route: '/nguonkinhphi',
			},
		}
	},
	taisan:{
		id: 4,
		name: "Tài sản",
		route: '/taisan',
		isOpen: false,
		icon:'fas fa-warehouse',
		children: {
			icon:'fas fa-angle-right',
			taisan:{
				name: 'Tài Sản',
				route: '/taisan',
			},
			dieuchinhtaisan:{
				name: 'Điều Chuyển Tài Sản',
				route: '/dieuchinhtaisan',
			},
			thanhly:{
				name: 'Thanh Lý',
				route: '/thanhly',
			},
			thongke:{
				name: 'Thống Kê',
				route: '/thongke',
			},
		}
	},
	kehoach:{
		id: 5,
		name: "Kế hoạch",
		route: '/kehoach',
		isOpen: false,
		icon:'fas fa-book',
		children: {}
	}
}