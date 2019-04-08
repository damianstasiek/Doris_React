import React from 'react';
import { Link } from 'react-router-dom'

const ImageSlide = ({ url, title, id, animation }) => {
    const styles = {
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
    return (
        <Link to={`/projects/${id}`}>
            <div className={`image-slide ${animation ? 'active' : ''}`} style={styles}>
                <div className="image-title">
                    {title}
                </div>
            </div>
        </Link>
    );
}

export default ImageSlide;