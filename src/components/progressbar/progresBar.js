import classes from "./progressBar.module.css";

export default function LevelProgressBar({textNumber}) {
  const levels = [1,2,3,4,5,6,7,];
  return <>
    <div className={classes.progressContainer}>
      {levels.map((level) => {
        return <div key={level} className={`${classes.level} ${classes[`level${level}`]}`}></div>
      })}
    </div>
  </>;
}
