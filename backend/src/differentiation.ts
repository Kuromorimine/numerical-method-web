import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Differentiation = new Elysia({prefix: "/differentiation"})
.post(
  "/",
  async ({ body }) => {
    try {
      await prisma.differentiation.create({ data: JSON.parse(body as string) });

      return {
        status: "success"
      }
    } catch (error) {
      console.log(error);
    }
  }
)
.get("/", async () => {
    const allRecords = await prisma.differentiation.findMany();  
    return {
        status: "success",
        data: allRecords
    }
});
