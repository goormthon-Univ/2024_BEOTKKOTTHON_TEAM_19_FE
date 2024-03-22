"use client";
import classes from "./page.module.css";
import HabitDetailComponent from "../../components/habit/habitDetailComponent.js";
import Navbar from "../../components/nav/navBar";
import CertificationComponent from "../../components/certification/certificationComponent";
import Image from "next/image";
import { useState } from "react";

export default function HabitDetailPage() {
  const [textNumber, setTextNumber] = useState(0);
  const [certificationNumber, setCertificationNumber] = useState([""]);

  // const handleCertification = () => {

  // }

  return (
    <div className={classes.bodyContainer}>
      <div className={classes.topContainer}>
        <HabitDetailComponent textNumber={textNumber} />
      </div>
      <p className={classes.certificationText}>인증글</p>
      {certificationNumber.map((number, index) => {
        return <CertificationComponent key={index}/>
      })}
      <div className={classes.addBtn}>
        <Image src="/image/addBtn.png" alt="addBtn img" width={15} height={15} />
      </div>
      <Navbar />
    </div>
  )
}
