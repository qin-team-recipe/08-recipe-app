"use client";

import { useCallback, useState } from "react";

import { Editor } from "@tiptap/react";
import { SubmitHandler } from "react-hook-form";
import { AiOutlineLink } from "react-icons/ai";
import {
  MdCode,
  MdFormatBold,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatStrikethrough,
  MdRedo,
  MdTaskAlt,
  MdTitle,
  MdUndo,
} from "react-icons/md";
import { TbPhoto } from "react-icons/tb";
import { z } from "zod";

import { Button } from "@/components/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { Form, ImageInputField } from "@/components/form";
import { getSignature } from "@/lib/actions";

const schema = z.object({
  imageInEditor: z.custom<File>().optional(),
});

type FormValues = z.infer<typeof schema> & { editor: any };

const RichEditorToolbar = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false);
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    // cancelled
    if (url === null) {
      return;
    }
    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }
    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  const uploadImage = async (file: File | undefined) => {
    if (!file) return;

    // get a signature using server action
    const { timestamp } = await getSignature();

    // upload to cloudinary using the signature
    const formData = new FormData();

    formData.append("file", file);
    // formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    formData.append("timestamp", timestamp.toString());
    formData.append("folder", "recipes");

    //
    const endpoint = "/api/upload/image";
    const data = await fetch(endpoint, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    console.log("data", data);
    if (data.imageSrc) {
      return data.imageSrc;
    }
    // write to database using server actions
    // await saveToDatabase({
    //   version: data?.version,
    //   signature: data?.signature,
    //   public_id: data?.public_id,
    // });
    return true;
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    const file = data.imageInEditor;
    console.log("file", file);
    const imageSrc = await uploadImage(file);
    console.log("imageSrc", imageSrc);
    data.editor.chain().focus().insertContent(`<img src="${imageSrc}"/>`).run();

    setOpen(false);
  };
  return (
    <div className="border-gray-600 flex flex-wrap gap-2 border-b p-4 text-2xl">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={!editor.isActive("heading", { level: 1 }) ? "opacity-20" : ""}
      >
        <MdTitle />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={!editor.isActive("bold") ? "opacity-20" : ""}
      >
        <MdFormatBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={!editor.isActive("strike") ? "opacity-20" : ""}
      >
        <MdFormatStrikethrough />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={!editor.isActive("taskList") ? "opacity-20" : ""}
      >
        <MdTaskAlt />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={!editor.isActive("codeBlock") ? "opacity-20" : ""}
      >
        <MdCode />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={!editor.isActive("bulletList") ? "opacity-20" : ""}
      >
        <MdFormatListBulleted />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={!editor.isActive("orderedList") ? "opacity-20" : ""}
      >
        <MdFormatListNumbered />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={!editor.isActive("blockquote") ? "opacity-20" : ""}
      >
        <MdFormatQuote />
      </button>
      <button type="button" onClick={setLink} className={!editor.isActive("link") ? "opacity-20" : ""}>
        <AiOutlineLink />
      </button>

      <button onClick={() => editor.chain().focus().undo().run()} type="button">
        <MdUndo />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} type="button">
        <MdRedo />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button type="button">
            <TbPhoto />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" onClick={() => console.log("clicked;")}>
          <DialogHeader>
            <DialogTitle>画像アップロード</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <Form<FormValues, typeof schema>
            className="mt-5 space-y-8"
            onSubmit={(data) => {
              data.editor = editor;
              onSubmit(data);
            }}
            schema={schema}
          >
            <ImageInputField fieldName="imageInEditor" label="イメージ" />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RichEditorToolbar;
