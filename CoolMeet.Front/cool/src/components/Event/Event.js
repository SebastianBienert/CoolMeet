import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {BASE_URL, DEFAULT_EVENT} from "../constants";
import Map from '../Map/Map';
import CommentsList from '../CommentsList/CommentsList'

class Event extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {

            users: props.event.users || [],
            statusUnavailable: props.event.status.description === "Niedostępny",
        }
    }

    componentWillReceiveProps(newState) {
        this.setState( prevState => ({
            users: newState.event.users || [],
        }))
    }
    
    joinEvent = () => {
        axios({ method: 'POST', url: `${BASE_URL}/Event/join/${this.props.event.id}`})

        .then(response =>{
            console.info(`Join ${this.props.event.name}`);
            this.setState( prevState =>{
                return{
                    users: [...prevState.users, response.data],
                }
            })
        })
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    render() {
        const event = this.props.event.id ? this.props.event : DEFAULT_EVENT;
        const address = `${event.country} ${event.city} ${event.address}`;
        return (
            <div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <b>Opis: </b>{event.description}
                    </li>
                    <li className="list-group-item">
                    <b>Data startu: </b>{new Date(event.startDate).toDateString()}
                    </li>
                    <li className="list-group-item">
                        <b>Data konca: </b>{new Date(event.endDate).toDateString()}
                    </li>
                    <li className="list-group-item">
                        <b>Adres: </b>{event.country}, {event.city}, {event.address}
                    </li>
                    <li className="list-group-item">
                        <b>Status: </b>{event.status.description}
                    </li>
                    <li className="list-group-item capitalize-text">
                        <b>Uczestnicy: </b>{this.state.users.map(user => user.name).join(', ')}
                    </li>
                </ul>
                <Map address={address} name={event.name} />
                <CommentsList event={event} />
            </div>
      );
    }
}

Event.propTypes = {
  event: PropTypes.object.isRequired
};

export default Event;