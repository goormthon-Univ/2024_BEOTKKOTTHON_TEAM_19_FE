"use client"
import classes from "./page.module.css";
import { useState } from "react";
import useUserInfo from "../../hooks/useUserInfo";

export default function CompleteCreatePage() {
  const {userInfo} = useUserInfo();

  const handleCreate = async (e) => {
    e.preventDefault();
  }
  
  return (
    <>
      <p className={classes.completeText}>{userInfo.username || "User"}님의<br />목표가 심어졌어요!</p>
      <div className={classes.temporaryBox}></div>
      <p className={classes.supportText}>꾸준한 습관 형성을<br/>응원합니다!</p>
      <button className={classes.homeBtn}>Home</button>
    </>
  )
}