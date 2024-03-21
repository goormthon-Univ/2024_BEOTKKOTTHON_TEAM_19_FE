import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center p-[20px] h-[100vh]">
      <div className="flex flex-col items-center pt-[200px]">
        <Image
          className="mb-[14.77px]"
          alt="로고"
          src={require("../../public/image/logo.svg")}
        />
        <span className="font-[Pretendard-Medium] text-[1.4rem] text-[#333333]">
          꾸준한 습관 기르기
        </span>
        <span className="font-[Happiness-Bold] text-[4.2rem]">원해빗</span>
      </div>
      <Link className="w-full" href="/login">
        <button className="w-full disabled:bg-[#E5E5E5] disabled:text-[#999999] bg-[#41C364] text-white text-[1.4rem] font-[Pretendard-Bold] h-[53px] rounded-[6px]">
          시작하기
        </button>
      </Link>
    </main>
  );
}
