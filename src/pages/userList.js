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
  const [fetchingData, setFetchingData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [isEnd, setIsEnd] = useState(false);

  const getTreeList = useCallback(async () => {
    if (loading) return; // 이미 로딩 중이면 중복 호출 방지
    setLoading(true); // 로딩 시작
    try {
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
      if (data.length === 0) {
        setIsEnd(true);
        return;
      }
      setTreeList((prev) => [...prev, ...data]);
      setFetchingData(data);
    } catch (e) {
      console.error("Error fetching tree list:", e);
    } finally {
      setLoading(false); // 로딩 종료
    }
  }, [accessToken, loading]);

  // useIntersect훅에 타겟 감지 시 실행해야할 콜백함수 전달
  const ref = useIntersect((entry, observer) => {
    // 데이터 요청 실패 시 연속 호출을 막기 위해 타겟 해제
    observer.unobserve(entry.target);

    // 불러올 데이터가 더 이상 없는지 체크
    const isLastPage = treeList.length === fetchingData.length;
    if (!isLastPage && !loading) {
      getTreeList();
    }
  });

  const onScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      getTreeList(); // 스크롤이 페이지 맨 아래에 도달하면 추가 데이터 로딩
    }
  }, [getTreeList]);

  useEffect(() => {
    getTreeList();
  }, [getTreeList]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [getTreeList, onScroll]);

  return (
    <div className="h-[100vh] overflow-y-auto">
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
