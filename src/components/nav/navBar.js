import Image from "next/image";
import Link from "next/link";
import classes from "./navBar.module.css";

export default function NavBar() {
  return (
    <div className={classes.navContainer}>
      <div className="grid grid-cols-3 w-full justify-items-center">
        <div className={classes.imgBox}>
          <Link
            href="/mainHome"
            className="flex flex-col items-center px-[16px] gap-[4px]"
          >
            <Image
              src={require("../../../public/image/home.svg")}
              alt="내 습관 보기"
              width={18}
              height={18}
            />
            <p className={classes.navText}>홈</p>
          </Link>
        </div>
        <div className={classes.imgBox}>
          <Link
            href="/userList"
            className="flex flex-col items-center px-[16px] gap-[4px]"
          >
            <Image
              src={require("../../../public/image/garden.svg")}
              alt="다른 유저 습관 보기"
              width={18}
              height={18}
            />
            <p className={classes.navText}>둘러보기</p>
          </Link>
        </div>
        <div className={classes.imgBox}>
          <Link
            href="/myHistory"
            className="flex flex-col items-center px-[16px] gap-[4px]"
          >
            <Image
              src={require("../../../public/image/history.svg")}
              alt="내 인증글 보기"
              width={18}
              height={18}
            />
            <p className={classes.navText}>히스토리</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
