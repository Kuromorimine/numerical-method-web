import { Elysia } from "elysia";
import { rootOfEquation } from "./root-of-equation";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { matrix } from "./matrix";

const app = new Elysia()
  .use (swagger())
  .use(cors())
  .get("/", () => "Hello Elysia")
  .use(rootOfEquation)
  .use(matrix)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

// now: Database ready
// Best: design schema
// Best: write API