"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useUserInfo from "../hooks/useUserInfo";
import axios from "axios";

export default function UserList() {
  const {
    userInfo: { accessToken },
  } = useUserInfo();
  const [treeList, setTreeList] = useState([]);

  const getTreeList = useCallback(async () => {
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
      setTreeList((prev) => [...prev, ...data]);
    } catch (e) {
      console.log(e);
    }
  }, [accessToken]);

  useEffect(() => {
    getTreeList();
  }, [getTreeList]);

  return (
    <div>
      <p>다른 유저의 나무 둘러보기</p>
      <div>
        {treeList.map((v) => (
          <div key={v.treeId}>
            <Image alt="나무" src={v.treeImageUrl} width={150} height={150} />
            <span>{v.habitName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
