import { useState } from "react";
import styles from "../bookPage.module.css";
import Modal from "@mui/material/Modal";
import { Book } from "..";
import Rating from "../Rating";

type IProps = {
  book: Book | null;
};

const BookData = (props: IProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return props.book !== null ? (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <img
        className={styles.bookCover}
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
        <Rating />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            width: "90vw",
            height: "90vh",
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
        <button className={styles.readButton} onClick={handleOpen}>
          Read this book
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default BookData;
