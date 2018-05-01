import React from 'react';
import PropTypes from 'prop-types';
const MovieImage = props => {
	const {imageURL, imageAlt} = props;
	if (typeof imageURL === 'string') {
		return <img src={imageURL} alt={imageAlt}/>;	
	}
	return <img src='' alt="placeholder"/>;
};
MovieImage.propTypes = {
	imageURL: PropTypes.string,
	imageAlt: PropTypes.string
};

export default MovieImage;