import React, { useState, forwardRef } from "react";
import styles from "./addBookPage.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import AddBookForm from "./AddBookForm";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddBookPage() {
  const [nameOfAuthor, setNameOfAuthor] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [nameOfBook, setNameOfBook] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [timeToRead, setTimeToRead] = useState<
    string | number | readonly string[] | undefined
  >(undefined);
  const [bookDetails, setBookDetails] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [bookPdf, setBookPdf] = useState<File | null>(null);
  const [bookCover, setBookCover] = useState<File | null>(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("error");
  const [message, setMessage] = useState("");

  const submitBookDetails = (event: React.FormEvent<HTMLFormElement>) => {
    if (bookCover === null || bookPdf === null)
      alert("Book Cover or Pdf is missing");
    else addBookData();
    event.preventDefault();
  };

  const addBookData = async () => {
    const body = new FormData();
    body.append(
      "authors",
      JSON.stringify((nameOfAuthor as string).split(",")) as string
    );
    body.append("name", nameOfBook as string);
    body.append("time_to_read", timeToRead as string);
    body.append("details", bookDetails as string);
    body.append("pdf", bookPdf as File);
    body.append("cover", bookCover as File);

    try {
      const response = await fetch(`http://localhost:3001/api/v1/books`, {
        method: "POST",
        body: body,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("Book data ", data);
          setSeverity("success");
          setMessage("Book Added Successfully");
          setOpen(true);
          setNameOfAuthor("");
          setBookDetails("");
          setNameOfBook("");
          setTimeToRead(0);
          setBookCover(null);
          setBookPdf(null);
        });
    } catch (err) {
      setSeverity("error");
      setMessage("Error! Try Again later..");
      setOpen(true);
      console.log(err);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "70px" }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <button
        className={styles.backHomeButton}
        onClick={() => {
          navigate(`/`);
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: "small" }} />
        <span>Back to Home</span>
      </button>
      <AddBookForm
        bookCover={bookCover}
        bookPdf={bookPdf}
        setBookPdf={setBookPdf}
        setBookCover={setBookCover}
        submitBookDetails={submitBookDetails}
        setNameOfAuthor={setNameOfAuthor}
        setNameOfBook={setNameOfBook}
        setTimeToRead={setTimeToRead}
        setBookDetails={setBookDetails}
        nameOfAuthor={nameOfAuthor}
        bookDetails={bookDetails}
        timeToRead={timeToRead}
        nameOfBook={nameOfBook}
      />
    </div>
  );
}

export default AddBookPage;
