"use client"
import { useEffect, useState } from "react";
import classes from "./page.module.css";

export default function CreateHabitPage() {
  const [activeBtn, setActiveBtn] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const activeBtntHandler = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setActiveBtn(newValue.length > 0);
  }



  return (
    <>
      <p className={classes.infoText}>나무 심기를 위한 <br /> 목표 습관을 정해주세요</p>
      <form>
        <input type="text" className={classes.titleField} placeholder="목표를 작성해 주세요" value={inputValue} onChange={activeBtntHandler} />
        <div className={classes.explainContainer}>
          <div className={classes.questionBox}><p className={classes.questionMark}>?</p></div>
          <p className={classes.questionText}>다른 사람들은 어떤 습관을 적었을까요?</p>
        </div>
        <p className={classes.exText}>매일 1시간 걷기, 하루 2L 물 마시기</p>
        <button className={activeBtn ? classes.activeCreateBtn : classes.createBtn}>습관 만들기</button>
      </form>
    </>
  )
}