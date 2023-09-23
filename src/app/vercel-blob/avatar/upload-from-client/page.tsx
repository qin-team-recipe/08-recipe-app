"use client";

import { useRef, useState } from "react";

import type { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const copyBlobUrl = async (e) => {
    const blobUrl = e.target.value;
    navigator.clipboard.writeText(blobUrl).then(
      (success) => alert(`クリップボードにコピーしました！ ${e.target.value}`),
      (error) => alert(`コピーに失敗しました！`),
    );
  };

  return (
    <>
      <h1>
        <a
          className="text-lg text-blue-10 hover:text-green-10"
          href="https://vercel.com/docs/storage/vercel-blob/quickstart#client-uploads"
          target="_blank"
        >
          Client uploads
        </a>
      </h1>

      <form
        className="flex flex-col"
        onSubmit={async (event) => {
          if (inputFileRef?.current?.files) {
            event.preventDefault();

            const file = inputFileRef.current.files[0];

            //クイックスタートの書き方からhandleUploadUrlのパスを変更しています
            const newBlob = await upload(file.name, file, {
              access: "public",
              //              handleUploadUrl: "/api/avatar/upload",
              handleUploadUrl: "/api/vercel-blob/avatar/upload-from-client",
            });

            setBlob(newBlob);
          }
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit" className="mt-4 w-32 rounded-md border-whitea-12 bg-blue-10 p-3 text-whitea-13">
          Upload
        </button>
      </form>
      {blob && (
        <div className="mt-10 flex flex-col">
          <p>
            Vercel Blobにアップロード成功!
            <br />
            下記のBlobURLをページ「
            <a className="text-blue-10 hover:text-green-10" href="/vercel-blob/avatar/get-blob" target="_blank">
              http://localhost:3000/vercel-blob/avatar/get-blob
            </a>
            」で入力すれば、そのアップロードした画像がVercelBlobから読み込まれて表示されます
          </p>
          <button
            className="mt-4 w-32 rounded-md border-whitea-12 bg-tomato-10 p-3 text-sm text-whitea-13"
            value={blob.url}
            onClick={(e) => copyBlobUrl(e)}
          >
            下記のblobURLをコピーする
          </button>
          <span className="break-all">
            Blob url: <br />
            {blob.url}
          </span>
        </div>
      )}
    </>
  );
}
