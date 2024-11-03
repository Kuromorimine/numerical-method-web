import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const matrix = new Elysia({prefix: "/matrix"})
.post(
  "/",
  async ({ body }) => {
    try {
      await prisma.aXB.create({ data: JSON.parse(body as string) });

      return {
        status: "success"
      }
    } catch (error) {
      console.log(error);
    }
  }
)
.get("/", async () => {
    const allRecords = await prisma.aXB.findMany();  
    return {
        status: "success",
        data: allRecords
    }
});
