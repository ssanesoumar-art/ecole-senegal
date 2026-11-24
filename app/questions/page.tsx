"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Q = { id: number; auteur: string; role: string; question: string; reponse: string | null; likes: number; date: string };

const initial: Q[] = [
  { id: 1, auteur: "Moussa", role: "CP", question: "Madame, pourquoi BA + BA = BABA ?", reponse: "Bravo Moussa ! Parce que BA + BA ça fait 2 fois BA, donc BABA comme Papa ! 👏", likes: 3, date: "Aujourd'hui" },
  { id: 2, auteur: "Awa", role: "CP", question: "Comment on écrit 15 ?", reponse: "Quinze", likes: 1, date: "Aujourd'hui" },
  { id: 3, auteur: "Moussa", role: "CP", question: "J'ai compris", reponse: null, likes: 0, date: "Aujourd'hui" },
];

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Q[]>(initial);
  const [nom, setNom] = useState("Moussa");
  const [texte, setTexte] = useState("");
  const [modeProf, setModeProf] = useState(false);
  const [ouverte, setOuverte] = useState<Q | null>(null);
  const [reponseTxt, setReponseTxt] = useState("");

  const charger = () => {
    const s = localStorage.getItem("ecole-questions");
    if (s) setQuestions(JSON.parse(s));
  };

  useEffect(() => {
    charger();
    const interval = setInterval(charger, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (questions.length > 0) localStorage.setItem("ecole-questions", JSON.stringify(questions));
    if (ouverte) {
      const maj = questions.find(q => q.id === ouverte.id);
      if (maj) setOuverte(maj);
    }
  }, [questions]);

  const poser = () => {
    if (!texte.trim()) return;
    const nouvelle = { id: Date.now(), auteur: nom, role: "Élève", question: texte, reponse: null, likes: 0, date: "À l'instant" };
    setQuestions([nouvelle, ...questions]);
    setTexte("");
    setOuverte(nouvelle);
  };

  const repondre = () => {
    if (!reponseTxt.trim() || !ouverte) return;
    setQuestions(questions.map(q => q.id === ouverte.id ? { ...q, reponse: reponseTxt } : q));
    setReponseTxt("");
    alert("✅ Réponse envoyée à l'élève !");
  };

  const liker = (id: number) => setQuestions(questions.map(q => q.id === id ? { ...q, likes: q.likes + 1 } : q));

  // ✅ NOUVEAU : SUPPRIMER UNE QUESTION
  const supprimerQuestion = () => {
    if (!ouverte) return;
    // Sécurité : seul l'auteur ou le prof peut supprimer
    if (!modeProf && ouverte.auteur !== nom) {
      alert("Tu ne peux supprimer que TES questions !");
      return;
    }
    if (!confirm("Tu veux vraiment supprimer cette question ? Elle va disparaître partout.")) return;
    setQuestions(questions.filter(q => q.id !== ouverte.id));
    setOuverte(null);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] p-6">
      <Link href="/" className="text-sm">← Retour</Link>
      <div className="max-w-3xl mx-auto mt-4">
        <div className="flex justify-between items-center">
          <div><h1 className="text-2xl font-bold">💬 Questions / Réponses</h1><p className="text-sm text-gray-500">Clique sur une question pour ouvrir sa session 👇</p></div>
          <button onClick={() => setModeProf(!modeProf)} className={`px-4 py-2 rounded-full text-xs font-bold ${modeProf ? "bg-purple-700 text-white" : "bg-white border"}`}>{modeProf ? "👩🏾‍🏫 Mode Prof ON" : "👦 Mode Élève"}</button>
        </div>

        <div className="bg-white rounded-2xl p-5 mt-6">
          <div className="flex gap-2">
            <input value={nom} onChange={e => setNom(e.target.value)} className="border rounded-xl p-3 w-28 text-sm" placeholder="Ton nom" />
            <input value={texte} onChange={e => setTexte(e.target.value)} placeholder="Ex: Madame, c'est quoi une voyelle ?" className="border rounded-xl p-3 flex-1 text-sm outline-none" />
          </div>
          <button onClick={poser} className="w-full bg-green-600 text-white py-3 rounded-full mt-3 font-bold text-sm">Poser ma question →</button>
        </div>

        <h2 className="font-bold mt-6">Toutes les questions ({questions.length})</h2>
        <div className="space-y-3 mt-3">
          {questions.map(q => (
            <button key={q.id} onClick={() => setOuverte(q)} className="w-full text-left bg-white rounded-2xl p-5 hover:shadow-lg border">
              <div className="flex justify-between"><p className="font-bold text-sm">👦 {q.auteur} <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{q.role}</span></p><span className="text-xs text-gray-400">{q.date}</span></div>
              <p className="mt-2 font-medium">{q.question}</p>
              <div className="flex gap-3 mt-2 text-xs">
                {q.reponse ? <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">✅ Répondue - Clique pour voir</span> : <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-bold">⏳ En attente - Clique pour répondre</span>}
                <span>❤️ {q.likes}</span>
                <span className="text-blue-600 font-bold">Ouvrir la session →</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {ouverte && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-4" onClick={() => setOuverte(null)}>
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <p className="font-bold">💬 Session - Question de {ouverte.auteur}</p>
              <button onClick={() => setOuverte(null)} className="bg-gray-100 w-8 h-8 rounded-full">✕</button>
            </div>

            <div className="bg-blue-50 rounded-2xl p-4 mt-4">
              <p className="text-xs font-bold text-blue-700">👦 {ouverte.auteur} • {ouverte.date}</p>
              <p className="font-medium mt-1">{ouverte.question}</p>
              <button onClick={() => liker(ouverte.id)} className="text-sm mt-2">❤️ {ouverte.likes} J'ai la même question</button>
            </div>

            {ouverte.reponse ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mt-3">
                <p className="text-xs font-bold text-green-700">👩🏾‍🏫 Mme Diop - Réponse :</p>
                <p className="mt-1">{ouverte.reponse}</p>
              </div>
            ) : (
              <p className="text-sm text-orange-600 bg-orange-50 p-3 rounded-xl mt-3">⏳ Pas encore de réponse. Le prof va répondre bientôt.</p>
            )}

            {modeProf && (
              <div className="mt-4">
                <p className="font-bold text-sm">Répondre à {ouverte.auteur} :</p>
                <textarea value={reponseTxt} onChange={e => setReponseTxt(e.target.value)} placeholder="Écris ta réponse ici..." rows={3} className="w-full border rounded-xl p-3 mt-2 outline-none" />
                <button onClick={repondre} className="w-full bg-purple-700 text-white py-3 rounded-full mt-2 font-bold">Envoyer la réponse ✅</button>
              </div>
            )}

            {!modeProf && (
              <div className="mt-4 border-t pt-4">
                <p className="text-sm font-bold">Tu n'as pas compris ? Pose une autre question :</p>
                <div className="flex gap-2 mt-2">
                  <input value={texte} onChange={e => setTexte(e.target.value)} placeholder="Ex: Je n'ai pas compris..." className="border rounded-xl p-2 flex-1 text-sm" />
                  <button onClick={() => { poser(); }} className="bg-green-600 text-white px-4 rounded-full text-sm font-bold">Envoyer</button>
                </div>
              </div>
            )}

            {/* ✅ BOUTON SUPPRIMER - ICI DANS LA SESSION */}
            {(modeProf || ouverte.auteur === nom) && (
              <button onClick={supprimerQuestion} className="w-full bg-red-100 text-red-600 py-3 rounded-full mt-4 text-sm font-bold">
                🗑️ {modeProf ? "Supprimer cette question (Prof)" : "Supprimer ma question"}
              </button>
            )}

            <button onClick={() => setOuverte(null)} className="w-full bg-gray-100 py-3 rounded-full mt-3 text-sm font-bold">Fermer la session</button>
          </div>
        </div>
      )}
    </div>
  );
}