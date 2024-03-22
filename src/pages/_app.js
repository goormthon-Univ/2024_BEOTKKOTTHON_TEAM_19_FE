"use client";
import "../app/globals.css";
import { useEffect } from "react";
import useUserInfo from "../hooks/useUserInfo";
import axios from "axios";

export default function MyApp({ Component, pageProps }) {
  const { setUserInfo } = useUserInfo();

  // 앱 실행 시 refreshToken 있으면 자동 로그인
  useEffect(() => {
    const getTokenAndRefresh = async () => {
      try {
        const refreshToken = await localStorage.getItem("refreshToken");
        const postData = { refreshToken };
        const { data } = await axios.post("/api/refresh-token", postData);
        const { status } = data;
        if (status === "fail") {
          return;
        }
        const { accessToken, loginResponseDTO } = data.data;
        const { id, username, nickname } = loginResponseDTO;
        setUserInfo({ accessToken, id, username, nickname });
        localStorage.setItem("refreshToken", data.data.refreshToken);
      } catch (e) {
        // alert("로그인에 실패하였습니다");
      }
    };
    getTokenAndRefresh();
  }, [setUserInfo]);

  // axios interceptor 설정
  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const {
          config,
          response: { status },
        } = error;
        if (status === 401) {
          if (config.url === "/api/refresh-token") {
            return;
          }
          const originalRequest = config;
          const refreshToken = await localStorage.getItem("refreshToken");
          // refreshToken이 유효하다면, accessToken 갱신 요청 후 실패했던 api 재요청
          const postData = { refreshToken };
          const { data } = await axios.post("/api/refresh-token", postData);
          const { status } = data;
          if (status === "fail") {
            return;
          }
          const { accessToken, loginResponseDTO } = data.data;
          const { id, username, nickname } = loginResponseDTO;
          setUserInfo({ accessToken, id, username, nickname });
          localStorage.setItem("refreshToken", data.data.refreshToken);
          originalRequest.headers.authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        }
        return Promise.reject(error);
      }
    );
  }, [setUserInfo]);

  return <Component {...pageProps} />;
}
