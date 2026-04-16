import type { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist in NoteHub",
  openGraph: {
    title: "Page not found",
    description: "This page does not exist in NoteHub",
    url: "https://08-zustand-brown-seven.vercel.app/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};

export default NotFound;
