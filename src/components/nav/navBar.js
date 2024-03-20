import Image from "next/image";
import Link from "next/link";
import homeImg from "@/component/image/Home.png";
import classes from "./navBar.module.css";

export default function NavBar() {
  return (
    <div className={classes.navContainer}>
      <div className={imgBox}>
        <Link>
          <Image src={homeImg} alt="Home icon" />
          <p>홈</p>
        </Link>
      </div>
    </div>
  )
}