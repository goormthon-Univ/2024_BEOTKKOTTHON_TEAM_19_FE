"use client"
import { forwardRef, useRef, useState } from "react";
import classes from "./createCertification.module.css";
import Image from "next/image";

const CreateCertificationModal =  forwardRef(function CreateCertificationModal(props, ref) {
  const handleCloseModal = () => {
    ref.current.close();
  }

  const imgUpload = useRef();

  const handleImgUpload = () => {
    imgUpload.current.click();
  }
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  // }

  return (
    <dialog ref={ref} className={classes.createModal}>
      <form>
        <div className={classes.topContainer}>
          <Image src="/image/back.svg" alt="backImg" width={15} height={8} onClick={handleCloseModal} />
          <p className={classes.writeText}>작성</p>
        </div>
        <hr />
        <textarea className={classes.inputField} placeholder="오늘의 습관일지를 작성해 보세요!" rows={5} cols={50} />
        <hr />
        <input type="file" accept="image/*" className={classes.imgField} ref={imgUpload}/>
        <p className={classes.imgText} onClick={handleImgUpload}>이미지 첨부</p>
      </form>
    </dialog>
  )
})

export default CreateCertificationModal;

