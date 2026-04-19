import { Note } from '@/types/note';
import { api } from './api';


export type CreateNoteData = {
  title: string;
  content: string;
  tag: string;
};

interface ResponseResult {
  notes: Note[];
  totalPages: number;
}

// 🔐 AUTH

export const login = async (data: { email: string; password: string }) => {
  const res = await api.post('/auth/login', data);
  return res.data;
};

export const register = async (data: { email: string; password: string }) => {
  const res = await api.post('/auth/register', data);
  return res.data;
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const checkSession = async () => {
  const res = await api.get('/auth/session');
  return res.data;
};

export const getMe = async () => {
  const res = await api.get('/users/me');
  return res.data;
};

export const updateMe = async (data: string) => {
  const res = await api.patch('/users/me', {username: data});
  return res.data;
};

// 📝 NOTES

export const fetchNotes = async (
  search: string,
  page: number,
  tag: string = ''
): Promise<ResponseResult> => {
  const { data } = await api.get('/notes', {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
  });

  return data;
};


export const fetchNoteById = async (id: string) => {
  const res = await api.get(`/notes/${id}`);
  return res.data;
};

export const createNote = async (note: CreateNoteData) => {
  const res = await api.post('/notes', note);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};

