import axios from "axios";
import { useEffect, useState } from "react";
import useUserInfo from "../hooks/useUserInfo";
import Image from "next/image";
import NavBar from "../components/nav/navBar";

export default function MyHistory() {
  const {
    userInfo: { accessToken },
  } = useUserInfo();
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      console.log(accessToken);
      try {
        const res = await axios.get("/api/users/histories", {
          headers: { authorization: `Bearer ${accessToken}` },
        });
        const { status, data, message } = res.data;
        if (status === "fail") {
          alert(message);
          return;
        }
        setHistoryList(data);
      } catch (e) {
        console.log(e);
      }
    };
    getHistory();
  }, [accessToken]);

  return (
    <div className="h-[100vh] overflow-y-auto">
      <div className="p-[20px]">
        <span className="text-[1.8rem] font-[Pretendard-Bold]">
          인증글 총 {historyList.length}개
        </span>
      </div>
      {historyList.map((v) => (
        <div className="border-t border-t-[#E5E5E5]" key={v.treePostId}>
          <div className="py-[11px] px-[20px]">
            <span className="text-[1.2rem]">{v.createdAt}</span>
          </div>
          <Image
            alt="인증샷"
            src={v.treePostImageUrl}
            width={300}
            height={300}
            className="w-full h-auto"
            priority
          />
          <div className="pt-[16px] pb-[30px] px-[20px]">
            <span>{v.treePostContent}</span>
          </div>
        </div>
      ))}
      <NavBar />
    </div>
  );
}
