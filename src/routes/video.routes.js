import { Router } from "express";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishAVideo,
  togglePublishStatus,
  updateVideo,
  getUserVideos,
  getUserProfile,
  getChannelDataWithVideo,
} from "../controllers/video.contoller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
// router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
  .route("/")
  .get(getAllVideos)
  .post(
    upload.fields([
      {
        name: "video",
        maxCount: 1,
      },
      {
        name: "thumbnail",
        maxCount: 1,
      },
    ]),
    publishAVideo
  );

router
  .route("/:videoId")
  .get(getVideoById)
  .delete(deleteVideo)
  .patch(upload.single("thumbnail"), updateVideo);

router.route("/user/:userId").get(getUserVideos);
router.route("/user-profile/:userId").get(getUserProfile);
router.route("/channel/detail").get(getChannelDataWithVideo);

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router;
