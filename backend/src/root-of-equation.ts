import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const rootOfEquation = new Elysia({prefix: "/root-of-equation"})
.post(
  "/",
  async ({ body }) => {
    try {
      await prisma.rootOfEquation.create({ data: JSON.parse(body as string) });

      return {
        status: "success"
      }
    } catch (error) {
      console.log(error);
    }
  }
)
.get("/", async () => {
    const allRecords = await prisma.rootOfEquation.findMany();  
    return {
        status: "success",
        data: allRecords
    }
});
