import React, { useEffect, useState, useRef, DragEvent } from "react";
import { Button } from "@mui/material";
import styles from "./addBookPage.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type Book = {
  book_name: string;
  details: string;
  time_to_read: number;
  authors: Array<string>;
};

type IProps = {
  submitBookDetails: React.FormEventHandler<HTMLFormElement>;
  setNameOfAuthor: React.Dispatch<
    React.SetStateAction<string | number | readonly string[] | undefined>
  >;
  setNameOfBook: React.Dispatch<
    React.SetStateAction<string | number | readonly string[] | undefined>
  >;
  setTimeToRead: React.Dispatch<
    React.SetStateAction<string | number | readonly string[] | undefined>
  >;
  setBookDetails: React.Dispatch<
    React.SetStateAction<string | number | readonly string[] | undefined>
  >;
  nameOfAuthor: string | number | readonly string[] | undefined;
  bookDetails: string | number | readonly string[] | undefined;
  timeToRead: string | number | readonly string[] | undefined;
  nameOfBook: string | number | readonly string[] | undefined;
  setBookCover: React.Dispatch<React.SetStateAction<File | null>>;
  setBookPdf: React.Dispatch<React.SetStateAction<File | null>>;
};

const AddBookForm = (props: IProps) => {
  const uploadCoverRef = useRef<HTMLInputElement>(null);
  const uploadPdfRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState(false);

  // handle drag events
  const handleDrag = function (e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      // handleFiles(e.dataTransfer.files);
      console.log("I have a file", e.dataTransfer.files);
      props.setBookPdf(e.dataTransfer.files[0]);
    }
  };

  const handleBookCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // at least one file has been selected so do something
      // handleFiles(e.target.files);
      props.setBookCover(e.target.files[0]);
    }
  };

  const handleBookPdf = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // at least one file has been selected so do something
      // handleFiles(e.target.files);
      props.setBookPdf(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={props.submitBookDetails} encType="multipart/form-data">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Card
          sx={{
            width: "425px",
            height: "615px",
            margin: "20px",
            border: "1px dashed #27378C",
            borderRadius: "8px",
            boxShadow: "none",
          }}
        >
          <CardActionArea
            style={{ height: "100%" }}
            onClick={() => {
              if (uploadCoverRef.current != null)
                uploadCoverRef.current.click();
            }}
          >
            <CardContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "#27378C",
                }}
              >
                <AddIcon sx={{ color: "#27378C", paddingBottom: "7px" }} />
                <span style={{ textDecoration: "underline" }}>
                  Add a Book Cover
                  <input
                    type="file"
                    name="book-cover"
                    ref={uploadCoverRef}
                    id="book-cover"
                    hidden
                    onChange={handleBookCover}
                    accept="image/*"
                  />
                </span>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "flex-start",
            marginLeft: "44px",
            width: "850px",
          }}
        >
          <label className={styles.inputLabel}>Name of the Book </label>
          <input
            className={styles.input}
            required
            placeholder="Enter the published name"
            id="name-of-book"
            style={{ width: "97%" }}
            type="text"
            name="name-of-book"
            value={props.nameOfBook}
            onChange={(event) => {
              props.setNameOfBook(event.target.value);
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              // width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "49%",
              }}
            >
              <label className={styles.inputLabel}>Author of the Book</label>
              <input
                className={styles.input}
                placeholder="Add all the authors comma seperated"
                id="author-of-book"
                // style={{ width: "100%" }}
                type="text"
                name="authors"
                required
                value={props.nameOfAuthor}
                onChange={(event) => {
                  props.setNameOfAuthor(event.target.value);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "49%",
              }}
            >
              <label className={styles.inputLabel}>Book Read Time</label>
              <input
                className={styles.input}
                placeholder="Add time in mins"
                id="book-read-time"
                // style={{ width: "100%" }}
                type="number"
                name="time"
                required
                value={props.timeToRead}
                onChange={(event) => {
                  props.setTimeToRead(parseInt(event.target.value));
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <label className={styles.inputLabel}>Book Details</label>
            <textarea
              className={styles.input}
              placeholder="Should not be more than 300 words"
              id="book-details"
              style={{ height: "142px" }}
              rows={4}
              cols={50}
              name="details"
              required
              maxLength={300}
              value={props.bookDetails}
              onChange={(event) => {
                props.setBookDetails(event.target.value);
              }}
            />
          </div>
          <label className={styles.inputLabel}>Upload PDF</label>
          <Card
            className={dragActive ? styles.dragActive : styles.uploadPdfCard}
            sx={{
              width: "300px",
              height: "149px",
              marginTop: "8px",
              border: "1px dashed #CCCCCC",
              borderRadius: "8px",
              boxShadow: "none",
            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <CardContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <CloudUploadIcon sx={{ color: "#27378C" }} />
                <div>
                  <button
                    className={styles.browseButton}
                    type="button"
                    onClick={() => {
                      if (uploadPdfRef.current != null)
                        uploadPdfRef.current.click();
                    }}
                  >
                    Browse
                    <input
                      type="file"
                      name="pdf-upload"
                      id="pdf-upload"
                      ref={uploadPdfRef}
                      hidden
                      onChange={handleBookPdf}
                      accept=".pdf"
                    />
                  </button>
                  <span> or drop file here</span>
                </div>
                <span style={{ color: "#7A7A7A" }}>
                  Supports: PDF; upto 10MB
                </span>
              </div>
            </CardContent>
          </Card>
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
            type="submit"
          >
            Add Book
          </Button>
        </div>
      </div>
    </form>
  );
};

function AddBookPage() {
  // const [book, setBook] = useState<Book | null>(null);
  const [nameOfAuthor, setNameOfAuthor] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [nameOfBook, setNameOfBook] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [timeToRead, setTimeToRead] = useState<
    string | number | readonly string[] | undefined
  >(0);
  const [bookDetails, setBookDetails] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [bookPdf, setBookPdf] = useState<File | null>(null);
  const [bookCover, setBookCover] = useState<File | null>(null);
  const navigate = useNavigate();

  const submitBookDetails = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Submit");
    console.log(
      bookDetails,
      nameOfAuthor,
      nameOfBook,
      timeToRead,
      bookCover,
      bookPdf
    );
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
      const response = await fetch(`http://localhost:3001/api/books`, {
        method: "POST",
        body: body,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Book data ", data);
          setNameOfAuthor("");
          setBookDetails("");
          setNameOfBook("");
          setTimeToRead(0);
          setBookCover(null);
          setBookPdf(null);
        });
    } catch (err) {
      console.log(err);
    }
  };

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
        }}
        variant="outlined"
        startIcon={<ArrowBackIosIcon />}
        onClick={() => {
          navigate(`/`);
        }}
      >
        Back to Home
      </Button>
      <AddBookForm
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
