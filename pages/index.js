import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function Home() {
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    setSupabase(client);
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Merchandise Admin Panel</h1>
      <p>
        {supabase
          ? 'Supabase client is ready 🎉'
          : 'Setting up Supabase...'}
      </p>
    </main>
  );
}
