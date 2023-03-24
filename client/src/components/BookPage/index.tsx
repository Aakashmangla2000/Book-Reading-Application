import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import styles from "./bookPage.module.css";
import { useNavigate } from "react-router-dom";

type BookPageProps = {
  bookId: string | undefined;
};

type Book = {
  id: number;
  book_name: string;
  details: string;
  time_to_read: number;
  authors: Array<string>;
};

type IProps = {
  book: Book | null;
};

const BookData = (props: IProps) => {
  console.log("loaded", props.book);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <img
        style={{ height: "500px" }}
        src="/HarryPotter.jpg"
        alt="book_cover"
      ></img>
      {props.book !== null ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span className={styles.bookName}>{props.book.book_name}</span>
          <span className={styles.authorName}>
            {props.book.authors.map((author) => author)}
          </span>
          <span>Book Read Time:{props.book.time_to_read}</span>
          <span>{props.book.details}</span>
          <Button variant="contained">Read this book</Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

function BookPage(props: BookPageProps) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getBookData = async () => {
    try {
      await fetch(`http://localhost:3001/api/book/${props.bookId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Book data ", data.data[0]);
          setBook(data.data[0]);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    getBookData();
  }, []);

  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(`/`);
        }}
      >
        Back to Home
      </Button>
      {loading ? "Loading..." : <BookData book={book} />}
    </div>
  );
}

export default BookPage;