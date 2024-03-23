"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
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
      if (treeList.length === 0) {
        setTreeList([{ 0: data }]);
      } else {
        setTreeList((prev) => [...prev, { [prev.length]: data }]);
      }
      setIsLastPage(data.length === 0);
    } catch (e) {
      console.error("Error fetching tree list:", e);
    } finally {
      setLoading(false); // 데이터 요청 완료 시 로딩 상태 제거
    }
  }, [accessToken]);
  console.log(treeList);
  // useIntersect훅에 타겟 감지 시 실행해야할 콜백함수 전달
  const ref = useIntersect((entry, observer) => {
    // 불러올 데이터가 더 이상 없는지 체크
    console.log(isLastPage);
    if (loading || isLastPage) return;
    getTreeList();
  });

  useEffect(() => {
    getTreeList();
  }, [accessToken]);

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
    const trees = page[i];
    console.log("trees", trees);

    return (
      <div>
        {trees.map((v, i) => (
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{
              top: `${getTreePosition(i)[0]}%`,
              left: `${getTreePosition(i)[1]}%`,
            }}
            key={v.treeId}
          >
            <Image alt="나무" src={v.treeImageUrl} width={100} height={100} />
            <span>{v.nickname}</span>
          </div>
        ))}
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
          {renderTree(page, i)}
        </div>
      ))}
      <div className="bg-red-400 h-[100px]" ref={ref} />
    </div>
  );
}
