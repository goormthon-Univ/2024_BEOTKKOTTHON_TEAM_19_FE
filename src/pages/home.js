"use client";
import useUserInfo from "@hooks/useUserInfo";

const Home = () => {
  const { userInfo } = useUserInfo();
  console.log(userInfo, "home");
  return <div>{userInfo.accessToken} 홈</div>;
};

export default Home;
