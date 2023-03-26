import { useEffect, useState } from "react";
import BookHomePage from "../BookHomePage";
import BookIcon from "@mui/icons-material/Book";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import AddIcon from "@mui/icons-material/Add";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type Book = {
  id: number;
  book_name: string;
  details: string;
  time_to_read: number;
  authors: Array<string>;
  book_cover_filename: string;
};

function Home() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const getBooksData = async () => {
    try {
      setLoading(true);
      await fetch(`http://localhost:3001/api/books`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setBooks(data.data);
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getBooksData();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          paddingBottom: "30px",
          paddingLeft: "20px",
        }}
      >
        <BookIcon
          style={{ fontSize: "50px", paddingRight: "10px", color: "#27378C" }}
        />
        <span
          style={{
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "40px",
            lineHeight: "54px",
            color: "#27378C",
          }}
        >
          My Books
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {books !== null
          ? books.map((book) => (
              <BookHomePage
                key={book.id}
                book_id={book.id}
                bookName={book.book_name}
                authors={book.authors}
                bookCoverFilename={book.book_cover_filename}
              />
            ))
          : ""}
        <Card sx={{ width: "190px", height: "272px", margin: "20px" }}>
          <CardActionArea
            style={{ height: "100%" }}
            onClick={() => {
              navigate(`/addbook`);
            }}
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
      </div>
    </div>
  );
}

export default Home;
