"use client";
import { forwardRef, useRef, useState, useEffect } from "react";
import classes from "./createCertification.module.css";
import Image from "next/image";
import { resolve } from "styled-jsx/css";
import axios from "axios";
import useUserInfo from "../../hooks/useUserInfo";

const CreateCertificationModal = forwardRef(function CreateCertificationModal(
  {habitId},
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
  const [imgFile, setImgFile] = useState(null);

  const {
    userInfo: { accessToken },
  } = useUserInfo();

  useEffect(() => {
    setIsActive(userText.length > 0 && img.length > 0);
  }, [userText, img]);

  const handleUserText = (e) => {
    const userTextValue = e.target.value;
    setUserText(userTextValue);
  };

  const handleUserImg = (file) => {
    if(!file) {
      return;
    }
    setImgFile(file);
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

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
  
    // FormData 인스턴스 생성
    const formData = new FormData();
    
    // imgFile 상태가 파일 객체를 직접 가지고 있어야 합니다.
    // img 상태 대신 imgFile을 사용하여 파일을 저장하고 관리해야 합니다.
    if(imgFile) { // imgFile은 handleUserImg에서 설정한 파일 객체의 상태입니다.
      formData.append("image", imgFile); // "image"는 서버에서 파일을 참조하는 키입니다.
    }
    
    formData.append("userText", userText); // 사용자 텍스트 추가
  
    try {
      const response = await axios.post(
        "/api/trees/post-images",
        formData, // FormData 객체 전송
        {
          headers: {
            // 'Content-Type': 'multipart/form-data', // 중요: multipart/form-data 유형 명시
            'Authorization': `Bearer ${accessToken}`, // 필요한 경우 토큰 추가
          },
        }
      );
      if(response.status === 200) {
        console.log("img success");
        console.log(response.data); // 성공 응답 처리
      }
    } catch (error) {
      console.error('업로드 실패:', error);
    }
  }
  

  if(edit) {
    console.log(img);
  }

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
          <p className={isActive ? classes.activeText : classes.submitText} onClick={handleSubmit}>
            등록하기
          </p>
        </div>
      </form>
    </dialog>
  );
});

export default CreateCertificationModal;
