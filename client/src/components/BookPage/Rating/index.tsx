import styles from "./rating.module.css";
import StarIcon from "@mui/icons-material/Star";

const Rating = () => {
  return (
    <div className={styles.box}>
      <div className={styles.firstBox}>
        <div className={styles.firstLeft}>
          <div className={styles.heading}>Summary</div>
          <div className={styles.row}>
            <div className={styles.side}>
              <span>5</span>
            </div>
            <div className={styles.middle}>
              <div className={styles.barContainer}>
                <div className={styles.bar5}></div>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.side}>
              <div>
                <span>4</span>
              </div>
            </div>
            <div className={styles.middle}>
              <div className={styles.barContainer}>
                <div className={styles.bar4}></div>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.side}>
              <span>3</span>
            </div>
            <div className={styles.middle}>
              <div className={styles.barContainer}>
                <div className={styles.bar3}></div>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.side}>
              <span>2</span>
            </div>
            <div className={styles.middle}>
              <div className={styles.barContainer}>
                <div className={styles.bar2}></div>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.side}>
              <span>1</span>
            </div>
            <div className={styles.middle}>
              <div className={styles.barContainer}>
                <div className={styles.bar1}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.firstRight}>
          <div style={{ marginBottom: "20px" }}>
            <span className={styles.uppertext}>
              4.5 <StarIcon sx={{ color: "#FFB400" }} />
            </span>
            <span className={styles.lowertext}>273 Reviews</span>
          </div>
          <div>
            <span className={styles.uppertext}>88%</span>
            <span className={styles.lowertext}>Recommended</span>
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.secondBox}>
        <span className={styles.rateText}>
          You have not rated this book yet. Click on the button to start rating.
        </span>
        <button className={styles.rateButton}>Rate this Book</button>
      </div>
    </div>
  );
};

export default Rating;
