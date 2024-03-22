"use client"
import useUserInfo from "../../hooks/useUserInfo";
import classes from "./habitDetailComponent.module.css";
import LevelProgressBar from "../progressbar/progresBar";
import { useState } from "react";



export default function HabitDetailComponent({textNumber}) {
  const {userInfo} = useUserInfo();
  const [habit, setHabit] = useState("Temporary Text");
  const [level, setLevel] = useState(1);
  const levelText = ["흙에 씨앗을 심었어요"];

  return (
    <>
      <div className={classes.componentContainer}>
        <p className={classes.habitText}>{userInfo.username || "User"}<span>님의</span><br />{habit}</p>
        <div className={classes.temporaryBox} />
        <div className={classes.levelContainer}>
          <div className={classes.levelBox}><p>Lv.{level}</p></div>
          <p className={classes.levelText}>{levelText[level-1]}</p>
        </div>
        <LevelProgressBar textNumber={textNumber} />
      </div>
    </>
  )
}