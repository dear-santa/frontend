import { useEffect } from "react";
import axios from "axios";

function KakaoCallback() {
  //최초 렌더링 시 발동
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    //spring 서버로 인증키를 통해 유저정보를 획득하고 로그인 처리 요청
    axios
      .post("/api/v1/auth/kakao", {
        authorizationCode: code,
      })
      .then((response) => {
        console.log(response);
        //spring에서 발급된 jwt localStorage 저장
        localStorage.setItem("accessToken", response.headers.accesstoken);
        console.log(response.headers.accesstoken);
        //메인 페이지로 이동
        window.location.href = "/";
      })
      .catch((err) => {
        //에러발생 시 경고처리 후 login 페이지로 전환
        alert(err.response.data.detail);

        window.location.href = "/";
      });
  }, []);

  return <div>loading</div>;
}

export default KakaoCallback;
