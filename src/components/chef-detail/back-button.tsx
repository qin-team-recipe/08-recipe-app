"use client";

import { useRouter } from "next/navigation";

import { HiArrowLeft } from "react-icons/hi2";

export const BackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    // 遷移前のページが存在する場合:戻る/存在しない場合:トップページに遷移
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button className="" onClick={() => handleGoBack()}>
      <HiArrowLeft size={24} />
    </button>
  );
};
