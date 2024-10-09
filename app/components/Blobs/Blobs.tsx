import React from "react";
import styles from "./Blobs.module.scss";

type Props = {
  classVariable?: string;
  type: string;
};

const Blobs = (props: Props) => {
  const { classVariable, type } = props;
  const blobType = type || "v1";
  return (
    <div
      className={`${styles.blob} ${styles[blobType]} ${classVariable}`}
    ></div>
  );
};

export default Blobs;
