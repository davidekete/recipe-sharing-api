import { recipeController } from "./controllers/recipe.controller";
import { PrismaClient } from "@prisma/client";
import Elysia from "elysia";
import { userController } from "./controllers/user.controller";
import { commentController } from "./controllers/comments.controller";

const prisma = new PrismaClient();
const app = new Elysia();

app.use(userController as any);
app.use(recipeController as any);
app.use(commentController as any);

app.listen(4040, () => {
  console.log("Server is running on port 4040");
});

export { app, prisma };
