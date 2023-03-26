import React from "react";
import styles from "./rating.module.css";

function Rating() {
  return (
    <div>
      <span className={styles.heading}>Summary</span>
      <p>4.1 average based on 254 reviews.</p>
      {/* <hr style="border:3px solid #f1f1f1" /> */}

      <div className={styles.row}>
        <div className={styles.side}>
          <div>5 star</div>
        </div>
        <div className={styles.middle}>
          <div className={styles.barContainer}>
            <div className={styles.bar5}></div>
          </div>
        </div>
        <div className={styles.side}>
          <div>4 star</div>
        </div>
        <div className={styles.middle}>
          <div className={styles.barContainer}>
            <div className={styles.bar4}></div>
          </div>
        </div>
        <div className={styles.side}>
          <div>3 star</div>
        </div>
        <div className={styles.middle}>
          <div className={styles.barContainer}>
            <div className={styles.bar3}></div>
          </div>
        </div>
        <div className={styles.side}>
          <div>2 star</div>
        </div>
        <div className={styles.middle}>
          <div className={styles.barContainer}>
            <div className={styles.bar2}></div>
          </div>
        </div>
        <div className={styles.side}>
          <div>1 star</div>
        </div>
        <div className={styles.middle}>
          <div className={styles.barContainer}>
            <div className={styles.bar1}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rating;
