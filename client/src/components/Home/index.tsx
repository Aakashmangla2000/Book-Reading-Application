import { useEffect, useState } from "react";
import BookHomePage from "../BookHomePage";
import MenuBookIcon from "@mui/icons-material/MenuBook";

type Book = {
  id: number;
  book_name: string;
  details: string;
  time_to_read: number;
  authors: Array<string>;
};

function Home() {
  const [books, setBooks] = useState<Book[] | null>(null);

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
                bookName={book.book_name}
                authors={book.authors}
              />
            ))
          : ""}
      </div>
    </div>
  );
}

export default Home;
