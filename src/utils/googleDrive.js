import { google } from "googleapis";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Path ke file JSON kredensial Service Account
// const KEYFILEPATH = path.join(
//   __dirname,
//   process.env.GOOGLE_APPLICATION_CREDENTIALS.replace(
//     "./src/config/keys/",
//     "../config/keys/"
//   )
// );

// const credentials = {
//   type: process.env.GOOGLE_APPLICATION_CREDENTIALS_TYPE,
//   project_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_PROJECT_ID,
//   private_key_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_PRIVATE_KEY_ID,
//   private_key: process.env.GOOGLE_APPLICATION_CREDENTIALS_PRIVATE_KEY,
//   client_email: process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_EMAIL,
//   client_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_ID,
//   auth_uri: process.env.GOOGLE_APPLICATION_CREDENTIALS_AUTH_URI,
//   token_uri: process.env.GOOGLE_APPLICATION_CREDENTIALS_TOKEN_URI,
//   auth_provider_x509_cert_url:
//     process.env.GOOGLE_APPLICATION_CREDENTIALS_AUTH_PROVIDER_X509_CERT_URL,
//   client_x509_cert_url:
//     process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_X509_CERT_URL,
//   universe_domain: process.env.GOOGLE_APPLICATION_CREDENTIALS_UNIVERSE_DOMAIN,
// };

// const auth = new google.auth.GoogleAuth({
//   credentials,
//   scopes: ["https://www.googleapis.com/auth/drive"],
// });

const oAuth2Client = new google.auth.OAuth2(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({
	refresh_token: GOOGLE_REFRESH_TOKEN,
});

const getDriveClient = async () => {
	try {
		// This method will automatically refresh the token if it has expired
		await oAuth2Client.getAccessToken();
		const drive = google.drive({ version: "v3", auth: oAuth2Client });
		return drive;
	} catch (error) {
		console.error("Error saat mengotentikasi dan membuat client Drive:", error);
		throw new Error("Gagal mengotentikasi client Google.");
	}
};

export const uploadFileToGoogleDrive = async (file, fileName, folderId) => {
	try {
		const drive = await getDriveClient();

		// console.time("Upload file to google drive");
		if (!file || !fileName) {
			throw new Error("File data or file name is missing for upload.");
		}

		const fileMetadata = {
			name: fileName,
			parents: [folderId],
		};

		const media = {
			mimeType: file.mimeType,
			body: fs.createReadStream(file.path),
		};
		const response = await drive.files.create({
			resource: fileMetadata,
			media: media,
			fields: "id, name",
		});

		try {
			await fs.promises.unlink(file.path);
		} catch (err) {
			if (err.code !== "ENOENT") {
				console.error(`Error deleting temporary file ${fileName}:`, err);
			} else {
				console.warn(
					`Temporary file ${fileName} not found for deletion, likely already removed.`
				);
			}
		}

		// console.log(
		//   "File uploaded to Google Drive:",
		//   response.data.name,
		//   response.data.id
		// );

		// console.timeEnd("Upload file to google drive");
		return {
			id: response.data.id,
			name: response.data.name,
		};
	} catch (error) {
		console.error("Error uploading file to Google Drive:", error.message);
		throw new Error(`Failed to upload file to Google Drive: ${error.message}`);
	}
};

export const deleteFileFromGoogleDrive = async (fileId) => {
	try {
		const drive = await getDriveClient();
		await drive.files.delete({ fileId: fileId });
	} catch (error) {
		console.error("Error deleting file from Google Drive:", error.message);
	}
};
