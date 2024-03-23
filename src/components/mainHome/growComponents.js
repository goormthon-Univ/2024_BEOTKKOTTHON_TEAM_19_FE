import classes from "./growComponents.module.css";
import Image from "next/image";

export default function GrowComponent({text, num, countDay, order}) {
  return (
    <div className={classes.conditionBox}>
      <div>
        <p className={classes.conditionText}>{text}</p>
        {order ? <p className={classes.conditionNumber}>{countDay}일</p> : <p className={classes.conditionNumber}>{num}개</p>}
      </div>
      <div className={classes.imgBox}>{order ? <Image src="/image/tree.svg" alt="img" width={50} height={50} /> : <Image src="/image/write.svg" alt="img" width={50} height={50} />}</div>
    </div>
  )
}