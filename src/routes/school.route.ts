import { Router } from "express";
import { addSchool, listSchool } from "../controllers/school.controller";

const schoolRouter = Router()

schoolRouter.route("/addSchool").post(addSchool)

schoolRouter.route("/listSchool/:longitude/:latitude").get(listSchool)

export default schoolRouter
