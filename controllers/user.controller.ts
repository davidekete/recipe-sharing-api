import Elysia from "elysia";
import { createNewUser, login } from "../services/user.service";

export const userController = (app: Elysia) => {
  app.post("/signup", async (context) => {
    try {
      const userData: any = context.body;

      const newUser = await createNewUser({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      return {
        user: newUser,
      };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  });

  app.post("/login", async (context) => {
    try {
      const userData: any = context.body;

      const loggedInUser = await login({
        email: userData.email,
        password: userData.password,
      });

      return {
        user: loggedInUser,
      };
    } catch (error: any) {
      console.log(error)
      return {
        error: error.message,
      };
    }
  });
};
