import React, { ReactEventHandler, useEffect, useState } from "react";
import { Button } from "@mui/material";
// import styles from "./bookPage.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import AddIcon from "@mui/icons-material/Add";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { stringify } from "querystring";

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
};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["-apple-system", "sans-serif"].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const AddBookForm = (props: IProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Card sx={{ width: "425px", height: "615px", margin: "20px" }}>
        <CardActionArea
          style={{ height: "100%" }}
          onClick={() => {
            redirect(`/addbook`);
          }}
          disabled
        >
          <CardContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <AddIcon />
              <span>Add a Book</span>
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
        <form onSubmit={props.submitBookDetails}>
          <label>
            Name of the Book
            <input
              required
              placeholder="Enter the published name"
              id="author-of-book"
              style={{ width: "100%" }}
              type="text"
              name="name-of-book"
              value={props.nameOfBook}
              onChange={(event) => {
                props.setNameOfBook(event.target.value);
              }}
            />
          </label>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "95%",
              }}
            >
              <label>Author of the Book</label>
              <input
                placeholder="Add all the authors comma seperated"
                id="author-of-book"
                style={{ width: "100%" }}
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
                width: "95%",
              }}
            >
              <label>Book Read Time</label>
              <input
                placeholder="Add time in mins"
                id="book-read-time"
                style={{ width: "100%" }}
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
            <label>Book Details</label>
            <textarea
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
          <label>Upload PDF</label>
          <Card sx={{ width: "300px", height: "149px" }}>
            <CardContent>
              <CloudUploadIcon />
              <span>Browse or drop file here</span>
              <span>Supports: PDF; upto 10MB</span>
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
        </form>
      </div>
    </div>
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitBookDetails = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Submit");
    console.log(bookDetails, nameOfAuthor, nameOfBook, timeToRead);
    addBookData();
    event.preventDefault();
  };

  const addBookData = async () => {
    const body = {
      authors: (nameOfAuthor as string).split(","),
      name: nameOfBook,
      time_to_read: timeToRead,
      details: bookDetails,
    };
    try {
      const response = await fetch(`http://localhost:3001/api/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Book data ", data);
          setNameOfAuthor("");
          setBookDetails("");
          setNameOfBook("");
          setTimeToRead(0);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // setLoading(true);
    // getBookData();
  }, []);

  useEffect(() => {
    // console.log(bookDetails, nameOfAuthor, nameOfBook, timeToRead);
  });

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
      {loading ? (
        "Loading..."
      ) : (
        <AddBookForm
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
      )}
    </div>
  );
}

export default AddBookPage;
