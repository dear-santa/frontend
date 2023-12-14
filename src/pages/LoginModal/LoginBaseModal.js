import React from "react";
// import styles from "../../styles/cardModal.module.css";

export default function loginModal({
  open,
  title,
  bodyStyle,
  children,
  onCancel,
  footer,
}) {
  // open: boolean
  // title: string
  // bodyStyle: CSS Propery (Object)
  // onCancel: func
  // footer: ReactNode (Array)

  return (
    <div className={open ? styles.root : styles.rootDisable}>
      <div className={styles.modalContainer}>
        {title ? <p className={styles.title}>{title}</p> : null}

        <div className={styles.modalBody} style={bodyStyle}>
          {children}
        </div>

        {footer.length > 0 ? (
          <div className={styles.footer}>{footer.map((d) => d)}</div>
        ) : null}
      </div>
    </div>
  );
}
