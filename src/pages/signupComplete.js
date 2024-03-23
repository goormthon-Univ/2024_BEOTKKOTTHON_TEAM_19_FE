import Image from "next/image";
import Link from "next/link";

export default function SignupComplete() {
  return (
    <div className="flex flex-col justify-between items-center gap-[20px] p-[20px] h-[100vh]">
      <div className="flex flex-col items-center justify-between">
        <span className="text-[2.4rem] text-center pt-[80px]">
          <span className="font-[Pretendard-Bold]">취향 소나무</span>님,
          <br /> 가입을 축하드려요
        </span>
        <Image
          className="py-[48px]"
          alt="축하"
          src={require("../../public/image/celebrate.svg")}
          priority
        />
        <span className="text-[2.4rem] text-center">
          앞으로의{" "}
          <span className="font-[Pretendard-Bold]">
            습관 형성을
            <br />
            응원합니다!
          </span>
        </span>
      </div>
      <Link className="w-full" href="/mainHome">
        <button className="w-full disabled:bg-[#E5E5E5] disabled:text-[#999999] bg-[#41C364] text-white text-[1.4rem] font-[Pretendard-Bold] h-[53px] rounded-[6px]">
          습관 만들러 가기
        </button>
      </Link>
    </div>
  );
}
