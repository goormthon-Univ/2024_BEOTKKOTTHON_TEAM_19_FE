import classes from "./growComponents.module.css";

export default function GrowComponent({text, num, countDay, order}) {
  return (
    <div className={classes.conditionBox}>
      <p className={classes.conditionText}>{text}</p>
      {order ? <p className={classes.conditionNumber}>{countDay}일</p> : <p className={classes.conditionNumber}>{num}개</p>}
    </div>
  )
}