import React from "react";
import styles from "../../styles/introModal.module.css";

export default function BaseModal({
  open,
  title,
  bodyStyle,
  children,
  footer,
}) {
  // open: boolean
  // title: string
  // bodyStyle: CSS Propery (Object)
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
