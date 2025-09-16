import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const singleStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "../uploads/single"));
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, "profile-" + uniqueSuffix + path.extname(file.originalname));
	},
});

const lotsOfStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "../uploads/lots"));
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, "article-" + uniqueSuffix + path.extname(file.originalname));
	},
});

export const uploadSingleImage = multer({
	storage: singleStorage,
}).single("image");

export const uploadLotOfImages = multer({ storage: lotsOfStorage }).array(
	"images",
	10
);
