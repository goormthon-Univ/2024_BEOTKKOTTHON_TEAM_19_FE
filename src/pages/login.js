import Image from "next/image";
import useUserInfo from "../hooks/useUserInfo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const { setUserInfo } = useUserInfo();
  const [username, setUsername] = useState(""); // id
  const [password, setPassword] = useState(""); // pw
  const router = useRouter();

  const handleLogin = async () => {
    const postData = { username, password };
    try {
      const res = await axios.post("/api/users/login", postData);
      const { status, data, message } = res.data;
      if (status === "fail") {
        alert(message);
        return;
      }
      const { accessToken, refreshToken, loginResponseDTO } = data;
      const { id, username, nickname, feedback, treeId } = loginResponseDTO;
      setUserInfo({ accessToken, id, username, nickname, feedback, treeId });
      localStorage.setItem("refreshToken", refreshToken);
      router.push("/mainHome");
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-[30px] items-center p-[20px]">
      <div className="flex flex-col items-center">
        <Image
          className="mb-[14.77px]"
          alt="로고"
          src={require("../../public/image/logo.svg")}
          priority
        />
        <span className="font-[Pretendard-Medium] text-[1.4rem] text-[#333333]">
          꾸준한 습관 기르기
        </span>
        <span className="font-[Happiness-Bold] text-[4.2rem]">원해빗</span>
      </div>
      <div className="w-full flex flex-col gap-[21px] items-center">
        <div className="flex flex-col gap-[40px] w-full">
          <input
            className="text-[1.6rem] placeholder:text-[#999999] placeholder:text-[1.4rem] placeholder:font-[Pretendard-Medium] py-[8.5px] px-[17px] border-b border-b-[#E5E5E5]"
            type="text"
            placeholder="아이디"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="text-[1.6rem] placeholder:text-[#999999] placeholder:text-[1.4rem] placeholder:font-[Pretendard-Medium] py-[8.5px] px-[17px] border-b border-b-[#E5E5E5]"
            type="password"
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
    </div>
  );
}
