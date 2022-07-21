import { type } from "os";
import React from "react";
import styles from "../styles/loading.module.css";
interface IProp {
  type?: "spinner" | "bounce" | "square";
  title: string;
}
export default function Loading({ type, title }: IProp) {
  switch (type) {
    case "spinner":
      return SpinnerLoading(title);
    case "bounce":
      return BounceLoading(title);
    case "square":
      return SquareLoading(title);
    default:
      return BounceLoading(title);
  }
}
export function SquareLoading(title: string) {
  return (
    <>
      <div className={styles.square}>
        <div></div>
        <div></div>
      </div>
      {LoadingTitle(title)}
    </>
  );
}

export function BounceLoading(title: string) {
  return (
    <>
      <div className={styles.bounce}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {LoadingTitle(title)}
    </>
  );
}

export function SpinnerLoading(title: string) {
  return (
    <>
      <div className={styles.spinner}>
        <div></div>
        <div></div>
      </div>
      {LoadingTitle(title)}
    </>
  );
}
function LoadingTitle(title: string) {
  return (

      <h3 style={{textAlign:"center"}}>{title}</h3>

  );
}
