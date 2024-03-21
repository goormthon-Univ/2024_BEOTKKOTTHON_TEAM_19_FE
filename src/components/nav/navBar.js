import Image from "next/image";
import Link from "next/link";
import classes from "./navBar.module.css";

export default function NavBar() {
  return (
    <div className={classes.navContainer}>
      <div className={classes.imgBox}>
        {/* <Link> */}
          <Image src="/image/Home.png" alt="Home icon" width={18} height={18}/>
          <p className={classes.navText}>홈</p>
        {/* </Link> */}
      </div>
      <div className={classes.imgBox}>
        {/* <Link> */}
          {/* <Image src="/image/Home.png" alt="Home icon" width={18} height={18}/> */}
          <p className={classes.navText}>둘러보기</p>
        {/* </Link> */}
      </div>
      <div className={classes.imgBox}>
        {/* <Link> */}
          {/* <Image src="/image/Home.png" alt="Home icon" width={18} height={18}/> */}
          <p className={classes.navText}>히스토리</p>
        {/* </Link> */}
      </div>
    </div>
  )
}
