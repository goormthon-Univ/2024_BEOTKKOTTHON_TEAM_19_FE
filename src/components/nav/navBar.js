import Image from "next/image";
import Link from "next/link";
import classes from "./navBar.module.css";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  return (
    <div className={classes.navContainer}>
      <div className="grid grid-cols-3 w-full justify-items-center">
        <div className={classes.imgBox}>
          <Link
            href="/mainHome"
            className="flex flex-col items-center px-[16px] gap-[4px]"
          >
            <Image
              src={
                router.pathname === "/mainHome"
                  ? require("../../../public/image/home-green.svg")
                  : require("../../../public/image/home.svg")
              }
              alt="내 습관 보기"
              width={18}
              height={18}
            />
            <p
              className={`font-[Pretendard-Medium] text-[1.4rem] ${
                router.pathname === "/mainHome"
                  ? "text-[#41C364]"
                  : "text-[#999999]"
              }`}
            >
              홈
            </p>
          </Link>
        </div>
        <div className={classes.imgBox}>
          <Link
            href="/userList"
            className="flex flex-col items-center px-[16px] gap-[4px]"
          >
            <Image
              src={
                router.pathname === "/userList"
                  ? require("../../../public/image/garden-green.svg")
                  : require("../../../public/image/garden.svg")
              }
              alt="다른 유저 습관 보기"
              width={18}
              height={18}
            />
            <p
              className={`font-[Pretendard-Medium] text-[1.4rem] ${
                router.pathname === "/userList"
                  ? "text-[#41C364]"
                  : "text-[#999999]"
              }`}
            >
              둘러보기
            </p>
          </Link>
        </div>
        <div className={classes.imgBox}>
          <Link
            href="/myHistory"
            className="flex flex-col items-center px-[16px] gap-[4px]"
          >
            <Image
              src={
                router.pathname === "/myHistory"
                  ? require("../../../public/image/history-green.svg")
                  : require("../../../public/image/history.svg")
              }
              alt="내 인증글 보기"
              width={18}
              height={18}
            />
            <p
              className={`font-[Pretendard-Medium] text-[1.4rem] ${
                router.pathname === "/myHistory"
                  ? "text-[#41C364]"
                  : "text-[#999999]"
              }`}
            >
              히스토리
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
