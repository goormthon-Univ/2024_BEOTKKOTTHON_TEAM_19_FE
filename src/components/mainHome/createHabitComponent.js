import classes from "./createHabitComponent.module.css";
import Image from "next/image";

export default function CreateHabitComponent() {
  return (
    <div className={classes.createBox}>
      <Image src="/image/edit.svg" alt="editImg" width={50} height={50} />
    </div>
  )
}