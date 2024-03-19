"use client";
import useUserInfo from "@hooks/useUserInfo";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const { setUserInfo, userInfo } = useUserInfo();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const loginData = { accessToken: "sdfs", password: "123213" };
      //   const userInfo = await fetch("", {
      //     method: "POST",
      //     body: loginData,
      //   });
      //   setUserInfo(userInfo);
      setUserInfo(loginData);
      router.push("/home");
    } catch (e) {
      alert("로그인에 실패하였습니다");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="아이디를 입력해 주세요"
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="비밀번호를 입력해 주세요"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => handleLogin()}>로그인</button>
    </div>
  );
};

export default Login;
