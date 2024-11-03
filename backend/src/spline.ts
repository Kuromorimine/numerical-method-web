import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Spline = new Elysia({prefix: "/spline"})
.post(
  "/",
  async ({ body }) => {
    try {
      await prisma.spline.create({ data: JSON.parse(body as string) });

      return {
        status: "success"
      }
    } catch (error) {
      console.log(error);
    }
  }
)
.get("/", async () => {
    const allRecords = await prisma.spline.findMany();  
    return {
        status: "success",
        data: allRecords
    }
});
