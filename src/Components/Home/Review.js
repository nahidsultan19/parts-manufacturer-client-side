import React from 'react';

const Review = (props) => {
    const { name, review, number } = props.review;
    return (
        <div className="card w-96 mx-auto bg-base-100 shadow-md">
            <div className="card-body">
                <h1>{name}</h1>
                <h2 className="card-title">Rating:{number}</h2>
                <p>{review}</p>
            </div>
        </div>
    );
};

export default Review;