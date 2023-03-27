import React, { useEffect, useState, useRef, DragEvent } from "react";
import styles from "../addBookPage.module.css";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IProps from "./Props";

export default function AddBookForm(props: IProps) {
  const uploadCoverRef = useRef<HTMLInputElement>(null);
  const uploadPdfRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [pdf, setPdf] = useState<File | undefined>(undefined);

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      console.log("Imagee");
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

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
    if (
      e.dataTransfer.files &&
      e.dataTransfer.files[0] &&
      e.dataTransfer.files[0].type === "application/pdf"
    ) {
      //   console.log("I have a file", e.dataTransfer.files);
      setPdf(e.dataTransfer.files[0]);
      props.setBookPdf(e.dataTransfer.files[0]);
    }
  };

  const handleBookCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      props.setBookCover(e.target.files[0]);
    }
    onImageChange(e);
  };

  const handleBookPdf = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      props.setBookPdf(e.target.files[0]);
      setPdf(e.target.files[0]);
    }
  };

  const checkButtonDisable = (): boolean =>
    props.bookCover === null ||
    props.bookDetails === undefined ||
    props.bookDetails === "" ||
    props.nameOfAuthor === undefined ||
    props.nameOfAuthor === "" ||
    props.nameOfBook === undefined ||
    props.nameOfBook === "" ||
    props.timeToRead === undefined ||
    props.timeToRead < 1 ||
    props.timeToRead === null ||
    props.bookPdf === null;

  useEffect(() => {
    if (
      image !== undefined &&
      pdf !== undefined &&
      props.bookCover === null &&
      props.bookPdf === null
    ) {
      setImage(undefined);
      setPdf(undefined);
    }
  }, [props.bookCover]);

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
            <CardContent sx={{ padding: 0 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "#27378C",
                }}
              >
                {image !== undefined ? (
                  <div>
                    <img
                      alt="book-cover"
                      src={image}
                      style={{
                        width: "425px",
                        height: "615px",
                        objectFit: "fill",
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <AddIcon sx={{ color: "#27378C", paddingBottom: "7px" }} />
                    <span style={{ textDecoration: "underline" }}>
                      Add a Book Cover
                    </span>
                  </>
                )}

                <input
                  type="file"
                  name="book-cover"
                  ref={uploadCoverRef}
                  id="book-cover"
                  hidden
                  onChange={handleBookCover}
                  accept="image/*"
                />
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
                type="number"
                name="time"
                required
                min={0}
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
          {pdf && (
            <span style={{ color: "#7A7A7A", paddingBottom: "15px" }}>
              {`File ${pdf.name} is selected`}
            </span>
          )}
          <button
            className={styles.addBook}
            type="submit"
            disabled={checkButtonDisable()}
          >
            <span>Add Book</span>
          </button>
        </div>
      </div>
    </form>
  );
}
