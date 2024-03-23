import classes from "./certificationComponent.module.css";
import Image from "next/image";

export default function CertificationComponent({date, url, text}) {
  const nowDate = new Date(date);
  const year = nowDate.getFullYear();
  const month = nowDate.getMonth() + 1;
  const day = nowDate.getDate();
  
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  return (
    <>
      <hr />
      <div className={classes.certificationContainer}>
        <p className={classes.dateText}>{formattedDate}</p>
        {/* <Image src={url} alt="userImg" width={100} height={100} className={userImg} /> */}
        <p className={classes.userText}>{text}</p>
      </div>
    </>
  )
}