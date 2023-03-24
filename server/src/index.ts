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
      `select books.id,books.name as book_name,array_agg(authors.name) as authors,details,time_to_read from books inner join books_authors on books.id = books_authors.book_id inner join authors on books_authors.author_id = authors.id group by books.id`
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

app.get("/api/book/:bookId", async (req: Request, res: Response) => {
  try {
    const results = await pool.query(
      `select books.id,books.name as book_name,array_agg(authors.name) as authors,details,time_to_read from books inner join books_authors on books.id = books_authors.book_id inner join authors on books_authors.author_id = authors.id
where books.id = ${req.params.bookId} group by books.id`
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

type RequestBody = {
  name: string;
  details: string;
  time_to_read: number;
  authors: Array<string>;
};

app.post("/api/books", async (req: Request, res: Response) => {
  try {
    const { name, details, time_to_read, authors } = <RequestBody>req.body;
    const insertBook = await pool.query(
      `INSERT INTO books (name,details,time_to_read) VALUES ($1, $2, $3) returning id`,
      [name, details, time_to_read]
    );
    const newBookId: number = insertBook.rows[0].id;
    const newAuthorIds: number[] = await Promise.all(
      authors.map(async (author): Promise<number> => {
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
    res.status(200).json({
      status: "Successfully added new Book",
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
