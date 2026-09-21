const express = require("express");
const authMiddlewares = require("../middlewares/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");


const interviewRouter = express.Router()

/**
 * @route POST /api/interview/
 * @description generates new interview report on the basis of user self description, resume pdf and JD
 * @access Private
 * 
*/
interviewRouter.post("/", 
                    authMiddlewares.authUser, 
                    upload.single("resume"),
                    interviewController.generateInterviewReportController
                );



module.exports = interviewRouter