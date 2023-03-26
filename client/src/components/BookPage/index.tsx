import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import styles from "./bookPage.module.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Modal from "@mui/material/Modal";
import Rating from "./Rating";

type BookPageProps = {
  bookId: string | undefined;
};

type Book = {
  id: number;
  book_name: string;
  details: string;
  time_to_read: number;
  authors: Array<string>;
  book_cover_filename: string;
  book_pdf_filename: string;
};

type IProps = {
  book: Book | null;
};

const BookData = (props: IProps) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return props.book !== null ? (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <img
        style={{ height: "500px" }}
        src={`http://localhost:3001/uploads/${props.book.book_cover_filename}`}
        alt="book_cover"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "flex-start",
          marginLeft: "44px",
        }}
      >
        <span className={styles.bookName}>{props.book.book_name}</span>
        <span className={styles.authorName}>
          {props.book.authors.map((author) => `${author} `)}
        </span>
        <span className={styles.timeToRead}>
          Book Read Time: {Math.floor(props.book.time_to_read / 60)} hours{" "}
          {props.book.time_to_read % 60} minutes
        </span>
        <span className={styles.details}>{props.book.details}</span>
        {/* <Rating /> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            width: "90vw",
            height: "90vh",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto",
          }}
        >
          <iframe
            title="pdf"
            src={`http://localhost:3001/uploads/${props.book.book_pdf_filename}`}
            width="100%"
            height="100%"
          />
        </Modal>
        <Button
          style={{
            background: "#27378C",
            width: "160px",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "20px",
            marginBottom: "24px",
            border: "2px solid #27378C",
            borderRadius: "8px",
          }}
          variant="contained"
          onClick={handleOpen}
        >
          Read this book
        </Button>
      </div>
    </div>
  ) : (
    <></>
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
    <div style={{ display: "flex", flexDirection: "column", margin: "70px" }}>
      <Button
        style={{
          color: "#27378C",
          width: "178px",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "20px",
          marginBottom: "24px",
          border: "2px solid #27378C",
          borderRadius: "8px",
        }}
        variant="outlined"
        startIcon={<ArrowBackIosIcon />}
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
