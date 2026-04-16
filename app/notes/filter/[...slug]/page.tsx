import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

type PageProps = {
  params: { slug: string[] };
};

type MetaDataProps = {
  params: Promise<{
    slug: string[];
  }>;
};

// SEO
export async function generateMetadata({
  params,
}: MetaDataProps): Promise<Metadata> {

  const { slug } = await params;
  const filter = slug?.join(", ") || "all";

  return {
    title: `Notes filtered by ${filter}`,
    description: `Viewing notes filtered by ${filter}`,
    openGraph: {
      title: `Notes filtered by ${filter}`,
      description: `Viewing notes filtered by ${filter}`,
      url: `https://08-zustand-brown-seven.vercel.app/notes/filter/${filter}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: PageProps) {
  const initialPage = 1;
  const initialSearch = "";
  const { slug } = await params;
  const queryClient = new QueryClient();
  let tag: string = slug[0]; // todo

  // if (tags.includes(tag)) {
  //   tag = tag
  // } else {
  //   tag = ''
  // }
  if (!tags.includes(tag)) {
    tag = "";
  }

  await queryClient.prefetchQuery({
    queryKey: ["notes", initialPage, initialSearch, tag],
    queryFn: () => fetchNotes(initialSearch, initialPage, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        initialPage={initialPage}
        initialSearch={initialSearch}
        tag={tag}
      />
    </HydrationBoundary>
  );
}
