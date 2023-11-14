const express = require("express");
const userController = require("./user.controller");
const multer = require("multer");
const router = express.Router();
const path = require("path");

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, done) => {
            done(null, "./uploads");
        },
        filename: (req, file, done) => {
            const ext = path.extname(file.originalname);
            const filename =
                path.basename(file.originalname) + "_" + Date.now() + ext;
            done(null, filename);
        },
    }),
});

router.post("/signup", upload.single("upload1"), userController.signup);
router.post("/login", userController.login);
router.post("/kakao", userController.kakaoLogin);

module.exports = router;
