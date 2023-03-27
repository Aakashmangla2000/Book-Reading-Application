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
  bookCover: File | null;
  bookPdf: File | null;
  setBookCover: React.Dispatch<React.SetStateAction<File | null>>;
  setBookPdf: React.Dispatch<React.SetStateAction<File | null>>;
};

export default IProps;
