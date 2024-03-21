import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center p-[20px] h-[100vh]">
      <h1>원해빗</h1>
      <Link className="w-full" href="/login">
        <button className="w-full disabled:bg-[#E5E5E5] disabled:text-[#999999] bg-[#41C364] text-white text-[1.4rem] font-[Pretendard-Bold] h-[53px] rounded-[6px]">
          시작하기
        </button>
      </Link>
    </main>
  );
}
