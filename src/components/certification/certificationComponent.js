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
        <div className={classes.imgBox}><Image src={url} alt="userImg" objectFit="fill" width={100} height={100} className={classes.userImg} /></div>
        <p className={classes.userText}>{text}</p>
      </div>
    </>
  )
}