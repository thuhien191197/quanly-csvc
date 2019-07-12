import React, { Component } from 'react';
import {Header,Footer} from './Layouts';
import Exercises from './Exercises/';
import { IntlProvider } from 'react-intl';
import { FormattedMessage } from "react-intl";

class GuestPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lang:"vi",
			message: {
				vi: {
					'school.title' : "Trường Đại học Bách Khoa Đà Nẵng",
					'page.title' : "Phòng cơ sở vật chất",
					'login.title' : "Login",
					'tintuc.title' : "Tin tức",
					'thongbao.title' : "Thông báo",
					'phancongcv.title' : "Phân công công việc",
					'xemthem.title' : "Xem thêm",
					'canbo.title' : "Cán bộ",
					'phone.title' : "DĐ",
					'donvi.title' : "Đơn vị",
					'chucvu.title' : "Chức vụ",
					'nhiemvu.title' : "Nhiệm vụ",
					'gioithieu.title' : "Giới Thiệu",
					'bieumau.title' : "Biểu mẫu",
					'tochucnhansu.title' : "Tổ chức nhân sự",
					'help.title' : "Hỗ trợ",
					'thongtinlienhe.title' : "Thông tin liên hệ",
					'diachi.title' : "54 Nguyễn Lương Bằng, Quận Liên Chiểu, Thành phố Đà Nẵng",

					
					'close.title' : "Close"
				},
				ja: {
					'school.title' : "ダナン工科大学",
					'page.title' : "施設部",
					'login.title' : "ログイン",
					'tintuc.title' : "ニュース",
					'thongbao.title' : "お知らせ",
					'phancongcv.title' : "仕事を分ける",
					'xemthem.title' : "もっと見る",
					'canbo.title' : "役員",
					'phone.title' : "携帯",
					'donvi.title' : "部",
					'chucvu.title' : "現職",
					'nhiemvu.title' : "タスク",
					'gioithieu.title' : "紹介する",
					'bieumau.title' : "見本書",
					'tochucnhansu.title' : "人事組織",
					'help.title' : "ヘルプ",
					'thongtinlienhe.title' : "連絡する情報",
					'diachi.title' : "54 Nguyen Luong Bang, Lien Chieu地区, ダナン町",
					'close.title' : "閉じる"
				}
			}
		};
	}

	handleLang = (text) => {
		this.setState(state => ({ lang: text}));
	};

	render() {
		return (
			<IntlProvider 
				locale={this.state.lang} 
				messages={this.state.message[this.state.lang]}	
			>
				<div>
					<Header handleLang={this.handleLang}/>

					<Exercises/>

					<Footer/>
				</div>
			</IntlProvider>
		);
	}
}

export default GuestPage;
