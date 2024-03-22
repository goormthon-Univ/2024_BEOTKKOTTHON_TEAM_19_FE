import classes from "./page.module.css";
import HabitDetailComponent from "../../components/habit/habitDetailComponent.js";

export default function HabitDetailPage() {
  return (
    <>
      <div className={classes.topContainer}>
        <HabitDetailComponent />
      </div>
    </>
  )
}