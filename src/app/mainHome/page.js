"use client"
import { useEffect, useState } from "react";
import GrowComponent from "../../components/mainHome/growComponents";
import classes from "./page.module.css";
import CreateHabitComponent from "../../components/mainHome/createHabitComponent";
import NavBar from "../../components/nav/navBar";
import HabitComponent from "../../components/habit/habitComponent";
import useUserInfo from "../../hooks/useUserInfo";
import Link from "next/link";

export default function Home() {
  const [count, setCount] = useState(0);
  const [days, setDays] = useState(0);
  const [habit, setHabit] = useState([]);
  const [tree, setTree] = useState(0);
  // const [user, setUser] = useState("User");
  const {userInfo} = useUserInfo();

  // useEffect(() => {
  //   setUser(userInfo.username)
  // })

  return (
    <div>
      <p className={classes.userGarden}>{userInfo.username || "User"}의 정원</p>
      {/* <p>(내 정원) 공유하기</p> */}
      <p className={classes.growRecord}>성장 과정</p>
      <div className={classes.currentBox}>
        <GrowComponent text="연속 성장" countDay={days} order={true} />
        <GrowComponent text="총 인증글 수" num={count}/>
      </div>
      <div className={classes.habitBox}>
        <p className={classes.habitText}>성장 중인 나무 {tree}그루</p>
        <div className={classes.habitContainer}>
          <HabitComponent />
          <Link href="/createHabit"><CreateHabitComponent /></Link>
        </div>
      </div>
      <NavBar />
    </div>
  )
}