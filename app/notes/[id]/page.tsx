// export default async function NoteDetailPage({ params }: { params: { id: string } }) {
//     const { id } = await params;

//   return <div>Note ID: {id}</div>;
// }

import { fetchNoteById } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

type MetaDataProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: MetaDataProps): Promise<Metadata> {

  const paramsResult = await params;
  const id = paramsResult.id

  const note = await fetch(`https://.../notes/${id}`).then(res => res.json());

  return {
    title: note.title,
    description: note.content,
    openGraph: {
      title: note.title,
      description: note.content,
      url: `https://your-site-url.com/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}

export default async function NoteDetails({ params }: { params: { id: string } }) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id ],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}