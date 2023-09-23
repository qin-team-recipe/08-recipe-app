"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const changeHandle = () => {
    const input = inputFileRef?.current?.value;
    console.log("input", input);
    if (input && isValidHttpUrl(input)) {
      setError(null);
      setImgSrc(input);
    }
    if (input && !isValidHttpUrl(input)) {
      setError("正しいURLを入力してください");
    }
  };

  const isValidHttpUrl = (string: string) => {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  };

  return (
    <>
      <h1 className="text-lg font-bold">Show Your Avatar Uploaded in Vercel Blob</h1>
      <p>
        まずVercelBlobに画像をアップします。 下記の「アップロード画面」の画面から画像をアップロードしてください。
        <br />
        それから、そのアップロード画面でアップロード時に表示されたblobのURLを下記フォーム「Blob URL
        入力フォーム」に入力してください
      </p>
      <div>
        <table className="border-collapse break-all">
          <tr>
            <th className="border border-mauve-10">アップロードタイプ</th>
            <th className="border border-mauve-10">アップロード画面</th>
            <th className="border border-mauve-10">アップロードについてのVercelのマニュアル</th>
          </tr>
          <tr>
            <td className="border border-mauve-10">サーバーから画像をアップロード</td>
            <td className="border border-mauve-10">
              <a
                className="text-lg text-blue-10 hover:text-green-10"
                href="/vercel-blob/avatar/upload-from-server"
                target="_blank"
              >
                http://localhost:3000/vercel-blob/avatar/upload-from-server
              </a>
            </td>
            <td className="border border-mauve-10">
              <a
                className="text-lg text-blue-10 hover:text-green-10"
                href="https://vercel.com/docs/storage/vercel-blob/quickstart#server-uploads"
                target="_blank"
              >
                https://vercel.com/docs/storage/vercel-blob/quickstart#server-uploads
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-mauve-10">クライアントから画像をアップロード</td>
            <td className="border border-mauve-10">
              <a
                className="text-lg text-blue-10 hover:text-green-10"
                href="/vercel-blob/avatar/upload-from-client"
                target="_blank"
              >
                http://localhost:3000/vercel-blob/avatar/upload-from-client
              </a>
            </td>
            <td className="border border-mauve-10">
              <a
                className="text-lg text-blue-10 hover:text-green-10"
                href="https://vercel.com/docs/storage/vercel-blob/quickstart#client-uploads"
                target="_blank"
              >
                https://vercel.com/docs/storage/vercel-blob/quickstart#client-uploads
              </a>
            </td>
          </tr>
        </table>
      </div>

      <form className="mt-4">
        <label className="font-bold">Blob URL 入力フォーム</label>
        <input
          ref={inputFileRef}
          type="text"
          className="w-full border-2 border-mauve-12"
          required
          onChange={changeHandle}
        />
        {error && (
          <p>
            <span className="p-4 text-base text-tomato-9">{error}</span>
          </p>
        )}
      </form>
      <p className="mt-4">
        フォームに入力したblobのURLが下部のimageタグのsrcに入るようにしているので、入力内容が正しければVercelBlobから取得した画像が表示されます
      </p>
      <div className="mt-4">
        下部に画像が表示されます・・・
        {imgSrc && (
          <div>
            <Image className="border-2" src={imgSrc} width={300} height={300} alt="Vercel Blob テスト" />
          </div>
        )}
      </div>
    </>
  );
}
