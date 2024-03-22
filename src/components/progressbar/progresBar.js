import classes from "./progressBar.module.css";

export default function LevelProgressBar({textNumber}) {
  const levels = [1,2,3,4,5,6,7,];

  const filledLevels = calculateFilledLevel(textNumber);

  function calculateFilledLevel(textNumber) {
    if(textNumber >= 100) return 7;
    if(textNumber >= 50) return 6;
    if(textNumber >= 30) return 5;
    if(textNumber >= 10) return 4;
    if(textNumber >= 3) return 3;
    if(textNumber >= 1) return 2;
    return 1;
  }
  
  return <>
    <div className={classes.progressContainer}>
      {levels.map((level) => {
        return <div key={level} className={`${classes.level} ${classes[`level${level}`]} ${level <= filledLevels ? classes.filled : ""}`}></div>
      })}
    </div>
  </>;
}
