import React, { Component } from 'react';
import { withRouter } from "react-router";
import _ from 'lodash';
import './Main.css';
import axios from 'axios'
import Content from "../Content/Content";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MenuLink from "../../general/MenuLink";
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';

import { IntlProvider } from 'react-intl';
import { FormattedMessage } from "react-intl";


const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[1]


const styles = theme => ({
	margin: {
		margin: theme.spacing.unit * (-5),
		color: "white",
		marginBottom: '-24px'
	},
	padding: {
	  	padding: `0 ${theme.spacing.unit * 2}px`,
	},
	avatar:{
		marginTop: "-4px"
	},
	menuItems:{
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
		overflowX: 'auto',
		wordBreak: "break-word",
		maxHeight: 300,
		opacity: "1",
	},
	popperNoti:{
		marginLeft: '-144px'
	},
	user:{
		marginTop: '-13px'
	},
	popperUser:{
		marginLeft: '-80px'
	}
});

export const resource = {
	user:[],
	role:[],
	danhmuc:[],
	loaitaisan:[],
	donvi:[],
	phong:[],
	nguonkinhphi:[],
	taisan:[],
	chuyentaisan:[],
	thanhly:[],
	thongbao:[]
}

const editContextTS = () => {};
const addContextTS = () => {};
const deleteContextTS = () => {};
const addContextDC = () => {};
const addContextUser = () => {};
const deleteContextUser = () => {};
const editContextUser = () => {};
const addContextPhong = () => {};
const deleteContextPhong = () => {};
const editContextPhong = () => {};
const addContextThongBao = () => {};
const addContextDanhMuc = () => {};
const editContextDanhMuc = () => {};
const deleteContextDanhMuc = () => {};
const addContextKinhPhi = () => {};
const editContextKinhPhi = () => {};
const deleteContextKinhPhi = () => {};
const addContextTL = () => {};

const sessionUser={}


// Creact Context
export const QLCSVCContext = React.createContext(
	resource,
	editContextTS,
	addContextTS,
	deleteContextTS,
	addContextDC,
	addContextUser,
	deleteContextUser,
	editContextUser,
	addContextPhong,
	deleteContextPhong,
	editContextPhong,
	addContextThongBao,
	addContextDanhMuc,
	editContextDanhMuc,
	deleteContextDanhMuc,
	addContextKinhPhi,
	editContextKinhPhi,
	deleteContextKinhPhi,
	addContextTL,
	sessionUser
);



class Main extends Component {
	constructor(props) {
		super(props);
	this.state = {
		resource: {
			user: resource.user,
			role: resource.role,
			danhmuc: resource.danhmuc,
			loaitaisan:resource.loaitaisan,
			donvi:resource.donvi,
			phong:resource.phong,
			nguonkinhphi:resource.nguonkinhphi,
			taisan:resource.taisan,
			chuyentaisan:resource.chuyentaisan,
			thanhly:resource.thanhly,
			thongbao:resource.thongbao
		},
		sessionUser:sessionUser,
		sidebar : {
			home:{
				id: 0,
				name: "Home",
				route: '/home',
				isOpen: false,
				icon:'fa fa-home',
				messageID:'home.title',
				children: {}
			},
			user:{
				id: 1,
				name: "User",
				route: '/user',
				isOpen: false,
				icon:'fa fa-user',
				messageID:'user.title',
				children: {}
			},
			donvi:{
				id: 2,
				name: "Đơn vị",
				route: '/donvi',
				isOpen: false,
				icon:'fas fa-landmark',
				messageID:'donvi.title',
				children: {
					icon:'fas fa-angle-right',
				}
			},
			danhmuc:{
				id: 3,
				name: "Danh mục",
				route: '/danhmuc',
				isOpen: false,
				icon:'fas fa-list-ul',
				messageID:'danhmuc.title',
				children: {
					icon:'fas fa-angle-right',
					quanlydanhmuc:{
						name: 'Danh mục',
						messageID:'danhmuc.title',
					},
					nguonkinhphi:{
						name: 'Nguồn Kinh Phí',
						messageID:'danhmuc.nguonkinhphi',
					},
				}
			},
			taisan:{
				id: 4,
				name: "Tài sản",
				route: '/taisan',
				isOpen: false,
				icon:'fas fa-warehouse',
				messageID:'taisan.title',
				children: {
					icon:'fas fa-angle-right',
					taisan:{
						name: 'Tài Sản',
						route: 'taisan',
						messageID:'taisan.title',
					},
					dieuchinhtaisan:{
						name: 'Danh sách điều chuyển',
						route: 'Danh sách điều chuyển',
						messageID:'taisan.dieuchuyen',
					},
					thanhly:{
						name: 'Danh sách thanh lý',
						route: 'Danh sách thanh lý',
						messageID:'taisan.thanhly',
					},
				}
			},
			kehoach:{
				id: 5,
				name: "Kế hoạch",
				route: 'kehoach',
				isOpen: false,
				icon:'fas fa-book',
				messageID:'kehoach.title',
				children: {
					icon:'fas fa-angle-right',
					vanbanmau:{
						name: 'VanBanMau',
						// route: '/danhmuc',
					},
				}
			}
		},
		open: false,
		openUserProfile: false,

		lang:"vi",
		message: {
			vi: {
				'project.title' : "Quản lý cơ sở vật chất",
				'logout.title' : "Đăng xuất",
				'profile.title' : "Thông tin cá nhân",
				'home.title' : "Trang chủ",
				'home.navBar' : "Thống kê trang quản lý",
				'user.title' : "Người dùng",
				'user.navBar' : "Người có quyền trong CSVC",
				'user.table.username' : "Tên người dùng",
				'user.table.fullname' : "Họ và tên",
				'user.table.password' : "Mật khẩu",
				'user.table.avatar' : "Avatar",
				'user.table.phone' : "Số điện thoại",
				'user.table.donvi' : "Đơn vị",
				'user.table.role' : "Chức vụ",
				'user.table.functions' : "Chức năng",
				'user.add.title' : "Thêm người dùng",
				'user.edit.title' : "Sửa người dùng",
				'donvi.title' : "Đơn vị",
				'donvi.navBar' : "Đơn vị trong trường",

				'donvi.navBar.quanlyphong' : "Quản lý phòng",
				'donvi.navBar.danhsachtaisan' : "Danh sách tài sản",
				'quanlyphong.table.name': "Tên phòng",
				'quanlyphong.table.functions': "Chức năng",
				'quanlyphong.input.name' : "Nhập tên phòng",

				'danhmuc.title' : "Danh mục",
				'danhmuc.navBar' : "List danh mục tài sản",
				'danhmuc.table.name': "Tên danh mục",
				'danhmuc.table.functions': "Chức năng",
				'danhmuc.input.name' : "Nhập tên danh mục",
				'danhmuc.nguonkinhphi': "Nguồn kinh phí",

				'danhmuc.nguonkinhphi.table.name': "Tên nguồn kinh phí",
				'danhmuc.nguonkinhphi.table.tongngansach': "Tổng ngân sách",
				'danhmuc.nguonkinhphi.table.tongchi': "Tổng chi",
				'danhmuc.nguonkinhphi.table.tongthanhly': "Tổng thanh lý",
				'danhmuc.nguonkinhphi.table.functions': "Chức năng",

				'danhmuc.nguonkinhphi.input.name': "Nhập tên nguồn kinh phí",
				'danhmuc.nguonkinhphi.input.tongngansach': "Nhập tổng ngân sách",
				'danhmuc.nguonkinhphi.input.tongchi': "Nhập tổng chi",
				'danhmuc.nguonkinhphi.input.tongthanhly': "Nhập tổng thanh lý",

				'taisan.title' : "Tài sản",
				'taisan.navBar' : "Tài sản của trường",
				'taisan.filter' : "Lọc loại tài sản",
				'taisan.filter.all' : "Tất cả loại tài sản",

				

				'taisan.table.name' : "Tên tài sản",
				'taisan.table.dongia' : "Đơn giá",
				'taisan.table.soluong' : "Số lượng",
				'taisan.table.ngaynhap' : "Ngày nhập",
				'taisan.table.loaitaisan' : "Loại tài sản",
				'taisan.table.donvi' : "Đơn vị",
				'taisan.table.nguoinhap' : "Người nhập",
				'taisan.table.ghichu' : "Chú thích",
				'taisan.table.tinhtrang' : "Tình trạng",
				'taisan.table.nguonkinhphi' : "Nguồn Kinh phí",
				'taisan.table.phong' : "Phòng",
				'taisan.table.hansudung' : "Hạn sử dụng",
				'taisan.table.functions' : "Chức năng",
				'taisan.thongtin' : "Thông tin",
				'taisan.chitiet' : "Chi tiết",


				'taisan.soluong' : "Số tài sản được thêm",

				'taisan.dieuchuyen' : "Điều chuyển tài sản", 
				'taisan.dieuchuyen.navBar' : "Danh sách đã điều chuyển",
				'taisan.dieuchuyen.table.name' : "Tên tài sản điều chuyển", 
				'taisan.dieuchuyen.table.donvinhan' : "Đơn vị nhận", 
				'taisan.dieuchuyen.table.phongnhan' : "Phòng nhận", 
				'taisan.dieuchuyen.table.soluong' : "Số lượng", 
				'taisan.dieuchuyen.table.ngaychuyen' : "Ngày chuyển", 
				'taisan.dieuchuyen.table.functions' : "Chức năng", 

				'taisan.thanhly' : "Thanh lý tài sản",
				'taisan.thanhly.navBar' : "Danh sách đã thanh lý",
				'taisan.thanhly.table.ngaythanhly' : "Ngày thanh lý",
				'taisan.thanhly.table.lydo' : "Lý do",
				'taisan.thanhly.table.soluong' : "Số lượng",
				'taisan.thanhly.table.hinhanh' : "Hình ảnh",
				'taisan.thanhly.table.tentaisan' : "Tên tài sản",
				'taisan.thanhly.table.functions' : "Chức năng", 

				'dieuchinhsoluong.title' : "Hãy điều chỉnh số lượng của tài sản này.", 

				'loaitaisan.table.name' : "Tên loại tài sản",
				'loaitaisan.table.danhmuc' : "Danh mục",
				'loaitaisan.table.functions' : "Chức năng", 

				'kehoach.title' : "Kế hoạch",
				'add.title' : "Thêm",
				'edit.title' : "Sửa",
				'delete.title' : "Xóa",
				'cancel.title' : "Hủy",
				'search.title' : "Search",
				'back.title' : "Back",
				'filter.title' : "Lọc",
				'optionalfunctions.title' : "Chức năng tùy chọn",
				'thanhly.title' : "Thanh lý",
			},
			ja: {
				'project.title' : "ダナン工科大学の施設管理",
				'logout.title' : "ログアウト",
				'profile.title' : "プロフィール",
				'home.title' : "ホーム",
				'home.navBar' : "管理ページの統計",
				'user.title' : "ユーザー",
				'user.navBar' : "施設管理ページのユーザー",
				'user.table.username' : "ユーザー名",
				'user.table.fullname' : "フルネーム",
				'user.table.password' : "パスワード",
				'user.table.avatar' : "アバター",
				'user.table.phone' : "電話番号",
				'user.table.donvi' : "ユニット",
				'user.table.role' : "役割",
				'user.table.functions' : "関数",
				'user.add.title' : "ユーザーを追加する",
				'user.edit.title' : "ユーザーを編集する",
				'donvi.title' : "ユニット",
				'donvi.navBar' : "ダナン工科大学のユニット",
				'donvi.navBar.quanlyphong' : "教室管理",
				'donvi.navBar.danhsachtaisan' : "施設のリスト",
				'quanlyphong.table.name': "教室の名",
				'quanlyphong.table.functions': "関数",
				'quanlyphong.input.name' : "教室の名を入力してください",

				'danhmuc.title' : "カテゴリー",
				'danhmuc.navBar' : "施設管理ページのカテゴリー",
				'danhmuc.table.name': "カテゴリーの名",
				'danhmuc.table.functions': "関数",
				'danhmuc.input.name' : "カテゴリーの名を入力してください",

				'danhmuc.nguonkinhphi': "資金",
				'danhmuc.nguonkinhphi.table.name': "資金の名",
				'danhmuc.nguonkinhphi.table.tongngansach': "総予算",
				'danhmuc.nguonkinhphi.table.tongchi': "総支出",
				'danhmuc.nguonkinhphi.table.tongthanhly': "総清算",
				'danhmuc.nguonkinhphi.table.functions': "関数",

				'danhmuc.nguonkinhphi.input.name': "資金の名を入力してください",
				'danhmuc.nguonkinhphi.input.tongngansach': "総予算の名を入力してください",
				'danhmuc.nguonkinhphi.input.tongchi': "総支出の名を入力してください",
				'danhmuc.nguonkinhphi.input.tongthanhly': "総清算の名を入力してください",
				


				'taisan.title' : "施設",
				'taisan.navBar' : "ダナン工科大学の施設",
				'taisan.filter' : "施設タイプのフィルター",
				'taisan.filter.all' : "すべての施設タイプ",

				

				'taisan.table.name' : "施設の名",
				'taisan.table.dongia' : "単価",
				'taisan.table.soluong' : "数量",
				'taisan.table.ngaynhap' : "入力した日付",
				'taisan.table.loaitaisan' : "施設のタイプ",
				'taisan.table.donvi' : "ユニット",
				'taisan.table.nguoinhap' : "入力した人",
				'taisan.table.ghichu' : "キャプション",
				'taisan.table.tinhtrang' : "調子",
				'taisan.table.nguonkinhphi' : "資金",
				'taisan.table.phong' : "教室の名",
				'taisan.table.hansudung' : "有効期限",
				'taisan.table.functions' : "関数",

				'taisan.thongtin' : "情報",
				'taisan.chitiet' : "詳細",
				

				'taisan.soluong' : "追加された施設の数",
				'taisan.dieuchuyen' : "移転",
				'taisan.dieuchuyen.navBar' : "移転のリスト",
				'taisan.dieuchuyen.table.name' : "移転された施設の名", 
				'taisan.dieuchuyen.table.donvinhan' : "受け取られたユニット", 
				'taisan.dieuchuyen.table.phongnhan' : "受け取られた教室", 
				'taisan.dieuchuyen.table.soluong' : "数量", 
				'taisan.dieuchuyen.table.ngaychuyen' : "移転した日付", 
				'taisan.dieuchuyen.table.functions' : "関数", 

				'taisan.thanhly' : "清算",
				'taisan.thanhly.navBar' : "清算のリスト",
				'taisan.thanhly.table.ngaythanhly' : "清算した日付",
				'taisan.thanhly.table.lydo' : "理由",
				'taisan.thanhly.table.soluong' : "数量",
				'taisan.thanhly.table.hinhanh' : "イメージ",
				'taisan.thanhly.table.tentaisan' : "施設の名",
				
				'taisan.thanhly.table.functions' : "関数", 

				'dieuchinhsoluong.title' : "この施設の量を調整してください", 
				
				

				'loaitaisan.table.name' : "施設タイプの名",
				'loaitaisan.table.danhmuc' : "カテゴリー",
				'loaitaisan.table.functions' : "関数", 

				'kehoach.title' : "計画",
				'add.title' : "追加",
				'edit.title' : "編集",
				'delete.title' : "削除",
				'cancel.title' : "キャンセル",
				'search.title' : "検索",
				'back.title' : "バック",
				'filter.title' : "フィルター",
				'optionalfunctions.title' : "オプション機能",
				'thanhly.title' : "清算",
				
			}
		}
	};
}
	// -------------- TÀI SẢN 
	editContextTS = (item) => {
		// console.log('Edit Item context', this.state.resource.taisan);
		this.setState(prev => {
			const newTaiSan = [...prev.resource.taisan];
			// console.log('[Main] newTaiSan:',newTaiSan );
			const changeIndex = _.findIndex(newTaiSan, {id: item.id})
			newTaiSan[changeIndex] = item;

			// console.log('Edit context', {
			// 	...prev.resource,
			// 	taisan: newTaiSan,
			// });

			return {
				resource: {
					...prev.resource,
					taisan: newTaiSan,
				}
			}
		})
	}
	
	addContextTS = (item) => {
		this.setState(prev =>{
			const newTaiSan = [...prev.resource.taisan];
			newTaiSan.push(item);
			// console.log('[Main] newTaiSan:',newTaiSan );
			return {
				resource: {
					...prev.resource,
					taisan: newTaiSan
				}
			}
		})
	}

	deleteContextTS = (item) => {
		this.setState(prev =>{
			return {
				resource: {
					...prev.resource,
					taisan: item
				}
			}
		})
	}

	// -------------- ĐIỀU CHUYỂN
	addContextDC = (item) => {
		this.setState(prev =>{
			const newDieuChuyen = [...prev.resource.chuyentaisan];
			newDieuChuyen.push(item);
			// console.log('[Main] newDieuChuyen:',newDieuChuyen );
			return {
				resource: {
					...prev.resource,
					chuyentaisan: newDieuChuyen
				}
			}
		})
	}
	// -------------- User
	addContextUser = (item) => {
		this.setState(prev =>{
			const newUser = [...prev.resource.user];
			newUser.push(item);
			// console.log('[Main] newUser:',newUser );
			return {
				resource: {
					...prev.resource,
					user: newUser
				}
			}
		})
	}

	deleteContextUser = (item) => {
		this.setState(prev =>{
			return {
				resource: {
					...prev.resource,
					user: item
				}
			}
		})
	}

	editContextUser = (item) => {
		// console.log('Edit Item context', this.state.resource.taisan);
		this.setState(prev => {
			const newUser = [...prev.resource.user];
			// console.log('[Main] newUser:',newUser );
			const changeIndex = _.findIndex(newUser, {id: item.id})
			newUser[changeIndex] = item;

			// console.log('Edit context', {
			// 	...prev.resource,
			// 	user: newUser,
			// });

			return {
				resource: {
					...prev.resource,
					user: newUser,
				}
			}
		})
	}
	//-------------------------Phong
	addContextPhong = (item) => {
		this.setState(prev =>{
			const newPhong = [...prev.resource.phong];
			newPhong.push(item);
			// console.log('[Main] newPhong:',newPhong );
			return {
				resource: {
					...prev.resource,
					phong: newPhong
				}
			}
		})
	}

	deleteContextPhong = (item) => {
		this.setState(prev =>{
			return {
				resource: {
					...prev.resource,
					phong: item
				}
			}
		})
	}

	//------------------ Thông báo
	addContextThongBao = (item) => {
		this.setState(prev =>{
			const newTB = [...prev.resource.thongbao];
			newTB.push(item);
			console.log('[Main] newTB:',newTB );
			return {
				resource: {
					...prev.resource,
					thongbao: newTB
				}
			}
		})
	}

	editContextPhong = (item) => {
		// console.log('Edit Item context', this.state.resource.taisan);
		this.setState(prev => {
			const newPhong = [...prev.resource.phong];
			// console.log('[Main] newPhong:',newPhong );
			const changeIndex = _.findIndex(newPhong, {id: item.id})
			newPhong[changeIndex] = item;
			return {
				resource: {
					...prev.resource,
					phong: newPhong,
				}
			}
		})
	}
	
	//------------------ Danh mục
	addContextDanhMuc = (item) => {
		this.setState(prev =>{
			const newDM = [...prev.resource.danhmuc];
			newDM.push(item);
			// console.log('[Main] newDM:',newDM );
			return {
				resource: {
					...prev.resource,
					danhmuc: newDM
				}
			}
		})
	}
	
	editContextDanhMuc = (item) => {
		this.setState(prev => {
			const newDM = [...prev.resource.danhmuc];
			const changeIndex = _.findIndex(newDM, {id: item.id})
			newDM[changeIndex] = item;
			return {
				resource: {
					...prev.resource,
					danhmuc: newDM,
				}
			}
		})
	}

	deleteContextDanhMuc = (item) => {
		this.setState(prev =>{
			return {
				resource: {
					...prev.resource,
					danhmuc: item
				}
			}
		})
	}
	//--------------Kinh phí
	addContextKinhPhi = (item) => {
		this.setState(prev =>{
			const newKP = [...prev.resource.nguonkinhphi];
			newKP.push(item);
			// console.log('[Main] newKP:',newKP );
			return {
				resource: {
					...prev.resource,
					nguonkinhphi: newKP
				}
			}
		})
	}

	deleteContextKinhPhi = (item) => {
		this.setState(prev =>{
			return {
				resource: {
					...prev.resource,
					nguonkinhphi: item
				}
			}
		})
	}

	editContextKinhPhi = (item) => {
		this.setState(prev => {
			const newKP = [...prev.resource.nguonkinhphi];
			const changeIndex = _.findIndex(newKP, {id: item.id})
			newKP[changeIndex] = item;
			return {
				resource: {
					...prev.resource,
					nguonkinhphi: newKP,
				}
			}
		})
	}
	//--------------Thanh lý
	addContextTL = (item) => {
		this.setState(prev =>{
			const newTL = [...prev.resource.thanhly];
			newTL.push(item);
			// console.log('[Main] newTL:',newTL );
			return {
				resource: {
					...prev.resource,
					thanhly: newTL
				}
			}
		})
	}



	addChildren(key, children) {
		const childrenObj = Object.assign({}, children)
		// console.log("[Main] childrenObj: ", childrenObj)
		
		this.setState(({sidebar}) => ({
			sidebar: {
				...sidebar,
				[key]: {
					...sidebar[key],
					children: {
						...sidebar[key].children,
						...childrenObj,
					},
				}
			}
		})
	)}

	addResource(key, children) {
		this.setState(({resource}) => ({
			resource: {
				...resource,
				[key]: children
			}
		})
	)}




	async componentDidMount () {
		// Handle silebar clicked
		const { location } = this.props
		const parentId = getParentPath(location.pathname)
		// console.log("location:",location)
		// console.log("parentId:",parentId)
		this.toggleDropdown(parentId)
		
		axios.get('http://csvc.com/api/admin/hello')
		.then((res) => {
			this.setState({sessionUser: res.data});
		});
		
		// Handle Axios
		const user = await axios.get('http://localhost:5500/user')
		const role = await axios.get('http://localhost:5500/role')
		const donvi = await axios.get('http://localhost:5500/donvi')
		const danhmuc = await axios.get('http://localhost:5500/danhmuc')
		const phong = await axios.get('http://localhost:5500/phong')
		const chuyentaisan = await axios.get('http://localhost:5500/chuyentaisan')
		const thanhly = await axios.get('http://localhost:5500/thanhly')
		const taisan = await axios.get('http://localhost:5500/taisan')
		const loaitaisan = await axios.get('http://localhost:5500/loaitaisan')
		const nguonkinhphi = await axios.get('http://localhost:5500/nguonkinhphi')
		const thongbao = await axios.get('http://localhost:5500/thongbao')
		


		
		// Add Children
		this.addChildren('donvi', donvi.data);
		this.addChildren('danhmuc', danhmuc.data);
		
		// Add Resource
		this.addResource('user', user.data);
		this.addResource('role', role.data);
		this.addResource('danhmuc', danhmuc.data);
		this.addResource('loaitaisan', loaitaisan.data);
		this.addResource('donvi', donvi.data);
		this.addResource('phong', phong.data);
		this.addResource('nguonkinhphi', nguonkinhphi.data);
		this.addResource('taisan', taisan.data);
		this.addResource('chuyentaisan', chuyentaisan.data);
		this.addResource('thanhly', thanhly.data);
		this.addResource('thongbao', thongbao.data);
	}
	
	toggleDropdown = (key) => {
		var { sidebar } = this.state
		if(!key){
			return
		}
		sidebar[key].isOpen = !sidebar[key].isOpen
		this.setState({
			sidebar: sidebar
		})
		
	}

	//---- menu thông báo
	handleToggle = () => {
		this.setState(state => ({ open: !state.open }));
	};
	handleClose = event => {
		if (this.anchorEl.contains(event.target)) {
		  return;
		}
		this.setState({ open: false });
	};
	//---- menu user profile
	handleToggleUserProfile = () => {
		this.setState(state => ({ openUserProfile: !state.openUserProfile }));
	};

	handleCloseUserProfile = event => {
		if (this.anchorEl.contains(event.target)) {
		  return;
		}
		this.setState({ openUserProfile: false });
	};

	handleLang = (text) => {
		this.setState(state => ({ lang: text}));
	};
	
	render() {
		var {sidebar} = this.state;
		const {classes } = this.props
		const parentKey = Object.keys(sidebar) // ['donvi', 'danhmuc']
		// console.log("[Main] sidebar: ", this.state.sidebar)
		// console.log("[Main] match: ", this.props.match);
		// console.log("[Main] sessionUser.role:", this.state.sessionUser.role)
		const linkLogOut = props => <Link to={`${this.props.match.url}/api/logout`} {...props} />

		return (
			<IntlProvider 
				locale={this.state.lang} 
				messages={this.state.message[this.state.lang]}	
			>
			<div className="s-layout">
				<div className="s-layout__sidebar">
					<div className="s-sidebar__trigger" href="#0">
						<i className="fa fa-bars"></i>
						<ul className="pull-right">
							{/* Thông báo và avatar */}
							<li className="rad-dropdown lang" >
								<a role="button" onClick={ ()=> this.handleLang('ja')}> JA </a> |
								<a role="button" onClick={ ()=> this.handleLang('vi')}> VI </a> <br />
							</li>
							<li className="rad-dropdown no-color bell">
								<IconButton aria-label="4 pending messages" 
									className={classes.margin}
									buttonRef={node => {
										this.anchorEl = node;
									}}
									aria-owns={this.state.open ? 'menu-list-grow' : undefined}
									aria-haspopup="true"
									onClick={this.handleToggle}
								>
									<Badge badgeContent={`${this.state.resource.thongbao.length}`} color="primary">
										<NotificationsIcon />
									</Badge>
								</IconButton>

								<Popper 
									open={this.state.open} 
									anchorEl={this.anchorEl} 
									transition disablePortal
									placement="bottom-end"
									className={classes.popperNoti}
								>
									{({ TransitionProps, placement }) => (
									<Grow
										{...TransitionProps}
										id="menu-list-grow"
										className={classes.popperNoti}
										style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
									>
										<Paper>
										<ClickAwayListener onClickAway={this.handleClose}>
											<List dense className={classes.menuItems}>
											{ this.state.resource.thongbao.map((item, i) => {
												return(
													<ListItem button divider>
														<ListItemAvatar>
															<Avatar
																alt={`Avatar`}
																src="https://farm2.staticflickr.com/1738/42575021701_788f8b74b0_z.jpg"
															/>
														</ListItemAvatar>
														<ListItemText primary={`[Thông báo] ${item.name}`} />
													</ListItem>
												)
											})}
												
											</List>
										</ClickAwayListener>
										</Paper>
									</Grow>
									)}
								</Popper>
							</li>
										
							{/* User profile */}
							<li className="rad-dropdown no-color">
								<IconButton aria-label="4 pending messages" 
									className={classes.user}
									buttonRef={node => {
										this.anchorEl = node;
									}}
									aria-owns={this.state.openUserProfile ? 'menu-list-grow' : undefined}
									aria-haspopup="true"
									onClick={this.handleToggleUserProfile}
								>
									<Avatar  alt="IMG_0432 - 3x4" src={this.state.sessionUser.avatar} className={classes.avatar} />
								</IconButton>
								<Popper 
									open={this.state.openUserProfile} 
									anchorEl={this.anchorEl} 
									transition disablePortal
									placement="bottom-end"
									className={classes.popperUser}
								>
									{({ TransitionProps, placement }) => (
									<Grow
										{...TransitionProps}
										id="menu-list-grow"
										className={classes.popperUser}
										style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
									>
										<Paper>
										<ClickAwayListener onClickAway={this.handleCloseUserProfile}>
											<List dense className={classes.menuItems}>
												<ListItem button divider>
													<i style={{color: 'black'}} class="far fa-user-circle"></i>
													{/* <ListItemText primary="Profile" /> */}
													<a style={{color: 'black'}} href={`user/edit/${this.state.sessionUser.id}`}>
														<FormattedMessage id="profile.title" defaulMesage="Thông tin cá nhân" />
													</a>
												</ListItem>		
												<ListItem button divider >
													<i style={{color: 'black'}} class="fas fa-sign-out-alt"></i>
													{/* <ListItemText primary="Log out" /> */}
													<a style={{color: 'black'}} href="/api/logout">
														<FormattedMessage id="logout.title" defaulMesage="Đăng xuất" />
													</a>
												</ListItem>			
											</List>
										</ClickAwayListener>
										</Paper>
									</Grow>
									)}
								</Popper>
							</li>
						</ul>
						
						
					</div>
					
					<nav className="s-sidebar__nav" id="style-4">
						<div className="force-overflow"></div>
						<div className="s-sidebar__nav-avartar">
							<img className="s-sidebar__nav-avartar-image" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Logo_dhbkdn.jpg"  />
							{/* style={{width:'55px', height:'55px' }} */}
							<span className="s-sidebar__nav-avartar-csvc">
								<FormattedMessage id="project.title" defaulMesage="Quản lý cơ sở vật chất" />
							</span>
							
						</div>
						{/* List SideBar */}
						<ul>
							{parentKey.map((key, i) => {
								const childrenKeys = Object.keys(sidebar[key].children) //{ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…} }
								
								return(
									<li key={i}>
										{key === 'danhmuc' && this.state.sessionUser.role === 3
										?
										''
										:
										<div onClick={() => this.toggleDropdown(key)}>
											{/* <MenuLink className="s-sidebar__nav-link" to={`/${key}`} label={`${sidebar[key].name}`} nameIcon={`${sidebar[key].icon}`} /> */}
											<MenuLink className="s-sidebar__nav-link" to={`/${key}`} label={`${sidebar[key].messageID}`} nameIcon={`${sidebar[key].icon}`} />
										</div>
										}
										
										{childrenKeys!== null
										?
											sidebar[key].isOpen ?
												<ul>
													{childrenKeys.map((keyChild, idChild) => {
														// console.log("[SideBar] childrenKeys:",childrenKeys);
														// console.log("[SideBar] sidebar[key][keyChild].name:",sidebar[key].children[keyChild].name);
														return (
															keyChild!=='icon'
															?
															<li className="li" key={idChild}>
																{key !== sidebar[key].children[keyChild].route // nếu router bằng key thì đường link khác 
																?
																	// nếu là đơn vị thì đường link khác
																	key !== 'donvi'
																	?	
																		key !== 'danhmuc'
																		?
																			<MenuLink className="s-sidebar__nav-linksub" to={{
																				pathname: '/'+ key + '/' + sidebar[key].children[keyChild].name,
																			}} label={`${sidebar[key].children[keyChild].messageID}`} nameIcon={`${sidebar[key].icon}`} />
																		:	
																			// Nếu Role != 3 thì cho show Nguon khi phí
																			key === 'danhmuc' && this.state.sessionUser.role !== 3
																			?
																				sidebar[key].children[keyChild].name !== "Nguồn Kinh Phí" && sidebar[key].children[keyChild].name !=='Danh mục'
																				?
																					// Loại tài sản
																					<MenuLink className="s-sidebar__nav-linksub" to={{
																						pathname: '/'+ key + '/loaitaisan/' + sidebar[key].children[keyChild].name,
																					}} label={`${sidebar[key].children[keyChild].name}`} nameIcon={`${sidebar[key].icon}`} />
																					
																				:
																					<MenuLink className="s-sidebar__nav-linksub" to={{
																						pathname: '/'+ key + '/' + sidebar[key].children[keyChild].name,
																					}} label={`${sidebar[key].children[keyChild].messageID}`} nameIcon={`${sidebar[key].icon}`} />
																			:
																			''
																	:
																	// Các đơn vị
																	<MenuLink className="s-sidebar__nav-linksub" to={{
																		pathname: '/'+ key + '/' + sidebar[key].children[keyChild].name + '/danhsachtaisan',
																	}} label={`${sidebar[key].children[keyChild].name}`} nameIcon={`${sidebar[key].icon}`} />
																:
																	
																	<MenuLink className="s-sidebar__nav-linksub" to={{
																		pathname: '/'+ key,
																	}} label={`${sidebar[key].children[keyChild].messageID}`} nameIcon={`${sidebar[key].icon}`} />
																}
															</li>
															:
															''
													)})}
												</ul>
											:
											''
										:
										''
										}
									</li>
								)
							})}
						</ul>
						{/* End List SideBar */}

					</nav>
				</div>
			

				<QLCSVCContext.Provider
					value={{
						resource: this.state.resource,
						editContextTS: this.editContextTS,
						addContextTS: this.addContextTS,
						deleteContextTS: this.deleteContextTS,
						addContextDC: this.addContextDC,
						addContextUser: this.addContextUser,
						deleteContextUser: this.deleteContextUser,
						editContextUser: this.editContextUser,
						addContextPhong: this.addContextPhong,
						deleteContextPhong: this.deleteContextPhong,
						editContextPhong: this.editContextPhong,
						addContextThongBao: this.addContextThongBao,
						addContextDanhMuc: this.addContextDanhMuc,
						editContextDanhMuc: this.editContextDanhMuc,
						deleteContextDanhMuc: this.deleteContextDanhMuc,
						addContextKinhPhi:this.addContextKinhPhi ,
						editContextKinhPhi: this.editContextKinhPhi,
						deleteContextKinhPhi: this.deleteContextKinhPhi,
						addContextTL: this.addContextTL,
						sessionUser:this.state.sessionUser
					}}
				>
					<main className="s-layout__content">
						<Content lang={this.state.lang}/>
					</main>
				</QLCSVCContext.Provider>
			</div>
			</IntlProvider>
			
		);
	}
}

export default withStyles(styles)(withRouter(Main));
