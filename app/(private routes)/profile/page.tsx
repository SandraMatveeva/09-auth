import ProfileClient from "./Profile.client";


export const metadata = {
  title: 'Profile | NoteHub',
  description: 'View and manage your profile',
  openGraph: {
    title: 'Profile | NoteHub',
    description: 'Your personal profile page',
    type: 'website',
  },
};



export default function ProfilePage() {
  return <ProfileClient />;
}

