"use client";
import classes from "./page.module.css";
import HabitDetailComponent from "../../components/habit/habitDetailComponent.js";
import Navbar from "../../components/nav/navBar";
import CertificationComponent from "../../components/certification/certificationComponent";
import Image from "next/image";
import { useState } from "react";
import CreateCertificationModal from "../../components/certification/createCertification.js";
import { useRef } from "react";

export default function HabitDetailPage() {
  const [textNumber, setTextNumber] = useState(0);
  const [certificationNumber, setCertificationNumber] = useState([]);
  const [total, setTotal] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const dialog = useRef();

  const handleShowModal = () => {
    dialog.current.showModal();
  }

  // const handleCertification = () => {

  // }

  return (
    <>
      <CreateCertificationModal ref={dialog}/>
      <div className={classes.bodyContainer}>
        <div className={classes.topContainer}>
          <HabitDetailComponent textNumber={textNumber} />
        </div>
        <p className={classes.certificationText}>인증글 총 {total}개</p>
        <hr className="mt-5" />
        {certificationNumber.map((number, index) => {
          return (<div className={classes.certificationContainer} key={index}>
            <CertificationComponent />
          </div>)
        })}
        <div className={classes.addBtn} onClick={handleShowModal}>
          <Image src="/image/addBtn.png" alt="addBtn img" width={15} height={15} />
        </div>
        <Navbar />
      </div>
    </>
  )
}
