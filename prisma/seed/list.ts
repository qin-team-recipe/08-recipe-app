import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const listData: Prisma.ListCreateInput[] = [{ name: "foo" }, { name: "bar" }, { name: "baz" }];
(async () => {
  await Promise.all(
    listData.map(async (data) => {
      await prisma.list.create({ data });
    })
  );
  const listlist = await prisma.list.findMany();
  console.log(listlist);
})()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
