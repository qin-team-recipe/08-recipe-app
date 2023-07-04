import { UserType } from "@/types/enums";

export const userSeed = [
  {
    name: "山田シェフ",
    userChef: {
      create: {
        profileText:
          "初の絵本出版！ 『 まねっこシェフ』 ・ふわふわ！スクランブルエッグ ・にぎにぎ！おにぎり 主婦の友社より３月３日、２冊同時発売！ 絶賛発売中！",
        profileImgSrc: "/chefs/chef_01",
        userChefLink: {
          create: [
            {
              category: "twitter",
              url: "https://twitter.com/kohkentetsu14",
            },
            {
              category: "youtube",
              url: "https://www.youtube.com/channel/UC3p5OTQsMEnmZktWUkw_Y0A",
            },
          ],
        },
      },
    },
    recipes: {
      create: [
        {
          name: "グラタン",
          description:
            "はじめてでも失敗なく作れるような、鶏肉や玉ねぎを具とした基本的なマカロニグラタンのレシピです。\nソースと具材炒めを別器具で行うレシピも多いですが、グラタンの具を炒めたフライパンの中で、そのままホワイトソースを仕上げる手軽な作り方にしています。ぜひお試しください。",
        },
        {
          name: "トマトとルッコラのマルゲリータピザに合うホワイトソースグラタン",
          description: "descriptionトマトとルッコラのマルゲリータピザに合うホワイトソースグラタン",
        },
      ],
    },
  },
  {
    name: "鳥羽周作",
  },
];
