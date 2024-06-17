import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from './config';
import star_gray from '../assets/star_gray_24.png';
import star_yellow from '../assets/star_yellow_24.png';
const FriendStar = ({ userhandle, isFriend }) => {
  const handleToggleFriend = async () => {
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/example/friendToggle/${userhandle}`);
      // isFriend=1-isFriend;
      // alert(response.data.message); // Assuming your backend sends a success message
     // Refresh profile data after toggling friend status
     window.location.reload();
    } catch (error) {
      console.error('Error toggling friend status:', error);
      alert(`Error: ${error.response.data}`);
    }
  };

  return (
    <img
      src={isFriend ? star_yellow : star_gray}
      alt="Star"
      className="w-8 h-8 cursor-pointer"
      onClick={handleToggleFriend}
    />
  );
};

export default FriendStar;
