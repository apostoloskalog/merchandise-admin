'use client';

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Home() {
  const [supabase, setSupabase] = useState(null);
  const [debugMessage, setDebugMessage] = useState("🔄 Checking Supabase...");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      setSupabase(createClient(supabaseUrl, supabaseAnonKey));
      setDebugMessage("✅ Supabase Connected!");
    } else {
      setDebugMessage("❌ Missing Supabase config");
    }
  }, []);

  const handleSave = async () => {
    if (!supabase) {
      alert("❌ Supabase not initialized");
      return;
    }

    const { error } = await supabase
      .from("projects")
      .insert([{ title, description, start_date: date }]);

    if (error) {
      alert("❌ Error: " + error.message);
    } else {
      alert("✅ Project saved to Supabase!");
      setTitle("");
      setDescription("");
      setDate("");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Debug banner */}
      <div className="bg-yellow-200 text-black text-center p-2 font-semibold">
        {debugMessage}
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white p-4 space-y-2">
          <h2 className="text-xl font-bold mb-4">Merchandiser Admin</h2>
          <nav className="flex flex-col space-y-2">
            <button className="text-left">Project Settings</button>
            <button className="text-left">Users</button>
            <button className="text-left">Places</button>
            <button className="text-left">Inventory</button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-xl bg-white rounded-xl shadow p-6 space-y-4">
            <h1 className="text-2xl font-bold">Project Settings</h1>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Project title"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the project"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white p-2 rounded"
            >
              Save Project
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

// ✅ Prevent prerendering at build time
export async function getServerSideProps() {
  return { props: {} };
}
