import express, { Request, Response } from "express";
import bodyparser from "body-parser";
const pool = require("../db/index");

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!!!");
});

app.get("/api/books", async (req: Request, res: Response) => {
  try {
    const results = await pool.query(
      "select books.id,books.name as book_name,authors.name as author_name,details,time_to_read from books inner join books_authors on books.id = books_authors.book_id inner join authors on books_authors.author_id = authors.id"
    );
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// app.get("/api/book/:bookId", (req: Request, res: Response) => {
//   res.status(200).json({
//     status: "success",
//     data: { book: req.params },
//   });
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
