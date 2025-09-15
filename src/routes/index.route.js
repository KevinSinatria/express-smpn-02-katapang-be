import express from "express";
import PersonnelRoutes from "./personnel/route.js";
import RolesRoutes from "./roles/route.js";
import HeadmastersRoutes from "./headmasters/route.js";
import PersonnelRolesRoutes from "./personnelRoles/route.js";
import { google } from "googleapis";

const router = express.Router();

router.use("/personnel", PersonnelRoutes);
router.use("/roles", RolesRoutes);
router.use("/headmasters", HeadmastersRoutes);
router.use("/personnel-roles", PersonnelRolesRoutes);

// Google OAuth2 setup
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = "http://localhost:3000/oauth-callback";

const oAuth2Client = new google.auth.OAuth2(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI
);

const scopes = ["https://www.googleapis.com/auth/drive"];
router.get("/auth/google", (req, res) => {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: "offline",
		scope: scopes,
	});
	res.redirect(authUrl);
});

router.get("/oauth-callback", async (req, res) => {
	const { code } = req.query;
	try {
		const { tokens } = await oAuth2Client.getToken(code);
		oAuth2Client.setCredentials(tokens);

		console.log("Refresh token yang harus disimpan:", tokens.refresh_token);

		res.send("Berhasil otorisasi! Sekarang Anda bisa menggunakan API Drive.");
	} catch (error) {
		console.error("Error saat mendapatkan token:", error);
		res.status(500).send("Otorisasi gagal.");
	}
});

export default router;
