import classes from "./progressBar.module.css";

export default function LevelProgressBar({textNumber}) {
  const levels = [1,2,3,4,5,6];
  const levelNumber = ["0개", "1개", "3개", "10개", "30개", "50개", "100개"];

  const filledLevels = calculateFilledLevel(textNumber);

  function calculateFilledLevel(textNumber) {
    if(textNumber >= 100) return 6;
    if(textNumber >= 50) return 5;
    if(textNumber >= 30) return 4;
    if(textNumber >= 10) return 3;
    if(textNumber >= 3) return 2;
    if(textNumber >= 1) return 1;
    return 0;
  }
  
  return <>
    <div className={classes.levelContainer}>
      <div className={classes.progressContainer}>
        {levels.map((level) => {
          return <div key={level} className={`${classes.level} ${classes[`level${level}`]} ${level <= filledLevels ? classes.filled : ""}`}></div>
        })}
      </div>
      <div className={classes.numberContainer}>
          {levelNumber.map((num, index) => {
            return <p key={index} className={classes.totalText}>{num}</p>
          })}
      </div>
    </div>
  </>;
}
