import express, { Request, Response } from "express";
import bodyparser from "body-parser";
const pool = require("../db/index");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3001;

app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req: Request, file: File, callback: any) {
    callback(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req: Request, file: any, callback: any) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 },
});

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get("/api/books", async (req: Request, res: Response) => {
  try {
    const results = await pool.query(
      `select books.id,books.book_cover_filename,books.book_pdf_filename, books.name as book_name,array_agg(authors.name) as authors,details,time_to_read from books inner join books_authors on books.id = books_authors.book_id inner join authors on books_authors.author_id = authors.id group by books.id`
    );
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: results.rows,
    });
    console.log("All Books Data sent successfully");
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/book/:bookId", async (req: Request, res: Response) => {
  try {
    const results = await pool.query(
      `select books.id,books.book_cover_filename,books.book_pdf_filename,books.name as book_name,array_agg(authors.name) as authors,details,time_to_read from books inner join books_authors on books.id = books_authors.book_id inner join authors on books_authors.author_id = authors.id
        where books.id = $1 group by books.id`,
      [req.params.bookId]
    );
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: results.rows,
    });
    console.log("Single Book Data sent successfully");
  } catch (err) {
    console.log(err);
  }
});

type RequestBody = {
  name: string;
  details: string;
  time_to_read: number;
  authors: string;
};

app.post(
  "/api/books",
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
  async (req: Request, res: Response) => {
    try {
      const { name, details, time_to_read, authors } = <RequestBody>req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const pdfFile = files["pdf"][0]["filename"];
      const coverFile = files["cover"][0]["filename"];
      const insertBook = await pool.query(
        `INSERT INTO books (name,details,time_to_read,book_cover_filename,book_pdf_filename) VALUES ($1, $2, $3, $4, $5) returning id`,
        [name, details, time_to_read, coverFile, pdfFile]
      );
      const newBookId: number = insertBook.rows[0].id;
      const authorsJson: any = JSON.parse(authors);
      const newAuthorIds: number[] = await Promise.all(
        authorsJson.map(async (author: any): Promise<number> => {
          const res = await pool.query(
            `INSERT INTO authors (name) VALUES ('${author}') returning id`
          );
          const author_id: number = res.rows[0].id;
          return author_id;
        })
      );
      newAuthorIds.map(async (author_id) => {
        return await pool.query(
          `INSERT INTO books_authors (book_id,author_id) VALUES ($1, $2)`,
          [newBookId, author_id]
        );
      });
      res.status(201).json({
        status: "Successfully added new Book",
      });
      console.log("Successfully added new Book");
    } catch (error) {
      console.log(error, "error");
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
