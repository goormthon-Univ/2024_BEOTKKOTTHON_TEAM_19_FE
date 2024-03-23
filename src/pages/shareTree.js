"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ShareTree() {
  const [nickname, setNickname] = useState("");
  const [treeList, setTreeList] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const getTreeList = async () => {
    try {
      console.log(id);
      const res = await axios
        .get(`/api/users/${1}/share`)
        .then((res) => res.data)
        .then((res) => {
          const { nickname, userShareTreeResponse } = res.data;
          setNickname(nickname);
          setTreeList(userShareTreeResponse);
          console.log("res", res);
        });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (id !== null) {
      getTreeList();
    }
  }, []);

  const handleClickTree = (treeId) => {
    router.push({ pathname: "/userHistory", query: { treeId } });
  };

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
    const { treeId, habitName, treeImageUrl } = page;

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
                {habitName}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-[100vh] overflow-y-auto">
      <div className="absolute top-[21px] left-[20px] z-20">
        <span className="text-[2.4rem]">
          <span className="font-[Pretendard-Bold]">{nickname}</span>님의 정원
        </span>
      </div>
      {treeList && treeList.length ? (
        treeList.map((page, i) => (
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
            {page && page.lenght
              ? page.map((page, i) => renderTree(page, i))
              : null}
          </div>
        ))
      ) : (
        <Image
          className="w-full"
          alt="도로"
          src={require("../../public/image/road1.svg")}
        />
      )}
    </div>
  );
}
