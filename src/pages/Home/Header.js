// Header.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/header.css';

const Header = () => {
  const [nickname, setNickname] = useState('로그인을 해주세요');
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/v1/auth/member', {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            Accept: "application/json",
          },
        });
        setNickname(response.data.nickname);
        setImgUrl(response.data.imgUrl);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo();
  }, []);


  return (
    <div className="header_container">
      <div className="header_profile">
        {imgUrl && <img className="header_profile_image" src={imgUrl} alt="Profile" />}
        <p className="header_profile_nickname">{nickname}</p>
      </div>
    </div>
  );
};

export default Header;