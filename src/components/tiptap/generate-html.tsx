"use client";

import React from "react";

import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";

//参考:https://tiptap.dev/api/utilities/html
export function GenrateHTML({ contents }: { contents: any }) {
  console.log("contents", contents);
  return <div>{parse(generateHTML(contents.body, [Document, Paragraph, Text, Bold, Image]))}</div>;
}
