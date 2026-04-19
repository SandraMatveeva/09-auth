import { cookies } from 'next/headers';
import { api } from './api';

// 🔐 SERVER getMe
export const getServerMe = async () => {
  const cookieStore = await cookies();

  const res = await api.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

// 🔍 SESSION
export const checkServerSession = async () => {
  const cookieStore = await cookies();

  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

// 📝 NOTES
export const fetchServerNotes = async () => {
  const cookieStore = await cookies();

  const res = await api.get('/notes', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const fetchServerNoteById = async (id: string) => {
  const cookieStore = await cookies();

  const res = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};