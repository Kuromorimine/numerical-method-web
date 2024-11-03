import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Interpolation = new Elysia({prefix: "/interpolation"})
.post(
  "/",
  async ({ body }) => {
    try {
      await prisma.interpolation.create({ data: JSON.parse(body as string) });

      return {
        status: "success"
      }
    } catch (error) {
      console.log(error);
    }
  }
)
.get("/", async () => {
    const allRecords = await prisma.interpolation.findMany();  
    return {
        status: "success",
        data: allRecords
    }
});
