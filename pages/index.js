import { createClient } from '@supabase/supabase-js';

export default function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Merchandise Admin Panel</h1>
      <p>Supabase is wired up — runtime only!</p>
    </main>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
