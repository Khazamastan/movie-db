import A from "../A";
import React from "react";
import { Link } from 'react-router-dom'

function millisToMinutesAndSeconds(millis) {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

const UserInfo = props => {
	const openModal = () => {
		props.openModal(props);
	}
	const {Name, Type, Year, inLib} = props;

	var addToLib = null;
	if(props.viewType == "movie"){
		if(inLib){
			addToLib = <span className="color-orange">Added </span>
		}else{
			addToLib = (
				<a onClick={props.addToLibrary}>
										Add To Library
								</a>
			)

		}
	}
	const content = (
				<div className="user-info">
					<div className="name">{Name}</div>
          <span>
            <strong>Type</strong>: {Type}
          </span> | 
          <span>
            <strong> Year</strong>: {Year}
          </span>
          <div>
					{addToLib}
          </div>
				</div>
			);
			return content;
}

export default UserInfo;