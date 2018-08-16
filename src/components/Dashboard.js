import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import UserButton from './Dashboard/UserButton';
import TripCard from './Dashboard/TripCard';
import './Dashboard.css'

class Dashboard extends Component {
	constructor () {
		super();
		this.state = {
			tripCards: []
		}
	}

	componentDidMount()  {axios.get(`/api/trips/${this.props.user.user_id}`).then(results => this.setState({tripCards: results.data}))}
	componentWillReceiveProps (props) {axios.get(`/api/trips/${props.user.user_id}`).then(results => this.setState({tripCards: results.data}))}

	render () {
		const {updateBackground} = this.props;
		const {tripCards} = this.state;
		console.log('history', this.props.history)
		return (
			<div className="dashboard">
				<UserButton id={this.props.user.user_id}/>
				{tripCards.map((e, i) => {
					return (
						<TripCard
							key={i}
							id={e.trip_id}
							location={e.trip_location}
							startDate={e.trip_start_date}
							endDate={e.trip_end_date}
							budget={e.trip_budget}
							packingList={e.trip_packing_list}
							schedule={e.trip_schedule}
							background={e.trip_background}
							deleteTrip={this.deleteTrip}
							updateBackground={updateBackground}
							router={this.props.history}
						/>
					)
				})
			}
			</div>
		)
	}
}

function mapStateToProps (state) {
	return {
		user: state.auth0.user
	}
}
export default withRouter(connect(mapStateToProps)(Dashboard));