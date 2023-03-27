import BookPage from "../components/BookPage";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function Book() {
  const params = useParams();
  return (
    <div>
      <Navbar />
      <BookPage bookId={params.bookId} />
    </div>
  );
}

export default Book;
