

import css from "./CreateNote.module.css";
import CreateNoteClient from "./CreateNote.client";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Create note",
  description: "Create a new note in NoteHub",
  openGraph: {
    title: "Create note",
    description: "Create a new note in NoteHub",
    url: "https://08-zustand-brown-seven.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

const CreateNote = async () => {
  //const categories = await getCategories();

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <CreateNoteClient />
      </div>
    </main>
  );
};

export default CreateNote;
