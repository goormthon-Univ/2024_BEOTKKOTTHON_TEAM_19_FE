"use client"
import classes from "./page.module.css";
import { useState } from "react";

export default function CompleteCreatePage() {
  // const 
  return (
    <>
      <p className={classes.completeText}>User님의<br />목표가 심어졌어요!</p>
      <div className={classes.temporaryBox}></div>
      <p className={classes.supportText}>꾸준한 습관 형성을 응원합니다!</p>
    </>
  )
}