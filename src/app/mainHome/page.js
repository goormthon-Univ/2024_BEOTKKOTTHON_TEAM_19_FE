"use Client"
import GrowComponent from "../../components/mainHome/growComponents";
import classes from "./page.module.css";
import CreateHabitComponent from "../../components/mainHome/createHabitComponent";
import NavBar from "../../components/nav/navBar";

export default function Home() {
  return (
    <div>
      <p className={classes.userGarden}>User의 정원</p>
      {/* <p>(내 정원) 공유하기</p> */}
      <p className={classes.growRecord}>성장 과정</p>
      <div className={classes.currentBox}>
        <GrowComponent text="연속 성장" />
        <GrowComponent text="총 인증 글 수"/>
      </div>
      <div className={classes.habitBox}>
        <p className={classes.habitText}>습관 목록</p>
        <CreateHabitComponent />
      </div>
      <NavBar />
    </div>
  )
}