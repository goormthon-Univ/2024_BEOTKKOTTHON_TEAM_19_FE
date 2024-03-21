import classes from "./page.module.css";

export default function CreateHabitPage() {
  return (
    <>
      <p className={classes.infoText}>나무 심기를 위한 <br /> 목표 습관을 정해주세요</p>
      <form>
        <input type="text" className={classes.titleField} />
      </form>
    </>
  )
}