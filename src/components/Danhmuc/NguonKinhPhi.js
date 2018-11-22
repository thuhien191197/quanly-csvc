import React, { Component } from 'react';
// import './NguonKinhPhi.css';

// const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[2]

class NguonKinhPhi extends Component {
	
	render() {
		const { name } = this.props
		console.log(">>>name :" , name)
		return (
			<div>
				NguonKinhPhi	
				{/* {getParentPath(match.url)} */}
			</div>
		);
	}
}

export default NguonKinhPhi;
