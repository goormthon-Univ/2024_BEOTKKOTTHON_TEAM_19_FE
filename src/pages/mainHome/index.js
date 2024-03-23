"use client";
import { useEffect, useState } from "react";
import GrowComponent from "../../components/mainHome/growComponents";
import classes from "./page.module.css";
import CreateHabitComponent from "../../components/mainHome/createHabitComponent";
import NavBar from "../../components/nav/navBar";
import HabitComponent from "../../components/habit/habitComponent";
import useUserInfo from "../../hooks/useUserInfo";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [count, setCount] = useState(0);
  const [days, setDays] = useState(0);
  const [habit, setHabit] = useState(["1", "2"]);
  const [tree, setTree] = useState(0);
  // const [user, setUser] = useState("User");
  const { userInfo } = useUserInfo();

  const {
    userInfo: { accessToken },
  } = useUserInfo();

  useEffect(() => {
    console.log(`${accessToken}`);
    const handleGetHabit = async () => {
      try {
        const response = await axios.get(
          "/api/trees/",
          {
            headers: { authorization: `Bearer ${accessToken}` },
          }
        );
        if (response.status === 200) {
          setHabit(response.data);
          console.log("불러오기 성공");
        }
      } catch (error) {
        console.error(error);
      }
    }

    handleGetHabit();
  })


  return (
    <div className="h-[100vh] bg-[#EBFAEF] overflow-y-auto">
      <div className="flex flex-col gap-[60px] pt-[21px] pb-[25px] px-[20px] bg-white">
        <div className="flex justify-between">
          <p className={classes.userGarden}>
            {userInfo.username || "User"}의 정원
          </p>
          {/* <p>(내 정원) 공유하기</p> */}
        </div>
        <div className="flex flex-col gap-[20px]">
          <p className={classes.growRecord}>성장 과정</p>
          <div className={classes.currentBox}>
            <GrowComponent text="연속 성장" countDay={days} order={true} />
            <GrowComponent text="총 인증글 수" num={count} />
          </div>
        </div>
      </div>

      <div className="pt-[17px] pb-[100px] px-[20px]">
        <div className={classes.habitBox}>
          <p className={classes.habitText}>성장 중인 나무 {tree}그루</p>
          <div className={classes.habitContainer}>
            {habit.map((data, index) => {
              return <Link href={`/mainHome/${index}`} key={index}>
                <HabitComponent />
            </Link>
            })}
            <Link className="w-full" href="/createHabit">
              <CreateHabitComponent />
            </Link>
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );
}
