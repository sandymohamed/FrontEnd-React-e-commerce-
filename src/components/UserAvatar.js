import React from 'react';
import '../App.scss';
// -------------------------------------------------------------------------------------

const UserAvatar = ({ imageUrl, altText, firstName, lastName }) => {
    const getInitials = () => {
        const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
        return initials;
    };

    return (
        <div className="user-avatar rounded-circle boxShadow " >
            {imageUrl ? (
                <img src={imageUrl} alt={altText} />
            ) : (
                <div className="avatar-initials brand fs-4" style={{ color: '#474747' }} >{getInitials()}</div>
            )}
        </div>
    );
};

export default UserAvatar;
