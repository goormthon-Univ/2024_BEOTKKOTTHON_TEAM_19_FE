"use client";
import classes from "./page.module.css";
import HabitDetailComponent from "../../components/habit/habitDetailComponent.js";
import Navbar from "../../components/nav/navBar";
import CertificationComponent from "../../components/certification/certificationComponent";
import Image from "next/image";
import { useState } from "react";
import CreateCertificationModal from "../../components/certification/createCertification.js";
import { useRef } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router.js";
import axios from "axios";
import useUserInfo from "../../hooks/useUserInfo.js";

export default function HabitDetailPage() {
  // const [textNumber, setTextNumber] = useState(0);
  const [certificationNumber, setCertificationNumber] = useState([]);
  const [total, setTotal] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [data, setData] = useState([]);
  const dialog = useRef();
  const router = useRouter();
  const habitId = router.query;
  const {
    userInfo: { accessToken },
  } = useUserInfo();

  const handleShowModal = () => {
    dialog.current.showModal();
  }

  useEffect(() => {
    const handleGetHabitDetail = async () => {
      try {
        console.log(habitId.habitId);
        const response = await axios.get(
          `/api/trees/${habitId.habitId}`,
          {
            headers: { authorization: `Bearer ${accessToken}` },
          }
        );
        if(response.status === 200) {
          console.log("성공");
          console.log(response.data);
          setData(response.data.data);
        }
      }
      catch (error) {
        console.error(error);
      }
    }

    const handleGetEachHabitDetail = async () => {
      try {
        const countResponse = await axios.get(
          `/api/trees/${habitId.habitId}/post-counts`,
          {
            headers: { authorization: `Bearer ${accessToken}` },
          }
        );
        if(countResponse.status === 200) {
          console.log("success");
          console.log(countResponse.data);
          setTotal(countResponse.data.data.totalCount);
          setTodayCount(prevCount => prevCount+=1);
        }
      } catch(error) {
        console.error(error);
      }
    }

    const handleGetCertification = async () => {
      try {
        const certificationResponse = await axios.get (
          `/api/trees/${habitId.habitId}/posts`,
          {
            headers: { authorization: `Bearer ${accessToken}` },
          }
        );
        if(certificationResponse.status === 200) {
          console.log("인증글 가져오기 성공");
          console.log(certificationResponse.data);
          setCertificationNumber(certificationResponse.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    handleGetHabitDetail();
    handleGetEachHabitDetail();
    handleGetCertification();
  }, [accessToken])

  if(todayCount>=3) {
    alert("오늘 인증 개수 초과 ");
  }

  // const handleCertification = () => {

  // }

  return (
    <>
      <CreateCertificationModal ref={dialog} habitId={habitId}/>
      <div className={classes.bodyContainer}>
        <div className={classes.topContainer}>
          <HabitDetailComponent totalNum={total} habitText={data.habitName} url={data.imageUrl} level={data.treeLevel}/>
        </div>
        <p className={classes.certificationText}>인증글 총 {total}개</p>
        {certificationNumber.map((data, index) => {
          return (<div className={classes.certificationContainer} key={index}>
            <CertificationComponent date={data.createdAt} url={data.treePostImageUrl} text={data.treePostContent}  />
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