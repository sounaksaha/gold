import { createBrowserRouter } from "react-router-dom";
import authenticationRouter from "./authenticationRouter";
import mainRouter from "./mainRouter";

const router = createBrowserRouter([authenticationRouter, mainRouter]);

export default router;