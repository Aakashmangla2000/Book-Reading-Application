import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

type HomePageBookProps = {
  bookName: string;
  authors: string[];
  book_id: number;
};

export default function BookHomePage(props: HomePageBookProps) {
  const navigate = useNavigate();
  return (
    <div>
      <Card sx={{ width: "190px", height: "272px", margin: "20px" }}>
        <CardActionArea
          onClick={() => {
            console.log(props.bookName);
            navigate(`/book/${props.book_id}`);
          }}
        >
          <CardMedia
            component="img"
            height="340"
            src="/HarryPotter.jpg"
            alt="Book Cover"
          />
        </CardActionArea>
      </Card>
      <Typography gutterBottom variant="h5" component="div">
        {props.bookName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {props.authors.map((author: string) => `${author}, `)}
      </Typography>
    </div>
  );
}
