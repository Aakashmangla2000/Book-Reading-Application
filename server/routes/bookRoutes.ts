import express from "express";
import booksController from "../controller/booksController";
import upload from "middleware/upload";
const router = express.Router();

router.get("/", booksController.getBooks);
router.get("/:bookId", booksController.getBook);
router.post(
  "/",
  upload.fields([
    {
      name: "pdf",
      maxCount: 1,
    },
    {
      name: "cover",
      maxCount: 1,
    },
  ]),
  booksController.addBook
);

module.exports = router;
