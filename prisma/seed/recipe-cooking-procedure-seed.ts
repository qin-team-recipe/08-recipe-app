import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const recipeCookingProcedureSeed = async () => {
  const recipes = await prisma.recipe.findMany();

  const recipeCookingProcedures: Prisma.RecipeCookingProcedureUncheckedCreateInput[] = [
    {
      recipeId: recipes[0].id,
      name: "玉ねぎをみじん切りにし、レンジで4~5分加熱するか、フライパンで炒める。",
      sort: 0,
    },
    {
      recipeId: recipes[0].id,
      name: "ひき肉に塩を加え粘りがでるまでよく混ぜ、ハンバーグの材料すべてを入れて手早く混ぜる。",
      sort: 1,
    },
    {
      recipeId: recipes[0].id,
      name: "２〜３個にわけて叩きながら空気を抜き、楕円形にまとめる。真ん中をくぼませる。",
      sort: 2,
    },
    {
      recipeId: recipes[0].id,
      name: "フライパンで両面軽く焦げ目がつくまで焼き、水50mlを加えフタをして蒸し焼きにする。",
      sort: 3,
    },
    {
      recipeId: recipes[0].id,
      name: "竹串などを刺して肉汁が透明になっていれば、フタを外して水分を飛ばす。ハンバーグを取り出す。",
      sort: 4,
    },
    {
      recipeId: recipes[0].id,
      name: "空いたフライパンにそのままソースの材料を入れて煮る。ソースがあたたまったらハンバーグにかけ、完成。",
      sort: 5,
    },
    {
      recipeId: recipes[1].id,
      name: "（準備）明太子は薄皮から取り出し、身をほぐしておきます。イタリアンパセリは刻んでおきます。",
      sort: 0,
    },
    {
      recipeId: recipes[1].id,
      name: "ニンニクはみじん切りにします。",
      sort: 1,
    },
    {
      recipeId: recipes[1].id,
      name: "鍋に1、オリーブオイルを入れ中火で熱し、ニンニクの香りがしてきたら弱火で4分程、途中で混ぜながら加熱します。ニンニクに焼き色が付いたらキッチンペーパーを敷いたザルで漉し、ニンニクオイルとニンニクチップに分けます。ニンニクオイルは粗熱を取ります。",
      sort: 2,
    },
    {
      recipeId: recipes[1].id,
      name: "お湯を沸騰させた鍋に塩を入れて、スパゲティをパッケージの表記より1分短くゆで、ゆで汁を60ml取り分け、お湯を切ります。",
      sort: 3,
    },
    {
      recipeId: recipes[1].id,
      name: "ボウルに明太子ソースの材料と、2のニンニクオイルを15g、3のスパゲティを入れ混ぜ合わせます。ゆで汁を2回に分けて入れ、都度手早く混ぜます。",
      sort: 4,
    },
    {
      recipeId: recipes[1].id,
      name: "器に盛り付け、2のニンニクチップ、イタリアンパセリ、粗挽き黒こしょうをかけ完成です。",
      sort: 5,
    },
    {
      recipeId: recipes[2].id,
      name: "（準備）大葉は軸を切り落としておきます。しめじ、まいたけは石づきを切り落としておきます。",
      sort: 0,
    },
    {
      recipeId: recipes[2].id,
      name: "大葉は千切りにします。",
      sort: 1,
    },
    {
      recipeId: recipes[2].id,
      name: "しめじ、まいたけはほぐします。",
      sort: 2,
    },
    {
      recipeId: recipes[2].id,
      name: "ボウルに(A)を入れ混ぜ合わせます。",
      sort: 3,
    },
    {
      recipeId: recipes[2].id,
      name: "鍋にお湯を沸かし、塩、スパゲティを入れ、パッケージの表記時間より1分短くゆで、お湯を切ります。",
      sort: 4,
    },
    {
      recipeId: recipes[2].id,
      name: "中火で熱したフライパンに無塩バターを溶かし、2、塩、白こしょうを入れしめじがしんなりとするまで炒め、火から下ろします。",
      sort: 5,
    },
    {
      recipeId: recipes[2].id,
      name: "3に4、5加えて和えます。器に盛りつけ1をのせたら完成です。",
      sort: 6,
    },
  ];

  for (const recipeCookingProcedure of recipeCookingProcedures) {
    await prisma.recipeCookingProcedure.create({
      data: {
        ...recipeCookingProcedure,
      },
    });
  }
};
