import express from "express";
import PersonnelRoutes from "./personnel/route.js";

const router = express.Router();

router.use("/personnel", PersonnelRoutes);

export default router;
