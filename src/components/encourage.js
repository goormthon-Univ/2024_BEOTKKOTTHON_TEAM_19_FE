import { useRef, useState } from "react";

export default function Encourage() {
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [isAdjustClicked, setIdAdjustClicked] = useState(false);
  const modal = useRef(null);

  const handleAdjust = () => {
    setIdAdjustClicked(true);
  };

  const handleOkay = () => {
    setIsModalClosed(true);
  };

  const handleClose = (e) => {
    if (e.target === modal.current) setIsModalClosed(true);
  };

  const handleComplete = () => {
    console.log("습관명 조정 완료");
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
        <div className="w-[174px] h-[174px] bg-slate-200">
          히스토리 보여주기
        </div>

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
