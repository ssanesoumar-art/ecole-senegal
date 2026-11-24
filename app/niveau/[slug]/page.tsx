"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, Suspense } from "react";

const data: any = {
  "cp": { nom: "CP", emoji: "📚", couleur: "bg-green-500", lecons: [{ titre: "Les voyelles A E I O U", desc: "Apprends à lire les voyelles", emoji: "🔤" }, { titre: "BA + BA = BABA", desc: "Les syllabes simples", emoji: "📖" }, { titre: "Les nombres de 1 à 20", desc: "Compte comme un champion", emoji: "🔢" }] },
  "ce1": { nom: "CE1", emoji: "✏️", couleur: "bg-blue-500", lecons: [{ titre: "Les nombres jusqu'à 100", desc: "Compte jusqu'à 100", emoji: "🔢" }, { titre: "Le son CH", desc: "Chocolat, chat, chien", emoji: "🍫" }] },
  "ce2": { nom: "CE2", emoji: "📖", couleur: "bg-purple-500", lecons: [{ titre: "La multiplication", desc: "2 x 3 = 6", emoji: "✖️" }] },
  "cm1": { nom: "CM1", emoji: "🧠", couleur: "bg-pink-500", lecons: [{ titre: "La division", desc: "Partager en parts égales", emoji: "➗" }] },
  "cm2": { nom: "CM2", emoji: "🎓", couleur: "bg-red-500", lecons: [{ titre: "Entrée en 6ème", desc: "Révision générale", emoji: "🎓" }] },
  "moyenne-section": { nom: "Moyenne Section", emoji: "🧒", couleur: "bg-yellow-400", lecons: [{ titre: "Les couleurs", desc: "Rouge, bleu, jaune", emoji: "🎨" }] },
  "grande-section": { nom: "Grande Section", emoji: "👧", couleur: "bg-orange-400", lecons: [{ titre: "Les lettres", desc: "A B C D", emoji: "🔤" }] },
};

// ✅ Le vrai contenu, avec useParams
function NiveauContenu() {
  const params = useParams();
  const slug = params.slug as string;
  const niv = data[slug] || { nom: slug?.toUpperCase(), emoji: "📚", couleur: "bg-green-500", lecons: [] };
  const [ouvert, setOuvert] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#f8f7f4] p-6">
      <Link href="/" className="text-sm">← Retour</Link>
      <div className="max-w-4xl mx-auto mt-4">
        <div className={`${niv.couleur} text-white rounded-3xl p-8`}>
          <p className="text-4xl">{niv.emoji}</p>
          <h1 className="text-3xl font-bold mt-2">{niv.nom}</h1>
          <p className="opacity-90 text-sm">Clique sur une leçon pour ouvrir sa session 👇</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {niv.lecons.map((l: any, i: number) => (
            <button key={i} onClick={() => setOuvert(l)} className="bg-white rounded-2xl p-5 text-left hover:shadow-lg">
              <span className="text-3xl">{l.emoji}</span>
              <p className="font-bold mt-2">{l.titre}</p>
              <p className="text-sm text-gray-500">{l.desc}</p>
              <p className="text-sm font-bold text-green-600 mt-2">Ouvrir la session →</p>
            </button>
          ))}
        </div>
        <Link href="/questions" className="block bg-white rounded-2xl p-5 mt-4 text-center font-bold">💬 J'ai une question pour Mme Diop →</Link>
      </div>

      {ouvert && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-4" onClick={() => setOuvert(null)}>
          <div className="bg-white w-full max-w-lg rounded-3xl p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between"><p className="font-bold">📚 Session Leçon</p><button onClick={() => setOuvert(null)} className="bg-gray-100 w-8 h-8 rounded-full">✕</button></div>
            <p className="text-5xl text-center mt-4">{ouvert.emoji}</p>
            <p className="font-bold text-xl text-center mt-2">{ouvert.titre}</p>
            <p className="text-center text-gray-500">{ouvert.desc}</p>
            <div className="bg-yellow-50 rounded-xl p-4 mt-4 text-sm"><p>👩🏾‍🏫 <b>Mme Diop :</b> Bravo ! Tu vas apprendre cette leçon pas à pas.</p></div>
            <button onClick={() => setOuvert(null)} className="w-full bg-green-600 text-white py-3 rounded-full mt-4 font-bold">J'ai compris ✅</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ✅ On enveloppe dans Suspense, c'est ça que Next.js 16 demande
export default function NiveauPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement... ⏳</div>}>
      <NiveauContenu />
    </Suspense>
  );
}