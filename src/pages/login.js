import useUserInfo from "../hooks/useUserInfo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const { setUserInfo } = useUserInfo();
  const [username, setUsername] = useState(""); // id
  const [password, setPassword] = useState(""); // pw
  const router = useRouter();

  const handleLogin = async () => {
    const postData = { username, password };
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(postData),
      });
      const { status, data, message } = await res.json();
      if (status === "fail") {
        alert(message);
        return;
      }
      const { accessToken, refreshToken, loginResponseDTO } = data;
      const { id, username, nickname } = loginResponseDTO;
      setUserInfo({ accessToken, id, username, nickname });
      localStorage.setItem("refreshToken", refreshToken);
      router.push("/mainHome");
    } catch (e) {
      // alert("로그인에 실패하였습니다");
    }
  };

  return (
    <div className="flex flex-col gap-[21px] items-center p-[20px]">
      <div className="flex flex-col gap-[40px] w-full">
        <input
          className="text-[1.6rem] placeholder:text-[#999999] placeholder:text-[1.4rem] placeholder:font-[Pretendard-Bold] py-[8.5px] px-[17px] border-b border-b-[#E5E5E5]"
          type="text"
          placeholder="아이디"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="text-[1.6rem] placeholder:text-[#999999] placeholder:text-[1.4rem] placeholder:font-[Pretendard-Bold] py-[8.5px] px-[17px] border-b border-b-[#E5E5E5]"
          type="text"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="w-full disabled:bg-[#E5E5E5] disabled:text-[#999999] bg-[#41C364] text-white text-[1.4rem] font-[Pretendard-Bold] h-[53px] rounded-[6px]"
        onClick={() => handleLogin()}
        disabled={!username.trim() || !password.trim()}
      >
        로그인
      </button>
      <Link
        className="text-[#999999] text-[1.4rem] font-[Pretendard-Bold] underline underline-offset-2"
        href="/signup"
      >
        회원가입
      </Link>
    </div>
  );
}
