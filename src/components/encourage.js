import axios from "axios";
import Image from "next/image";
import { useRef, useState } from "react";
import SwiperCore, { Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Encourage({ treeId, treePostImageUrls }) {
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [isAdjustClicked, setIsAdjustClicked] = useState(false);
  const modal = useRef(null);
  const [habitName, setHabitName] = useState("");
  console.log(treeId, treePostImageUrls);
  const handleAdjust = () => {
    setIsAdjustClicked(true);
  };

  const handleOkay = () => {
    setIsModalClosed(true);
  };

  const handleClose = (e) => {
    if (e.target === modal.current) setIsModalClosed(true);
  };

  const handleComplete = async () => {
    try {
      const res = await axios.patch(`/api/trees/${treeId}`, {
        name: habitName,
      });
      const { status, data, message } = res.data;
      if (status === "fail") {
        alert(message);
        return;
      }
      alert("목표 조정에 성공하였습니다!");
      setIsModalClosed(true);
    } catch (e) {
      console.log(e);
    }
  };

  SwiperCore.use([Navigation, Scrollbar]);
  const swiperRef = useRef();
  const breakpoints = {
    768: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    1024: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    1200: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
  };

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center ${
        isModalClosed && "hidden"
      }`}
      ref={modal}
      onClick={handleClose}
    >
      <div className="w-[350px] rounded-[6px] bg-white flex flex-col items-center gap-[17.8px] py-[16px] px-[19px]">
        <p className="font-[Pretendard-Medium] text-[2rem] text-center">
          나무가 한동안 자라지 못했어요
          <br />
          지난 날의 습관을 되돌아봐요
        </p>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          // pagination={{ clickable: true }}
          navigation
          breakpoints={breakpoints}
          className="w-[174px] h-[174px]"
        >
          {treePostImageUrls?.map((image) => (
            <SwiperSlide key={image.id}>
              <Image
                src={image.imgUrl}
                alt={image.title}
                width={174}
                height={174}
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className={`w-full flex gap-[12px] ${isAdjustClicked && "hidden"}`}
        >
          <button
            className="w-full disabled:bg-[#E5E5E5] disabled:text-[#999999] bg-[#41C364] text-white text-[1.4rem] font-[Pretendard-Bold] h-[53px] rounded-[6px]"
            onClick={handleAdjust}
          >
            목표 조정하기
          </button>
          <button
            className="w-full bg-white text-[#41C364] text-[1.4rem] font-[Pretendard-Bold] h-[53px] rounded-[6px] border border-[#41C364]"
            onClick={handleOkay}
          >
            괜찮아요
          </button>
        </div>

        <div
          className={`w-full flex flex-col gap-[18px] ${
            isAdjustClicked || "hidden"
          }`}
        >
          <input
            className="w-full h-[53px] px-[16px] border border-[#E5E5E5] rounded-[6px] placeholder:font-[Pretendard-Medium] placeholder:text-[1.4rem] placeholder:text-[#999999] text-[1.6rem]"
            type="text"
            placeholder="예시) 하루에 운동 1시간 → 하루에 운동 30분"
            onChange={(e) => setHabitName(e.target.value)}
          />
          <button
            className="w-full disabled:bg-[#E5E5E5] disabled:text-[#999999] bg-[#41C364] text-white text-[1.4rem] font-[Pretendard-Bold] h-[53px] rounded-[6px]"
            onClick={handleComplete}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
