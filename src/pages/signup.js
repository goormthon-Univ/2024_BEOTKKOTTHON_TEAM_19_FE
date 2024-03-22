import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [isDuplicatedUsername, setIsDuplicatedUsername] = useState(true);
  const [isDuplicatedNickname, setIsDuplicatedNickname] = useState(true);

  const handleDuplicatedUsername = async () => {
    const postData = { username };
    try {
      const res = await fetch("/api/check-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const { status, data } = await res.json();
      if (status === "fail") {
        alert(data.username);
        return;
      }
      alert(data);
      setIsDuplicatedUsername(false);
    } catch (e) {
      alert("아이디 중복 확인에 실패하였습니다");
    }
  };

  const handleDuplicatedNickname = async () => {
    const postData = { nickname };
    try {
      const res = await fetch("/api/check-nickname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const { status, data } = await res.json();
      if (status === "fail") {
        alert(data.nickname);
        return;
      }
      alert(data);
      setIsDuplicatedNickname(false);
    } catch (e) {
      alert("닉네임 중복 확인에 실패하였습니다");
    }
  };

  const checkPassword = () => {
    return password === passwordCheck;
  };

  const handleSignup = async () => {
    if (!checkPassword()) {
      alert("비밀번호를 확인해 주세요");
      return;
    }
    const postData = { username, password, nickname };
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const { status, data } = await res.json();
      if (status === "fail") {
        alert(data.password);
        return;
      }
      const { accessToken, refreshToken, loginResponseDTO } = data;
      const { id, username, nickname } = loginResponseDTO;
      setUserInfo({ accessToken, id, username, nickname });
      localStorage.setItem("refreshToken", refreshToken);
      router.push("/signupComplete");
    } catch (e) {
      // alert("회원가입에 실패하였습니다");
    }
  };

  return (
    <div className="flex flex-col justify-between gap-[31px] p-[20px]">
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[6px]">
            <div className="flex justify-center items-center bg-[#41C364] w-[24px] h-[24px] rounded-full">
              <span className="font-[Pretendard-Bold] text-[1.4rem] text-white">
                1
              </span>
            </div>
            <span className="font-[Pretendard-Bold] text-[2.4rem]">
              사용할 아이디를 입력해 주세요
            </span>
          </div>
          <div className="flex gap-[12px]">
            <input
              className="text-[1.6rem] px-[16px] rounded-[6px] w-full h-[53px] border border-[#E5E5E5] placeholder:text-[#999999] placeholder:text-[1.4rem] placeholder:font-[Pretendard-Medium]"
              type="text"
              placeholder="6자~20자까지 가능해요"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="font-[Pretendard-Medium] text-[1.4rem] rounded-[6px] w-[118px] h-[53px] disabled:bg-[#E5E5E5] disabled:text-[#999999] bg-[#41C364] text-white"
              disabled={!username}
              onClick={handleDuplicatedUsername}
            >
              중복 확인
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[6px]">
            <div className="flex justify-center items-center bg-[#41C364] w-[24px] h-[24px] rounded-full">
              <span className="font-[Pretendard-Bold] text-[1.4rem] text-white">
                2
              </span>
            </div>
            <span className="font-[Pretendard-Bold] text-[2.4rem]">
              비밀번호를 입력해 주세요
            </span>
          </div>
          <div className="flex flex-col gap-[12px]">
            <input
              className="text-[1.6rem] px-[16px] rounded-[6px] w-full h-[53px] border border-[#E5E5E5] placeholder:text-[#999999] placeholder:text-[1.4rem] placeholder:font-[Pretendard-Medium]"
              type="password"
              placeholder="문자, 숫자, 특수문자를 포함한 8자~20자"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="text-[1.6rem] px-[16px] rounded-[6px] w-full h-[53px] border border-[#E5E5E5] placeholder:text-[#999999] placeholder:text-[1.4rem] placeholder:font-[Pretendard-Medium]"
              type="password"
              placeholder="비밀번호 확인"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[6px]">
            <div className="flex justify-center items-center bg-[#41C364] w-[24px] h-[24px] rounded-full">
              <span className="font-[Pretendard-Bold] text-[1.4rem] text-white">
                3
              </span>
            </div>
            <span className="font-[Pretendard-Bold] text-[2.4rem]">
              어떤 닉네임으로 불러드릴까요?
            </span>
          </div>
          <div className="flex flex-col gap-[32px]">
            <div className="flex gap-[12px]">
              <input
                className="text-[1.6rem] px-[16px] rounded-[6px] w-full h-[53px] border border-[#E5E5E5] placeholder:text-[#999999] placeholder:text-[1.4rem] placeholder:font-[Pretendard-Medium]"
                type="text"
                placeholder="공백 포함 8글자까지 가능해요"
                onChange={(e) => setNickname(e.target.value)}
              />
              <button
                className="font-[Pretendard-Medium] text-[1.4rem] rounded-[6px] w-[118px] h-[53px] disabled:bg-[#E5E5E5] disabled:text-[#999999] bg-[#41C364] text-white"
                disabled={!nickname}
                onClick={handleDuplicatedNickname}
              >
                중복 확인
              </button>
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-[8px]">
                <div className="flex justify-center items-center bg-[#41C364] w-[24px] h-[24px] rounded-full">
                  <span className="font-[Pretendard-Bold] text-[1.4rem] text-white">
                    2
                  </span>
                </div>
                <span className="font-[Pretendard-Bold] text-[1.4rem]">
                  닉네임 예시를 참고해 보세요
                </span>
              </div>
              <span className="text-[#999999] text-[1.4rem] pl-[30px]">
                취향 소나무, 행운의 클로버, 무럭무럭
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        className="w-full disabled:bg-[#E5E5E5] disabled:text-[#999999] bg-[#41C364] text-white text-[1.4rem] font-[Pretendard-Bold] h-[53px] rounded-[6px]"
        onClick={handleSignup}
        disabled={
          !username.trim() ||
          !password.trim() ||
          !nickname.trim() ||
          isDuplicatedUsername ||
          isDuplicatedNickname
        }
      >
        확인
      </button>
    </div>
  );
}
