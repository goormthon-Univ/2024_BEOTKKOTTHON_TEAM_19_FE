"use client"
import classes from "./habitComponent.module.css";
import { useState } from "react";
import Image from "next/image";

export default function HabitComponent({onClick, treeId, habitText, level, url, day}) {
  // const [day, setDay] = useState(0);
  // const treeId = treeId;

  return (
    <div className={classes.habitContainer} onClick={onClick}>
      <div className={classes.dayBox}>{day}일차 성장중</div>
      <Image src={url} alt="treeImg" width={100} height={100} className={classes.imgBox} />
      <p className={classes.habitText}>{habitText}</p>
      <p className={classes.levelText}>Lv.{level}</p>
    </div>
  )
}