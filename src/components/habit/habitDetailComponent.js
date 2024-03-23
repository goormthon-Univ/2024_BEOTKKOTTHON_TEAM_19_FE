"use client"
import useUserInfo from "../../hooks/useUserInfo";
import classes from "./habitDetailComponent.module.css";
import LevelProgressBar from "../progressbar/progresBar";
import { useState } from "react";
import Image from "next/image";



export default function HabitDetailComponent({totalNum, habitText, url, level}) {
  const {userInfo} = useUserInfo();
  // const [habit, setHabit] = useState("Temporary Text");
  // const [level, setLevel] = useState(1);
  const levelText = ["흙에 씨앗을 심었어요"];

  return (
    <>
      <div className={classes.componentContainer}>
        <p className={classes.habitText}>{userInfo.username || "User"}<span>님의</span><br />{habitText}</p>
        <Image src={url} alt="plantImg" width={100} height={100} className={classes.imgBox} />
        <div className={classes.levelContainer}>
          <div className={classes.levelBox}><p>Lv.{level}</p></div>
          <p className={classes.levelText}>{levelText[level]}</p>
        </div>
        <LevelProgressBar totalNum={totalNum} />
      </div>
    </>
  )
}