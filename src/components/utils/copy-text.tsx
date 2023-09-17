"use client";

import { TbCopy } from "react-icons/tb";

export default function CopyText({ copyText }: { copyText: string }) {
  const copyToClipboard = async (copyText: string): Promise<void> => {
    await global.navigator.clipboard.writeText(copyText);
    alert("コピーしました");
  };

  return (
    <div className={"flex cursor-pointer justify-end gap-x-1 px-4 py-2 text-blue-11"}>
      <button className="flex items-center " onClick={() => copyToClipboard(copyText)}>
        <TbCopy className={"text-base"} />
        <p className={"text-xs"}>コピーする</p>
      </button>
    </div>
  );
}
