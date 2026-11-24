"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const niveaux = [
  { nom: "Moyenne Section", emoji: "🧒", couleur: "bg-yellow-400", lien: "moyenne-section", desc: "Couleurs, formes, chiffres 1 à 5" },
  { nom: "Grande Section", emoji: "👧", couleur: "bg-orange-400", lien: "grande-section", desc: "Lettres, chiffres 1 à 10" },
  { nom: "CP", emoji: "📚", couleur: "bg-green-500", lien: "cp", desc: "Lecture, écriture, calcul" },
  { nom: "CE1", emoji: "✏️", couleur: "bg-blue-500", lien: "ce1", desc: "Français, maths, sciences" },
  { nom: "CE2", emoji: "📖", couleur: "bg-purple-500", lien: "ce2", desc: "Conjugaison, multiplication" },
  { nom: "CM1", emoji: "🧠", couleur: "bg-pink-500", lien: "cm1", desc: "Grammaire, division, histoire" },
  { nom: "CM2", emoji: "🎓", couleur: "bg-red-500", lien: "cm2", desc: "Préparation entrée en 6ème" },
];

export default function Accueil() {
  const [user, setUser] = useState<any>(null);
  const [nomContact, setNomContact] = useState("");
  const [msgContact, setMsgContact] = useState("");

  useEffect(() => { const s = localStorage.getItem("ecole-user"); if (s) setUser(JSON.parse(s)); }, []);
  const deconnecter = () => { localStorage.removeItem("ecole-user"); setUser(null); };

  const envoyerContact = () => {
    if (!nomContact.trim() || !msgContact.trim()) {
      alert("Écris ton nom et ton message !");
      return;
    }
    const texte = encodeURIComponent(`Bonjour Ecole-Senegal, je suis ${nomContact}. ${msgContact}`);
    window.open(`https://wa.me/221758376591?text=${texte}`, "_blank");
    setNomContact("");
    setMsgContact("");
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-green-600 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold">E</span>
            <span className="font-bold">Ecole-Senegal</span>
          </Link>
          <nav className="hidden md:flex gap-3 text-sm font-bold">
            <Link href="/">Accueil</Link>
            <Link href="#apropos">À propos</Link>
            <Link href="#contact">Contact</Link>
            <Link href="/questions">💬 Questions</Link>
            <Link href="/enseignant">👩🏾‍🏫 Enseignant</Link>
          </nav>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">👋 Bonjour {user.nom}</span>
              <button onClick={deconnecter} className="bg-gray-100 px-3 py-1.5 rounded-full text-xs font-bold">Déconnecter</button>
            </div>
          ) : (
            <Link href="/connexion" className="bg-black text-white px-4 py-2 rounded-full text-sm">Connexion</Link>
          )}
        </div>
      </header>

      {/* HERO */}
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">🇸🇳 Keur Massar • Dakar • 100% Gratuit</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-4">Apprendre en s'amusant,<br/>de la <span className="text-green-600">Maternelle</span> au <span className="text-purple-600">CM2</span></h1>
        <p className="text-gray-500 mt-3">Leçons, jeux, exercices et questions-réponses avec Mme Diop.</p>
        <img src="/ecole-senegal.jpeg" alt="Ecole-Senegal Keur Massar" className="w-full max-w-3xl mx-auto rounded-3xl shadow-lg mt-6 object-cover" />
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Link href="/connexion" className="bg-green-600 text-white px-6 py-3 rounded-full font-bold text-sm">Commencer →</Link>
          <Link href="/questions" className="bg-white border px-6 py-3 rounded-full font-bold text-sm">💬 Voir les questions</Link>
          <a href="https://wa.me/221758376591" target="_blank" className="bg-green-500 text-white px-6 py-3 rounded-full font-bold text-sm">💬 WhatsApp : 75 837 65 91</a>
        </div>
        <div className="flex justify-center gap-8 mt-8 text-sm">
          <div><p className="font-bold text-xl">7</p><p className="text-gray-500">Niveaux</p></div>
          <div><p className="font-bold text-xl">120+</p><p className="text-gray-500">Leçons</p></div>
          <div><p className="font-bold text-xl">500+</p><p className="text-gray-500">Élèves</p></div>
        </div>
      </div>

      {/* NIVEAUX */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="font-bold text-xl">Choisis ton niveau</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {niveaux.map(n => (
            <Link key={n.lien} href={`/niveau/${n.lien}`} className="bg-white rounded-2xl p-5 hover:shadow-lg">
              <span className={`${n.couleur} w-12 h-12 rounded-2xl flex items-center justify-center text-2xl`}>{n.emoji}</span>
              <p className="font-bold mt-3">{n.nom}</p>
              <p className="text-xs text-gray-500 mt-1">{n.desc}</p>
              <p className="text-sm font-bold text-green-600 mt-3">Commencer →</p>
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Link href="/questions" className="bg-white rounded-2xl p-5 text-center border">
            <p className="text-4xl">💬</p>
            <p className="font-bold mt-2">Questions / Réponses</p>
            <p className="text-xs text-gray-500">Pose ta question à Mme Diop</p>
            <p className="text-sm font-bold text-green-600 mt-2">Voir →</p>
          </Link>
          <Link href="/enseignant" className="bg-purple-700 text-white rounded-2xl p-5 text-center">
            <p className="text-4xl">👩🏾‍🏫</p>
            <p className="font-bold mt-2">Espace Enseignant</p>
            <p className="text-xs opacity-80">Gérer élèves, leçons, documents, questions</p>
            <p className="text-sm font-bold mt-2">Entrer →</p>
          </Link>
        </div>
      </div>

      {/* À PROPOS */}
      <div id="apropos" className="max-w-6xl mx-auto px-4 pb-10">
        <div className="bg-white rounded-3xl p-6 md:p-8">
          <p className="text-green-600 font-bold text-sm">🏫 À PROPOS</p>
          <h2 className="font-bold text-2xl mt-2">Bienvenue à Ecole-Senegal, à Keur Massar</h2>
          <img src="/ecole-senegal.jpeg" alt="Notre école à Keur Massar" className="w-full rounded-2xl mt-4 object-cover max-h-72" />
          <p className="text-gray-500 mt-3 leading-relaxed">
            Ecole-Senegal est une école en ligne 100% gratuite pour les enfants de la Maternelle au CM2.
            Notre mission est simple : aider chaque enfant de Keur Massar et de tout le Sénégal à apprendre
            en s'amusant, avec des leçons simples, des jeux et des exercices adaptés.
          </p>
          <div className="grid grid-cols-3 gap-3 mt-6 text-center">
            <div className="bg-green-50 rounded-2xl p-4"><p className="text-2xl">📚</p><p className="font-bold text-sm mt-1">Leçons faciles</p><p className="text-xs text-gray-500">Français, Maths, Sciences</p></div>
            <div className="bg-purple-50 rounded-2xl p-4"><p className="text-2xl">🎮</p><p className="font-bold text-sm mt-1">Jeux & Quiz</p><p className="text-xs text-gray-500">Apprendre en jouant</p></div>
            <div className="bg-orange-50 rounded-2xl p-4"><p className="text-2xl">👩🏾‍🏫</p><p className="font-bold text-sm mt-1">Avec Mme Diop</p><p className="text-xs text-gray-500">Pose tes questions</p></div>
          </div>
          <p className="text-sm text-gray-500 mt-4">📍 Située à Keur Massar, Dakar - Sénégal. Ouverte à tous les enfants, partout au Sénégal.</p>
          <p className="text-sm font-bold mt-1">📞 +221 75 837 65 91</p>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-green-600 text-white rounded-3xl p-6 md:p-8">
          <p className="font-bold text-sm opacity-80">📞 CONTACT</p>
          <h2 className="font-bold text-2xl mt-2">Une question ? Écris-nous !</h2>
          <p className="text-sm opacity-80 mt-2">Parents, élèves, enseignants : on vous répond très vite.</p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-3 text-sm">
              <p className="bg-white/10 rounded-2xl p-4">📍 <b>Adresse :</b><br/>Keur Massar, Dakar, Sénégal</p>
              <p className="bg-white/10 rounded-2xl p-4">📞 <b>Téléphone / WhatsApp :</b><br/>+221 75 837 65 91<br/><a href="https://wa.me/221758376591" target="_blank" className="bg-white text-green-700 px-4 py-2 rounded-full inline-block mt-2 font-bold text-xs">💬 Écrire sur WhatsApp →</a></p>
              <p className="bg-white/10 rounded-2xl p-4">✉️ <b>Email :</b><br/>contact@ecole-senegal.sn</p>
              <p className="bg-white/10 rounded-2xl p-4">🕐 <b>Horaires :</b><br/>Lundi au Vendredi : 08h - 17h <span className="opacity-80">(avec des pauses)</span><br/>Samedi : 09h - 13h <span className="opacity-80">(avec une pause)</span></p>
            </div>
            <div className="bg-white rounded-2xl p-5 text-black">
              <p className="font-bold">Envoyer un message</p>
              <p className="text-xs text-gray-500">Ton message partira directement sur notre WhatsApp.</p>
              <input value={nomContact} onChange={e => setNomContact(e.target.value)} placeholder="Ton nom" className="w-full border rounded-xl p-3 mt-3 text-sm outline-none" />
              <textarea value={msgContact} onChange={e => setMsgContact(e.target.value)} placeholder="Ton message..." rows={3} className="w-full border rounded-xl p-3 mt-2 text-sm outline-none" />
              <button onClick={envoyerContact} className="w-full bg-green-600 text-white py-3 rounded-full mt-3 font-bold text-sm">Envoyer sur WhatsApp →</button>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">© 2026 Ecole-Senegal - Keur Massar, Dakar. Tous droits réservés. | WhatsApp : +221 75 837 65 91</p>
      </div>
    </div>
  );
}