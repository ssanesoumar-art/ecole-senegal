"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { proposerReponse } from "../lib/ia";

const elevesInit = [
  { nom: "Moussa Diallo", niveau: "CP", points: 120, progression: 65, derniere: "Aujourd'hui" },
  { nom: "Awa Ndiaye", niveau: "CP", points: 95, progression: 50, derniere: "Aujourd'hui" },
  { nom: "Ibrahim Fall", niveau: "CE1", points: 210, progression: 80, derniere: "Hier" },
  { nom: "Fatou Seck", niveau: "CE1", points: 60, progression: 30, derniere: "Il y a 2 jours" },
  { nom: "Cheikh Sow", niveau: "CM2", points: 340, progression: 90, derniere: "Aujourd'hui" },
];

type Doc = { nom: string; type: string; taille: string; url: string; date: string };
type Q = { id: number; auteur: string; role: string; question: string; reponse: string | null; likes: number; date: string };

const questionsDefaut: Q[] = [
  { id: 1, auteur: "Moussa", role: "CP", question: "Madame, pourquoi BA + BA = BABA ?", reponse: "Bravo Moussa ! Parce que BA + BA ça fait 2 fois BA, donc BABA comme Papa ! 👏", likes: 3, date: "Aujourd'hui" },
  { id: 2, auteur: "Awa", role: "CP", question: "Comment on écrit 15 ?", reponse: "Quinze", likes: 1, date: "Aujourd'hui" },
  { id: 3, auteur: "Moussa", role: "CP", question: "J’ai compris", reponse: null, likes: 0, date: "Aujourd'hui" },
];

const docsDefaut: Doc[] = [
  { nom: "Exercice Maths CP.pdf", type: "PDF", taille: "1.2 Mo", url: "#", date: "Aujourd'hui" },
  { nom: "Lecture - Les voyelles.pdf", type: "PDF", taille: "800 Ko", url: "#", date: "Hier" },
];

export default function EnseignantPage() {
  const [eleves] = useState(elevesInit);
  const [titre, setTitre] = useState("");
  const [message, setMessage] = useState("");
  const [docs, setDocs] = useState<Doc[]>(docsDefaut);
  const [questions, setQuestions] = useState<Q[]>(questionsDefaut);
  const [ouverte, setOuverte] = useState<Q | null>(null);
  const [docOuvert, setDocOuvert] = useState<Doc | null>(null);
  const [reponseTxt, setReponseTxt] = useState("");
  const [monte, setMonte] = useState(false);

  useEffect(() => {
    setMonte(true);
    try {
      const s = localStorage.getItem("ecole-questions");
      if (s) setQuestions(JSON.parse(s));
      const d = localStorage.getItem("ecole-docs");
      if (d) setDocs(JSON.parse(d));
    } catch {}
  }, []);

  useEffect(() => {
    if (monte && questions.length > 0) localStorage.setItem("ecole-questions", JSON.stringify(questions));
  }, [questions, monte]);

  const ouverteMaj = ouverte ? questions.find(q => q.id === ouverte.id) || ouverte : null;
  const ouvrirSession = (q: Q) => { setOuverte(q); setReponseTxt(q.reponse || ""); };
  const repondreDansSession = () => {
    if (!reponseTxt.trim() || !ouverteMaj) return;
    setQuestions(questions.map(q => q.id === ouverteMaj.id ? { ...q, reponse: reponseTxt } : q));
    alert("✅ Réponse envoyée !");
    setOuverte(null);
  };
  const supprimerReponse = () => {
    if (!ouverteMaj) return;
    if (!confirm("Supprimer cette réponse ?")) return;
    setQuestions(questions.map(q => q.id === ouverteMaj.id ? { ...q, reponse: null } : q));
    setOuverte(null);
  };
  const supprimerQuestion = () => {
    if (!ouverteMaj) return;
    if (!confirm("Supprimer toute la question ?")) return;
    setQuestions(questions.filter(q => q.id !== ouverteMaj.id));
    setOuverte(null);
  };
  const creerLecon = () => { if (!titre) return; setMessage(`✅ Leçon "${titre}" créée !`); setTitre(""); };
  const ajouterDoc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const taille = file.size > 1000000 ? (file.size / 1000000).toFixed(1) + " Mo" : (file.size / 1000).toFixed(0) + " Ko";
    const type = file.type.includes("pdf") ? "PDF" : file.type.includes("image") ? "Image 🖼️" : "Fichier";
    const nouveau = { nom: file.name, type, taille, url, date: "À l'instant" };
    const maj = [nouveau, ...docs];
    setDocs(maj); localStorage.setItem("ecole-docs", JSON.stringify(maj));
    setMessage(`✅ Document "${file.name}" partagé !`);
  };
  const supprimerDoc = (nom: string) => {
    if (!confirm("Supprimer ce document ?")) return;
    const maj = docs.filter(d => d.nom !== nom);
    setDocs(maj); localStorage.setItem("ecole-docs", JSON.stringify(maj));
    setDocOuvert(null);
  };

  const sansReponse = monte ? questions.filter(q => !q.reponse).length : questionsDefaut.filter(q => !q.reponse).length;
  const avecReponse = monte ? questions.filter(q => q.reponse).length : questionsDefaut.filter(q => q.reponse).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-white p-4 md:p-6">
      <Link href="/" className="text-sm font-bold">← Retour Accueil</Link>
      <div className="max-w-5xl mx-auto mt-4">
        {/* NOUVEAU HEADER VIOLET DÉGRADÉ */}
        <div className="bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-500 text-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-violet-600/20">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="bg-white/20 backdrop-blur w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow">👩🏾‍🏫</span>
              <div><h1 className="text-2xl md:text-3xl font-black tracking-tight">Bonjour, Mme Diop</h1><p className="opacity-80 text-sm">École de Yeumbeul • Dakar • Classe CP / CE1 • 75 837 65 91</p></div>
            </div>
            <div className="flex gap-3 text-center">
              <div className="bg-white/15 backdrop-blur rounded-2xl px-4 py-3 min-w-[72px]"><p className="text-2xl font-black">{eleves.length}</p><p className="text-[11px] opacity-80">Élèves</p></div>
              <div className="bg-orange-500 rounded-2xl px-4 py-3 min-w-[72px] shadow-lg shadow-orange-500/30"><p className="text-2xl font-black">{sansReponse}</p><p className="text-[11px] opacity-90">À répondre ⏳</p></div>
              <div className="bg-white/15 backdrop-blur rounded-2xl px-4 py-3 min-w-[72px]"><p className="text-2xl font-black">{avecReponse}</p><p className="text-[11px] opacity-80">Répondues ✅</p></div>
            </div>
          </div>
        </div>

        <Link href="/enseignant/inscriptions" className="block bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center py-4 rounded-full mt-4 font-bold shadow-lg shadow-orange-500/30 active:scale-[0.98] transition">📝 Voir le Tableau des Inscriptions →</Link>

        <div className="grid md:grid-cols-2 gap-4 mt-5">
          {/* ÉLÈVES + DOCS */}
          <div className="bg-white rounded-[1.8rem] p-6 shadow-sm border border-gray-100">
            <h2 className="font-black text-lg">👦🏾 Mes élèves</h2>
            <div className="space-y-3 mt-4">
              {eleves.map((e) => (
                <div key={e.nom} className="bg-gray-50 hover:bg-violet-50 transition rounded-2xl p-4">
                  <div className="flex justify-between items-center"><p className="font-bold text-sm">{e.nom}</p><span className="text-xs bg-white px-2.5 py-1 rounded-full font-bold shadow-sm">{e.niveau}</span></div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1.5"><span>⭐ {e.points} points • {e.derniere}</span><span className="font-bold text-violet-700">{e.progression}%</span></div>
                  <div className="w-full bg-gray-200 h-2.5 rounded-full mt-2 overflow-hidden"><div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 h-2.5 rounded-full" style={{ width: `${e.progression}%` }}></div></div>
                </div>
              ))}
            </div>
            <h2 className="font-black text-lg mt-8">📁 Documents partagés</h2>
            <div className="space-y-2.5 mt-3">
              {docs.map((d) => (
                <button key={d.nom} onClick={() => setDocOuvert(d)} className="w-full text-left bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow rounded-2xl p-3.5 flex justify-between items-center transition">
                  <div className="flex gap-3 items-center"><span className="bg-white w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shadow-sm">{d.type === "PDF" ? "📄" : "🖼️"}</span><div><p className="font-bold text-sm">{d.nom}</p><p className="text-xs text-gray-500">{d.type} • {d.taille} • {d.date}</p></div></div>
                  <span className="text-lg">👁️</span>
                </button>
              ))}
            </div>
          </div>

          {/* CRÉER + PARTAGER */}
          <div>
            <div className="bg-white rounded-[1.8rem] p-6 shadow-sm border border-gray-100">
              <h2 className="font-black text-lg">✏️ Créer une leçon</h2>
              <input value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Ex: Les nombres de 1 à 100" className="w-full border rounded-2xl p-3.5 mt-4 outline-none bg-gray-50 focus:bg-white focus:border-violet-500" />
              <button onClick={creerLecon} className="w-full bg-violet-600 text-white py-3.5 rounded-full mt-3 font-bold shadow-lg shadow-violet-600/30 active:scale-[0.98] transition">Publier la leçon →</button>
            </div>
            <div className="bg-violet-50 rounded-[1.8rem] p-6 mt-4 border-2 border-dashed border-violet-300">
              <h2 className="font-black text-lg">📤 Partager un document</h2>
              <label className="block text-center bg-white cursor-pointer py-7 rounded-2xl mt-4 font-bold text-violet-700 shadow-sm">📁 Choisir un fichier<input type="file" accept=".pdf,.doc,.docx,.jpg,.png,.jpeg" onChange={ajouterDoc} className="hidden" /></label>
              <p className="text-center text-xs text-violet-500 mt-2">PDF, Word, Images</p>
            </div>
            {message && <p className="mt-3 text-sm font-bold text-green-700 text-center bg-green-50 p-3.5 rounded-2xl border border-green-100">{message}</p>}
          </div>
        </div>

        {/* QUESTIONS */}
        <div className="bg-white rounded-[1.8rem] p-6 mt-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center"><h2 className="font-black text-lg">💬 Questions des élèves</h2><span className="text-xs font-bold bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full">{sansReponse} en attente</span></div>
          <div className="space-y-3 mt-4">
            {questions.map((q) => (
              <div key={q.id} className="bg-gray-50 rounded-2xl p-4">
                <button onClick={() => ouvrirSession(q)} className="w-full text-left">
                  <p className="font-bold text-sm">👦 {q.auteur} <span className="text-xs bg-white px-2 py-1 rounded-full shadow-sm">{q.role}</span> <span className="text-xs text-gray-400">• {q.date} • ❤️ {q.likes}</span></p>
                  <p className="text-sm mt-1.5">{q.question}</p>
                </button>
                {q.reponse ? (
                  <button onClick={() => ouvrirSession(q)} className="w-full text-left mt-2.5 bg-green-50 border border-green-200 p-3.5 rounded-2xl"><p className="text-xs font-bold text-green-700">👩🏾‍🏫 Ta réponse :</p><p className="text-sm mt-1">{q.reponse}</p></button>
                ) : (
                  <button onClick={() => ouvrirSession(q)} className="w-full text-left mt-2.5 bg-orange-50 border border-orange-100 p-3.5 rounded-2xl"><p className="text-sm text-orange-600 font-bold">⏳ Pas encore de réponse - Clique pour répondre →</p></button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {ouverteMaj && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-4" onClick={() => setOuverte(null)}>
          <div className="bg-white w-full max-w-lg rounded-[1.8rem] p-6 max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center"><p className="font-black">💬 Session - {ouverteMaj.auteur}</p><button onClick={() => setOuverte(null)} className="bg-gray-100 w-9 h-9 rounded-full font-bold">✕</button></div>
            <div className="bg-blue-50 rounded-2xl p-4 mt-4"><p className="text-xs font-bold text-blue-700">👦 {ouverteMaj.auteur} • {ouverteMaj.date} • ❤️ {ouverteMaj.likes}</p><p className="font-medium mt-1">{ouverteMaj.question}</p></div>
            {ouverteMaj.reponse && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mt-3">
                <p className="text-xs font-bold text-green-700">👩🏾‍🏫 Ta réponse actuelle :</p><p className="mt-1">{ouverteMaj.reponse}</p>
                <button onClick={supprimerReponse} className="w-full bg-red-100 text-red-700 py-2.5 rounded-full mt-3 text-sm font-bold">🗑️ Supprimer cette réponse</button>
              </div>
            )}
            <div className="mt-4"><p className="font-bold text-sm">{ouverteMaj.reponse ? "Corriger la réponse :" : "Écrire ta réponse :"}</p>
              <button onClick={() => setReponseTxt(proposerReponse(ouverteMaj.question, ouverteMaj.role))} className="w-full bg-violet-100 text-violet-700 py-3 rounded-full font-bold text-sm mb-2 mt-2">✨ IA - Proposer une réponse</button>
              <textarea value={reponseTxt} onChange={e => setReponseTxt(e.target.value)} rows={3} className="w-full border rounded-2xl p-3.5 mt-1 outline-none bg-gray-50 focus:bg-white" />
              <button onClick={repondreDansSession} className="w-full bg-violet-600 text-white py-3.5 rounded-full mt-2 font-bold shadow-lg shadow-violet-600/30">Envoyer la réponse ✅</button>
            </div>
            <button onClick={supprimerQuestion} className="w-full bg-gray-100 text-red-600 py-3 rounded-full mt-2 text-sm font-bold">🗑️ Supprimer toute la question</button>
            <button onClick={() => setOuverte(null)} className="w-full bg-gray-100 py-3 rounded-full mt-2 text-sm font-bold">Fermer</button>
          </div>
        </div>
      )}
      {docOuvert && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-4" onClick={() => setDocOuvert(null)}>
          <div className="bg-white w-full max-w-lg rounded-[1.8rem] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center"><p className="font-black">📁 Document</p><button onClick={() => setDocOuvert(null)} className="bg-gray-100 w-9 h-9 rounded-full font-bold">✕</button></div>
            <div className="text-center mt-4"><p className="text-6xl">{docOuvert.type === "PDF" ? "📄" : "🖼️"}</p><p className="font-bold mt-3">{docOuvert.nom}</p><p className="text-sm text-gray-500">{docOuvert.type} • {docOuvert.taille} • {docOuvert.date}</p></div>
            {docOuvert.url !== "#" && docOuvert.type.includes("Image") && <img src={docOuvert.url} alt={docOuvert.nom} className="w-full rounded-2xl mt-4 max-h-64 object-cover" />}
            <a href={docOuvert.url} download={docOuvert.nom} target="_blank" className="block text-center bg-black text-white py-3.5 rounded-full mt-4 font-bold text-sm">⬇️ Télécharger / Ouvrir</a>
            <button onClick={() => supprimerDoc(docOuvert.nom)} className="w-full bg-red-100 text-red-700 py-3 rounded-full mt-2 font-bold text-sm">🗑️ Supprimer ce document</button>
            <button onClick={() => setDocOuvert(null)} className="w-full bg-gray-100 py-3 rounded-full mt-2 text-sm font-bold">Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}