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
        message: "Account created successfully",
        user: newUser,
      };
    } catch (error: any) {
      return {
        message: "Account creation failed",
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
        message: "Login successful",
        user: loggedInUser,
      };
    } catch (error: any) {
      return {
        message: "Login failed",
        error: error.message,
      };
    }
  });
};
