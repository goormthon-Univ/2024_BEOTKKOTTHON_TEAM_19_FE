"use client";
import { forwardRef, useRef, useState, useEffect } from "react";
import classes from "./createCertification.module.css";
import Image from "next/image";
import { resolve } from "styled-jsx/css";

const CreateCertificationModal = forwardRef(function CreateCertificationModal(
  props,
  ref
) {
  const handleCloseModal = () => {
    ref.current.close();
    setImg("");
    setUserText("");
    if (imgUpload.current) {
      imgUpload.current.value = "";
    }
    setEdit(false);
  };

  const imgUpload = useRef();
  const [img, setImg] = useState("");
  const [userText, setUserText] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setIsActive(userText.length > 0 && img.length > 0);
  }, [userText, img]);

  const handleUserText = (e) => {
    const userTextValue = e.target.value;
    setUserText(userTextValue);
  };

  const handleUserImg = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
      setEdit(false);
    };
    reader.readAsDataURL(file);
  };

  const handleImgUpload = () => {
    imgUpload.current.click();
  };

  const handleEdit = () => {
    if (edit) {
      handleImgUpload();
    } else {
      setEdit(true);
    }
  };

  // const handleEditUpload = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   return new Promise((resolve) => {
  //     reader.onload = () => {
  //       setImg(reader.result);
  //       resolve();
  //     }
  //   })
  // }
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  // }

  return (
    <dialog ref={ref} className={classes.createModal}>
      <form>
        <div className={classes.topContainer}>
          <p className={classes.habitText}>습관 일지</p>
          <Image
            src="/image/close.svg"
            alt="backImg"
            width={15}
            height={8}
            onClick={handleCloseModal}
          />
        </div>
        <hr />
        <div className={classes.imgContainer}>
          <input
            type="file"
            accept="image/*"
            className={classes.imgField}
            ref={imgUpload}
            onChange={(e) => handleUserImg(e.target.files[0])}
          />
          {img ? (
            ""
          ) : (
            <p className={classes.imgText} onClick={handleImgUpload}>
              이미지 첨부
            </p>
          )}
          {img && (
            <Image
              priority
              src={img}
              alt="userImg"
              layout="fill"
              objectFit="cover"
              onClick={handleEdit}
            />
          )}
          {edit && (
            <div className={classes.overlay}>
              <p className={classes.editText} onClick={handleImgUpload}>
                이미지 수정하기
              </p>
            </div>
          )}
        </div>
        <textarea
          className={classes.inputField}
          placeholder="오늘의 습관일지를 작성해 보세요!"
          rows={3}
          cols={50}
          maxLength={150}
          value={userText}
          onChange={handleUserText}
        />
        <div className={isActive ? classes.activeBox : classes.submitBox}>
          <p className={isActive ? classes.activeText : classes.submitText}>
            등록하기
          </p>
        </div>
      </form>
    </dialog>
  );
});

export default CreateCertificationModal;
