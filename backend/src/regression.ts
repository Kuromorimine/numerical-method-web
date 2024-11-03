import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Regression = new Elysia({prefix: "/regression"})
.post(
  "/",
  async ({ body }) => {
    try {
      await prisma.regression.create({ data: JSON.parse(body as string) });

      return {
        status: "success"
      }
    } catch (error) {
      console.log(error);
    }
  }
)
.get("/", async () => {
    const allRecords = await prisma.regression.findMany();  
    return {
        status: "success",
        data: allRecords
    }
});
