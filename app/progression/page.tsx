"use client";
import Link from "next/link";

const matieres = [
  { nom: "Lecture CP", emoji: "📖", fait: 65, total: 10, faitLecons: 6, couleur: "bg-blue-500" },
  { nom: "Maths CP", emoji: "🧮", fait: 40, total: 8, faitLecons: 3, couleur: "bg-green-500" },
  { nom: "Français CE1", emoji: "✏️", fait: 20, total: 12, faitLecons: 2, couleur: "bg-purple-500" },
];

const badges = [
  { emoji: "🌟", titre: "Première leçon", desc: "Tu as fini ta 1ère leçon", debloque: true },
  { emoji: "🔥", titre: "3 jours d'affilée", desc: "Tu apprends chaque jour", debloque: true },
  { emoji: "🏆", titre: "Champion Quiz", desc: "10 bonnes réponses", debloque: false },
  { emoji: "🎓", titre: "Finir le CP", desc: "Terminer tout le niveau CP", debloque: false },
];

export default function ProgressionPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f4] p-6">
      <Link href="/" className="text-sm">← Retour</Link>

      <div className="max-w-5xl mx-auto mt-4">
        {/* PROFIL */}
        <div className="bg-green-700 text-white rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl">👦</div>
            <div>
              <h1 className="text-2xl font-bold">Salut, Moussa ! 👋</h1>
              <p className="opacity-80 text-sm">CP • Dakar, Sénégal 🇸🇳</p>
            </div>
          </div>
          <div className="flex gap-6 text-center">
            <div><p className="text-2xl font-bold">120</p><p className="text-xs opacity-80">Points ⭐</p></div>
            <div><p className="text-2xl font-bold">11</p><p className="text-xs opacity-80">Leçons 📖</p></div>
            <div><p className="text-2xl font-bold">3</p><p className="text-xs opacity-80">Jours 🔥</p></div>
          </div>
        </div>

        {/* BARRES */}
        <h2 className="font-bold text-xl mt-8">📊 Ma progression par matière</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {matieres.map((m) => (
            <div key={m.nom} className="bg-white rounded-2xl p-6">
              <p className="font-bold">{m.emoji} {m.nom}</p>
              <p className="text-xs text-gray-500 mt-1">{m.faitLecons}/{m.total} leçons terminées</p>
              <div className="w-full bg-gray-200 h-3 rounded-full mt-3">
                <div className={`${m.couleur} h-3 rounded-full`} style={{ width: `${m.fait}%` }}></div>
              </div>
              <p className="text-right text-sm font-bold mt-1">{m.fait}%</p>
              <Link href="/niveau/cp" className="block text-center bg-black text-white py-2 rounded-full text-sm mt-3 font-bold">Continuer →</Link>
            </div>
          ))}
        </div>

        {/* BADGES */}
        <h2 className="font-bold text-xl mt-8">🏅 Mes badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {badges.map((b) => (
            <div key={b.titre} className={`bg-white rounded-2xl p-5 text-center ${!b.debloque ? "opacity-40 grayscale" : ""}`}>
              <div className="text-4xl">{b.emoji}</div>
              <p className="font-bold text-sm mt-2">{b.titre}</p>
              <p className="text-xs text-gray-500 mt-1">{b.desc}</p>
              <p className="text-xs mt-2 font-bold">{b.debloque ? "✅ Débloqué" : "🔒 À débloquer"}</p>
            </div>
          ))}
        </div>

        {/* CONTINUER */}
        <div className="bg-yellow-100 border border-yellow-300 rounded-2xl p-6 mt-8 flex justify-between items-center">
          <div>
            <p className="font-bold">Continue ta leçon : Les syllabes BA BE BI</p>
            <p className="text-sm text-gray-600">CP - Lecture • 12 min restantes</p>
          </div>
          <Link href="/lecon/lecture-2" className="bg-black text-white px-5 py-3 rounded-full text-sm font-bold shrink-0">Reprendre →</Link>
        </div>
      </div>
    </div>
  );
}