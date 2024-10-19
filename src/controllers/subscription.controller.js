import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const subscribeChannel = asyncHandler(async (req, res) => {
  const { userId, channelId } = req.body;

  if (!userId || !channelId) {
    throw new ApiError(400, "UserId or channelId is missing");
  }

  const subscribe = await Subscription.create({
    subscriber: userId,
    channel: channelId,
  });

  if(!subscribe){
    throw new ApiError(400,"Subscriber is not aded")
  }

  res.json({ status: 200, data: subscribe, message: "success" });
});


export { subscribeChannel };
