import classes from "./growComponents.module.css";

export default function GrowComponent({text, num}) {
  return (
    <div className={classes.conditionBox}>
      <p className={classes.conditionText}>{text}</p>
      <p className={classes.conditionNumber}>{num}개</p>
    </div>
  )
}