import Link from "next/link";

export default function SignupComplete() {
  return (
    <div className="flex flex-col justify-between items-center gap-[20px] p-[20px] h-[100vh]">
      <span className="font-[Pretendard-Bold] text-[2.4rem] text-center py-[80px]">
        취향 소나무님,
        <br /> 가입을 축하드려요
      </span>
      <span className="font-[Pretendard-Bold] text-[2.4rem]">
        앞으로의 습관 형성을 응원합니다!
      </span>
      <Link className="w-full" href="/mainHome">
        <button className="w-full disabled:bg-[#E5E5E5] disabled:text-[#999999] bg-[#41C364] text-white text-[1.4rem] font-[Pretendard-Bold] h-[53px] rounded-[6px]">
          습관 만들러 가기
        </button>
      </Link>
    </div>
  );
}
