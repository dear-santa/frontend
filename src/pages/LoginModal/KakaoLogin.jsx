function KakaoLogin() {
  // 보안상 노출되면 안되는 데이터는 .env에 작성하여 호출하였다.
  const client_id = "6ded82d87a247a0b4dc56c702bfdc94a";
  
  // process.env.REACT_APP_KAKAO_CLIENT_ID;
  const redirect_uri = "http://localhost:3000/login";
  
  // process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const url = `https://kauth.kakao.com/oauth/authorize?scope=account_email&response_type=code&prompt=login&client_id=${client_id}&redirect_uri=${redirect_uri}`;

  //cors 이슈로 인해 href 방식으로 호출
  const loginKaKao = () => {
    window.location.href = url;
  };
  return (
    <div onClick={loginKaKao}>
      <img src="kakao.png" alt="..." />
    </div>
  );
}

export default KakaoLogin;
