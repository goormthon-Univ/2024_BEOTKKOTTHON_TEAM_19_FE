"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useUserInfo from "../hooks/useUserInfo";
import axios from "axios";
import NavBar from "../components/nav/navBar";
import useIntersect from "../hooks/useIntersect";

export default function UserList() {
  const {
    userInfo: { accessToken },
  } = useUserInfo();
  const [treeList, setTreeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  const getTreeList = useCallback(async () => {
    try {
      setLoading(true); // 데이터 요청 시작 시 로딩 상태 설정
      const res = await axios.get("/api/users/tree-list", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      const { status, data, message } = res.data;
      if (status === "fail") {
        alert(message);
        return;
      }
      setTreeList((prev) => [...prev, ...data]);
      setIsLastPage(data.length === 0);
    } catch (e) {
      console.error("Error fetching tree list:", e);
    } finally {
      setLoading(false); // 데이터 요청 완료 시 로딩 상태 제거
    }
  }, [accessToken]);

  // useIntersect훅에 타겟 감지 시 실행해야할 콜백함수 전달
  const ref = useIntersect((entry, observer) => {
    // 불러올 데이터가 더 이상 없는지 체크
    if (loading || isLastPage) return;
    getTreeList();
  });

  useEffect(() => {
    getTreeList();
  }, [getTreeList]);

  return (
    <div className="h-[100vh] overflow-y-auto pb-[100px]">
      <p>다른 유저의 나무 둘러보기</p>
      <div>
        {treeList.map((v) => (
          <div key={v.treeId}>
            <Image alt="나무" src={v.treeImageUrl} width={150} height={150} />
            <span>{v.habitName}</span>
          </div>
        ))}
      </div>
      <div ref={ref}>{loading ? "로딩 중입니다" : ""}</div>
      <NavBar />
    </div>
  );
}
