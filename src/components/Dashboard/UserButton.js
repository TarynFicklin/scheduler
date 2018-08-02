import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUserData, deleteUser} from '../../ducks/auth0';
import {withRouter} from 'react-router-dom';
import './UserButton.css';

class UserButton extends Component {
	componentDidMount () {axios.get('/api/user-data').then(res => {this.props.updateUserData(res.data);})}
	logout() {axios.get('/api/logout').then(res => {
		const {deleteUser} = this.props;
		this.props.history.push('/');
		deleteUser();
	})}

	render () {
		let {user} = this.props;
		return (
			<div className="user-button">
				<img src={user.auth_profile} alt="" className="profile-pic"/><br />
				<button onClick={() => this.logout()}>Logout</button>
				<button>New Trip +</button>
			</div>
		)
	}
}

function mapStateToProps (state) {return {user: state.auth0.user}}
export default withRouter(connect(mapStateToProps, {updateUserData, deleteUser})(UserButton));