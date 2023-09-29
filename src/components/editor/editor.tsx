"use client";

import React from "react";

import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useForm } from "react-hook-form";

import { updateRecipeCookingProcedure } from "@/features/recipes";

import RichEditorToolbar from "./rich-editor-toolbar";

const Editor = ({ recipeCookingProcedureId }: { recipeCookingProcedureId: string }) => {
  //フォームの作成
  const { handleSubmit, setValue } = useForm();

  // const uploadImage = (file: File) => {
  //   console.log("uploadImgage called");
  //   console.log("file", file);
  // };

  const uploadImage = (file: File) => {
    console.log("uploadImgage called");
    const data = new FormData();
    data.append("file", file);
    // return axios.post('/documents/image/upload', data);
  };

  const editor = useEditor({
    extensions: [StarterKit, Image.configure({ inline: true })],
    content: `<p>Hello World! 🌎️</p><img src="https://source.unsplash.com/8xznAGy4HcY/800x400" /><img src="https://source.unsplash.com/8xznAGy4HcY/800x400" />`,
    editorProps: {
      attributes: {
        class: "prose prose-base m-5 focus:outline-none text-left",
      },
      // handleDrop: function (view, event, slice, moved) {
      //   if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
      //     // if dropping external files
      //     // handle the image upload
      //     return true; // handled
      //   }
      //   return false; // not handled use default behaviour
      // },
      handleDrop: function (view, event, slice, moved) {
        console.log("handleDrop called");
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          // if dropping external files
          let file = event.dataTransfer.files[0]; // the dropped file
          let filesize = (file.size / 1024 / 1024).toFixed(4); // get the filesize in MB
          if ((file.type === "image/jpeg" || file.type === "image/png") && parseInt(filesize) < 10) {
            // check valid image type under 10MB
            // check the dimensions
            let _URL = window.URL || window.webkitURL;
            let img = new Image(); /* global Image */
            img.src = _URL.createObjectURL(file);
            img.onload = function () {
              if (this.width > 5000 || this.height > 5000) {
                window.alert("Your images need to be less than 5000 pixels in height and width."); // display alert
              } else {
                // valid image so upload to server
                // uploadImage will be your function to upload the image to the server or s3 bucket somewhere
                uploadImage(file)
                  .then(function (response) {
                    // response is the image url for where it has been saved
                    // pre-load the image before responding so loading indicators can stay
                    // and swaps out smoothly when image is ready
                    let image = new Image();
                    image.src = response;
                    image.onload = function () {
                      // place the now uploaded image in the editor where it was dropped
                      const { schema } = view.state;
                      const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
                      const node = schema.nodes.image.create({ src: response }); // creates the image element
                      const transaction = view.state.tr.insert(coordinates.pos, node); // places it in the correct position
                      return view.dispatch(transaction);
                    };
                  })
                  .catch(function (error) {
                    if (error) {
                      window.alert("There was a problem uploading your image, please try again.");
                    }
                  });
              }
            };
          } else {
            window.alert("Images need to be in jpg or png format and less than 10mb in size.");
          }
          return true; // handled
        }
        return false; // not handled use default behaviour
      },
      // handleDrop: function (view, event, slice, moved) {
      //   if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
      //     // if dropping external files
      //     let file = event.dataTransfer.files[0]; // the dropped file
      //     let filesize = (file.size / 1024 / 1024).toFixed(4); // get the filesize in MB
      //     if ((file.type === "image/jpeg" || file.type === "image/png") && filesize < 10) {
      //       // check valid image type under 10MB
      //       // check the dimensions
      //       let _URL = window.URL || window.webkitURL;
      //       let img = new Image(); /* global Image */
      //       img.src = _URL.createObjectURL(file);
      //       img.onload = function () {
      //         if (this.width > 5000 || this.height > 5000) {
      //           window.alert("Your images need to be less than 5000 pixels in height and width."); // display alert
      //         } else {
      //           // valid image so upload to server
      //           // uploadImage will be your function to upload the image to the server or s3 bucket somewhere
      //           uploadImage(file)
      //             .then(function (response) {
      //               // response is the image url for where it has been saved
      //               // do something with the response
      //             })
      //             .catch(function (error) {
      //               if (error) {
      //                 window.alert("There was a problem uploading your image, please try again.");
      //               }
      //             });
      //         }
      //       };
      //     } else {
      //       window.alert("Images need to be in jpg or png format and less than 10mb in size.");
      //     }
      //     return true; // handled
      //   }
      //   return false; // not handled use default behaviour
      // },
    },

    onUpdate: ({ editor }) => {
      console.log("function onUpdate on editor called");
      const json = editor.getJSON();
      console.log("json", json);
      setValue("body", json);
    },
  });

  const submit = async (data: any) => {
    console.log("func submit called");
    await updateRecipeCookingProcedure(recipeCookingProcedureId, JSON.stringify(data));
  };

  if (!editor) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="border-mouve-10 mx-auto mt-10 w-2/3 border-2">
        <RichEditorToolbar editor={editor} />
        <div className="mt-3 h-[70vh] overflow-hidden overflow-y-scroll p-3">
          <EditorContent editor={editor} />
        </div>
      </div>
      <div className="bg-gray-400 text-white mx-auto mt-5 w-1/4 rounded-full px-5 py-3 text-center text-2xl font-bold shadow">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default Editor;
