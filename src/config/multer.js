import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const personnelStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "../uploads/personnel"));
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, "profile-" + uniqueSuffix + path.extname(file.originalname));
	},
});

const articleStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "../uploads/articles"));
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, "article-" + uniqueSuffix + path.extname(file.originalname));
	},
});

export const uploadPersonnelImage = multer({
	storage: personnelStorage,
}).single("image");

export const uploadArticleImage = multer({ storage: articleStorage }).array(
	"images",
	10
);
