import { useEffect, useState } from "react";
import styles from "./bookPage.module.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import BookData from "./BookData";

type BookPageProps = {
  bookId: string | undefined;
};

export type Book = {
  id: number;
  book_name: string;
  details: string;
  time_to_read: number;
  authors: Array<string>;
  book_cover_filename: string;
  book_pdf_filename: string;
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
          // console.log("Book data ", data);
          setBook(data.data[0]);
          setLoading(false);
        });
    } catch (err) {
      navigate("/");
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    getBookData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "70px",
        flexWrap: "wrap",
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <button
        className={styles.backHomeButton}
        onClick={() => {
          navigate(`/`);
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: "small" }} />
        <span>Back to Home</span>
      </button>
      {loading ? "" : <BookData book={book} />}
    </div>
  );
}

export default BookPage;
