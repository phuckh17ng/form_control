import React from "react";
import styles from "./styles.module.css";
type Props = {
  primary: string;
};

const Text3d = (props: Props) => {
  const { primary } = props;
  return (
    <div className="bg-primary rounded-full text-icon text-center text-[12px]">
      <div className={styles.textContainer}>
        <p className={styles.primary}>{primary}</p>
        <p className={styles.secondary}>{primary}</p>
      </div>
    </div>
  );
};

export default Text3d;
