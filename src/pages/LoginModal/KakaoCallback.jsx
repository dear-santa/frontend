import { useEffect } from "react";
import axios from "axios";

function KakaoCallback() {
  //최초 렌더링 시 발동
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    const sendData = JSON.stringify({
      token: code,
      oauthType: "KAKAO",
    });
    const auth = process.env.REACT_APP_KAKAO_AUTHORIZATION;
    //spring 서버로 인증키를 통해 유저정보를 획득하고 로그인 처리 요청
    axios({
      method: "POST",
      url: "/api/v1/auth/kakao/login",
      data: sendData,
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => {
        //spring에서 발급된 jwt localStorage 저장
        console.log("1");
        localStorage.setItem("token", response.headers.token);
        console.log(2);
        //메인 페이지로 이동
        window.location.href = "/";
      })
      .catch((err) => {
        //에러발생 시 경고처리 후 login 페이지로 전환
        console.log(err);

        // window.location.href = "/";
      });
  }, []);

  return <div>loading</div>;
}

export default KakaoCallback;
