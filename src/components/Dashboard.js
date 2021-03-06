import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import FadeIn from 'react-fade-in';
import axios from 'axios';

import UserButton from './Dashboard/UserButton';
import TripCard from './Dashboard/TripCard';
import './Dashboard.css';

require ('dotenv').config();

class Dashboard extends Component {
	constructor () {super(); this.state = {tripCards: []}};

	componentDidMount () {axios.get(`/api/trips/${this.props.user.user_id}`).then(results => this.setState({tripCards: results.data}))};
	componentWillReceiveProps (props) {axios.get(`/api/trips/${props.user.user_id}`).then(results => this.setState({tripCards: results.data}))};

	render () {
		const {tripCards} = this.state;
		return (
			<FadeIn>
				<div>
					<div className="user-wrapper">
						<UserButton	id = {this.props.user.user_id} />
					</div>
					<div className="dashboard">
						{tripCards.map((e, i) => {
							return (
								<TripCard
									key         = {i}
									id          = {e.trip_id}
									location    = {e.trip_location}
									startDate   = {e.trip_start_date}
									endDate     = {e.trip_end_date}
									budget      = {e.trip_budget}
									packingList = {e.trip_packing_list}
									schedule    = {e.trip_schedule}
									background  = {e.trip_background}
									color       = {e.trip_bg_color}
									deleteTrip  = {this.deleteTrip}
									router      = {this.props.history}
								/>
							)
						})
					}
					</div>
				</div>
			</FadeIn>
		);
	};
};

function mapStateToProps (state) {return {user: state.auth0.user}}
export default withRouter(connect(mapStateToProps)(Dashboard));