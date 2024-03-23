import classes from "./progressBar.module.css";

export default function LevelProgressBar({totalNum}) {
  const levels = [1,2,3,4,5,6];
  const levelNumber = ["0개", "1개", "3개", "10개", "30개", "50개", "100개"];

  const filledLevels = calculateFilledLevel(totalNum);

  function calculateFilledLevel(totalNum) {
    if(totalNum >= 100) return 6;
    if(totalNum >= 50) return 5;
    if(totalNum >= 30) return 4;
    if(totalNum >= 10) return 3;
    if(totalNum >= 3) return 2;
    if(totalNum >= 1) return 1;
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
