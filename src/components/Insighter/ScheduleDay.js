import React, {Component} from 'react';
import ScheduleItem from './ScheduleItem';
import axios from 'axios';
import './ScheduleDay.css';

export default class ScheduleDay extends Component {
	constructor () {
		super ();
		this.state = {
			scheduleItems: []
		}
	}
	
	componentDidMount () {axios.get(`/api/schedule/item/${this.props.id}`).then(results => this.setState({scheduleItems: results.data}))}

	render () {
		const {day, month, year} = this.props;
		const {scheduleItems} = this.state;
		return (
			<div className="schedule-day">
   			<a>• {month}/{day}/{year}</a>
				 {scheduleItems.map((e, i) => {
					return (
						<ScheduleItem
							key={i}
							id={e.item_id}
							title={e.item_title}
							price={e.item_price}
							time={e.item_time}
							checked={e.item_checked}
						/>
					)
				})
			}
   		</div>
		)
	}
}