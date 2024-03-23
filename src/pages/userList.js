"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import useUserInfo from "../hooks/useUserInfo";
import axios from "axios";
import useIntersect from "../hooks/useIntersect";
import { useRouter } from "next/router";

export default function UserList() {
  const {
    userInfo: { accessToken },
  } = useUserInfo();
  const [treeList, setTreeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const router = useRouter();

  const getTreeList = async () => {
    try {
      setLoading(true); // 데이터 요청 시작 시 로딩 상태 설정
      const res = await axios
        .get("/api/users/tree-list", {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data)
        .then((res) => {
          if (res.data.length === 0) {
            setIsLastPage(true);
          } else {
            setTreeList((prev) => [...prev, res.data]);
          }
        });
      console.log(res);
    } finally {
      setLoading(false); // 데이터 요청 완료 시 로딩 상태 제거
    }
  };

  // useIntersect훅에 타겟 감지 시 실행해야할 콜백함수 전달
  const ref = useIntersect((entry, { threshold = 1 }) => {
    // 불러올 데이터가 더 이상 없는지 체크

    if (loading || isLastPage) return;
    getTreeList();
  });

  useEffect(() => {
    getTreeList();
  }, []);

  const handleClickTree = (treeId) => {
    router.push({ pathname: "/userHistory", query: { treeId } });
  };

  if (!treeList || treeList.length === 0) {
    return (
      <div ref={ref} className="flex items-center justify-center h-[100vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const getTreePosition = (i) => {
    let [y, x] = [0, 0];
    if (i === 0) {
      [y, x] = [17, 70];
    } else if (i === 1) {
      [y, x] = [34, 30];
    } else if (i === 2) {
      [y, x] = [50, 69];
    } else if (i === 3) {
      [y, x] = [65, 28];
    } else if (i === 4) {
      [y, x] = [83, 70];
    }
    return [y, x];
  };

  const renderTree = (page, i) => {
    const { userId, treeId, nickname, treeImageUrl } = page;

    return (
      <div>
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{
            top: `${getTreePosition(i % 5)[0]}%`,
            left: `${getTreePosition(i % 5)[1]}%`,
          }}
          key={treeId}
        >
          <div
            className="flex flex-col items-center gap-[10px] cursor-pointer"
            onClick={() => handleClickTree(treeId)}
          >
            <Image alt="나무" src={treeImageUrl} width={100} height={100} />
            <div className="flex justify-center items-center bg-[#0EAD39] rounded-[6px] py-[4px] px-[8px]">
              <span className="text-white font-[Pretendard-Medium] text-[1.2rem]">
                {nickname}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-[100vh] overflow-y-auto">
      <Image
        className="absolute top-[21px] left-[20px] z-20"
        alt="뒤로가기"
        src={require("../../public/image/arrow-left.svg")}
        onClick={() => router.back()}
      />
      {treeList.map((page, i) => (
        <div className="relative" key={i}>
          {i === 0 ? (
            <Image
              className="w-full"
              alt="도로"
              src={require("../../public/image/road1.svg")}
            />
          ) : (
            <Image
              className="w-full"
              alt="도로"
              src={require("../../public/image/road2.svg")}
            />
          )}
          {page.map((page, i) => renderTree(page, i))}
        </div>
      ))}
      {/* {loading ? (
        <div className="flex items-center justify-center h-[50px] bg-blue-200">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : null} */}
      <div className={`w-full flex justify-center`} ref={ref}>
        {loading && (
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        )}
      </div>
    </div>
  );
}
