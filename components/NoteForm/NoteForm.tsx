import styles from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNoteDraftStore } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";
import { createNote, CreateNoteData } from "@/lib/api/clientApi";

export default function NoteForm({}) {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const handleCancel = () => router.push("/notes/filter/all");
  const queryClient = useQueryClient();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

  const handleSubmit = (formData: FormData) => {
    console.log(formData);
    const values = Object.fromEntries(formData) as CreateNoteData;
    mutate(values);
  };

  return (
    <form action={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Title</label>
        <input
          className={styles.field}
          type="text"
          name="title"
          defaultValue={draft.title}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Content</label>

        <textarea
          className={styles.field}
          name="content"
          rows={8}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Tag</label>
        <select name="tag" defaultValue={draft?.tag} onChange={handleChange}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button type="submit" className={styles.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
