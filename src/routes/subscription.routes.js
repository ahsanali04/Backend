import { Router } from "express";
import { subscribeChannel } from "../controllers/subscription.controller.js";

const router = Router();
// router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(subscribeChannel);

export default router;
