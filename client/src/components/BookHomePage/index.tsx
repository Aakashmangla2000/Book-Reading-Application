import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

type HomePageBookProps = {
  bookName: string;
  authors: string[];
};

export default function BookHomePage(props: HomePageBookProps) {
  return (
    <Card sx={{ maxWidth: 345, margin: "20px" }}>
      <CardActionArea
        onClick={() => {
          console.log(props.bookName);
        }}
      >
        <CardMedia
          component="img"
          height="340"
          image={require("./HarryPotter.jpg")}
          alt="Book Cover"
        />
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.bookName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.authors.map((author: string) => `${author}, `)}
        </Typography>
      </CardContent>
    </Card>
  );
}
