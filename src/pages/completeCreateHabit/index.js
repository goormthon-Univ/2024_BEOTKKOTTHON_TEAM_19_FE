"use client"
import classes from "./page.module.css";
import { useState } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CompleteCreatePage() {
  const {userInfo} = useUserInfo();
  const router = useRouter();

  const handleMoveHome = () => {
    router.push("/mainHome");
  }
  
  return (
    <>
      <Image src="/image/close.svg" alt="closeImg" width={12} height={12} className={classes.closeImg} onClick={handleMoveHome}/>
      <p className={classes.completeText}>{userInfo.username || "User"}님의<br />목표가 심어졌어요!</p>
      <Image src="/image/startPlant.svg" alt="plantImg" width={228} height={295} className={classes.plantImg} />
      <p className={classes.supportText}>꾸준한 습관 형성을<br/>응원합니다!</p>
    </>
  )
}