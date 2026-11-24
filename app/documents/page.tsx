"use client";
import Link from "next/link";
import { useState } from "react";

type Doc = { nom: string; type: string; taille: string; url: string; date: string };

const defaut: Doc[] = [
  { nom: "Exercice Maths CP.pdf", type: "PDF", taille: "1.2 Mo", url: "#", date: "Aujourd'hui - Mme Diop" },
  { nom: "Lecture - Les voyelles.pdf", type: "PDF", taille: "800 Ko", url: "#", date: "Hier - Mme Diop" },
];

export default function DocumentsPage() {
  const [docs] = useState<Doc[]>(() => {
    if (typeof window === "undefined") return defaut;
    const saved = localStorage.getItem("ecole-docs");
    return saved ? JSON.parse(saved) : defaut;
  });

  return (
    <div className="min-h-screen bg-[#f8f7f4] p-6">
      <Link href="/" className="text-sm">← Retour</Link>
      <div className="max-w-3xl mx-auto mt-4">
        <h1 className="text-2xl font-bold">📁 Documents de ma classe</h1>
        <p className="text-sm text-gray-500">Partagés par Mme Diop</p>
        <div className="space-y-3 mt-6">
          {docs.map((d) => (
            <div key={d.nom} className="bg-white rounded-2xl p-4 flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <span className="text-3xl">{d.type === "PDF" ? "📄" : "🖼️"}</span>
                <div><p className="font-bold">{d.nom}</p><p className="text-xs text-gray-500">{d.type} • {d.taille} • {d.date}</p></div>
              </div>
              <a href={d.url} download={d.nom} target="_blank" className="bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold">Télécharger ↓</a>
            </div>
          ))}
        </div>
        <Link href="/questions" className="block text-center bg-black text-white py-3 rounded-full mt-6 font-bold text-sm">💬 J'ai une question →</Link>
      </div>
    </div>
  );
}