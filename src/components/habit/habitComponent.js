"use client"
import classes from "./habitComponent.module.css";
import { useState } from "react";

export default function HabitComponent() {
  const [day, setDay] = useState(0);
  const [level, setLevel] = useState(1);
  return (
    <div className={classes.habitContainer}>
      <div className={classes.dayBox}>{day}일차 성장중</div>
      <div className={classes.temporaryBox}></div>
      <p className={classes.habitText}>임시 습관</p>
      <p className={classes.levelText}>Lv.{level}</p>
    </div>
  )
}