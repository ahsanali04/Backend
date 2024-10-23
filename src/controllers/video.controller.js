import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnClouldinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  const sort = {
    [sortBy || "createdAt"]: sortType === "asc" ? 1 : -1, // Default sort by 'createdAt'
  };
  //TODO: get all videos based on query, sort, pagination
  const videos = await Video.find().sort(sort);
  console.log("videos", videos);
  res.json({ status: 200, data: videos, message: "Success" });
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description, owner } = req.body;
  // TODO: get video, upload to cloudinary, create video

  if ([title, description].some((field) => field?.trim() === "")) {
    // res.status(400).json({status:400,data:null,message:"All fields are required"})
    throw new ApiError(400, "All fields are required");
  }

  const videoLocalPath = req.files?.video[0]?.path || req.body.video;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  const thumbnailLocalPath =
    req.files?.thumbnail[0]?.path || req.body.thumbnail;

  if (!videoLocalPath) {
    throw new ApiError(400, "Video file is required");
  }

  const video = await uploadOnClouldinary(videoLocalPath);
  const thumbnail = await uploadOnClouldinary(thumbnailLocalPath);

  if (!video) {
    throw new ApiError(400, "Video file is required");
  }

  if (!thumbnail) {
    throw new ApiError(400, "Thumbnail file is required");
  }

  const result = await Video.create({
    title: title,
    description: description,
    videoFile: video.url,
    thumbnail: thumbnail.url,
    duration: video.duration,
    owner: owner,
  });

  if (!result) {
    throw new ApiError(500, "Something went wrong");
  }

  res.json({ status: 200, data: result, message: "Success" });
});

const getVideoById = asyncHandler(async (req, res) => {
 
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

const getUserProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "userId is missing");
  }

  const user = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "userProfile",
      },
    },
    {
      $project: {
        // Use $project to exclude specific fields
        "userProfile.refreshToken": 0, // Exclude refreshToken
        "userProfile.password": 0, // Exclude password
      },
    },
    {
      $addFields:{
        userProfile: {
         $first: "$userProfile"
        }
      }
    },
    
  ]);

  console.log("user==", user);

  res.status(200).json(new ApiResponse(200, user, "Success"));
});

const getUserVideos = asyncHandler(async (req, res) => {
  
});



const getChannelDataWithVideo = asyncHandler(async (req, res) => {
 
  
});


export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
  getUserVideos,
  getUserProfile,
  getChannelDataWithVideo,
};
