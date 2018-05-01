import React from 'react';
import PropTypes from 'prop-types';
const MovieImage = props => {
	const {imageURL, imageAlt} = props;
	if (typeof imageURL === 'string' && imageURL != "N/A") {
		return <img src={imageURL} alt={imageAlt}/>;	
	}
	return <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDzIzPMFcfjaa0NI2qfdBdx3l_6jQvqCjbn_tJul8oVKqOZf1D6w' alt="placeholder"/>;
};
MovieImage.propTypes = {
	imageURL: PropTypes.string,
	imageAlt: PropTypes.string
};

export default MovieImage;