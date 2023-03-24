import { useEffect, useState } from "react";
import BookHomePage from "../BookHomePage";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import AddIcon from "@mui/icons-material/Add";

type Book = {
  id: number;
  book_name: string;
  details: string;
  time_to_read: number;
  authors: Array<string>;
};

function Home() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const navigate = useNavigate();

  const getBooksData = async () => {
    try {
      await fetch(`http://localhost:3001/api/books`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setBooks(data.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBooksData();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          paddingBottom: "30px",
          paddingLeft: "20px",
        }}
      >
        <MenuBookIcon style={{ fontSize: "50px" }} />
        <span style={{ fontSize: "50px" }}>My Books</span>
      </div>
      <div style={{ display: "flex" }}>
        {books !== null
          ? books.map((book) => (
              <BookHomePage
                key={book.id}
                book_id={book.id}
                bookName={book.book_name}
                authors={book.authors}
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
