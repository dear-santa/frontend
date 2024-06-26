import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function KakaoCallback() {
  const navigate = useNavigate();
  //최초 렌더링 시 발동
  useEffect(() => {
    
    const code = new URL(window.location.href).searchParams.get("code");
    console.log("카카오에서 받은 인가 코드 : " + code);
    const sendData = JSON.stringify({
      token: code,
      oauthType: "KAKAO",
    });
    console.log("sendData : " + sendData);

    //spring 서버로 인증키를 통해 유저정보를 획득하고 로그인 처리 요청
    axios({
      method: "POST",
      url: "/api/v1/kakao/login",
      data: sendData,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        //spring에서 발급된 jwt localStorage 저장
        localStorage.setItem("accessToken", response.data.accessToken);
        console.log(response.data.accessToken);
        //메인 페이지로 이동
        window.location.href = "/";
        window.replace('/');
        navigate('/');
      })
      .catch((err) => {
        //에러발생 시 경고처리 후 login 페이지로 전환
        console.log(err);

        window.location.href = "/";
        window.replace('/');
        navigate('/');
      });
  }, [navigate]);

  return <div>loading</div>;
}

export default KakaoCallback;
