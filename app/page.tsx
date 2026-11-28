"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import AssistantIA from "./components/AssistantIA";

const niveaux = [
  { nom: "Moyenne Section", emoji: "🧒", couleur: "bg-amber-100 text-amber-600", lien: "moyenne-section", desc: "Couleurs, formes, 1 à 5" },
  { nom: "Grande Section", emoji: "👧", couleur: "bg-orange-100 text-orange-600", lien: "grande-section", desc: "Lettres, 1 à 10" },
  { nom: "CP", emoji: "📚", couleur: "bg-green-100 text-green-600", lien: "cp", desc: "Lecture, écriture, calcul" },
  { nom: "CE1", emoji: "✏️", couleur: "bg-blue-100 text-blue-600", lien: "ce1", desc: "Français, maths, sciences" },
  { nom: "CE2", emoji: "📖", couleur: "bg-violet-100 text-violet-600", lien: "ce2", desc: "Conjugaison, multiplication" },
  { nom: "CM1", emoji: "🧠", couleur: "bg-pink-100 text-pink-600", lien: "cm1", desc: "Grammaire, division, histoire" },
  { nom: "CM2", emoji: "🎓", couleur: "bg-red-100 text-red-600", lien: "cm2", desc: "Prépa entrée en 6ème" },
];

export default function Accueil() {
  const [user, setUser] = useState<any>(null);
  const [nomContact, setNomContact] = useState("");
  const [msgContact, setMsgContact] = useState("");
  useEffect(() => { const s = localStorage.getItem("ecole-user"); if (s) setUser(JSON.parse(s)); }, []);
  const deconnecter = () => { localStorage.removeItem("ecole-user"); setUser(null); };
  const envoyerContact = () => {
    if (!nomContact.trim() || !msgContact.trim()) { alert("Écris ton nom et ton message !"); return; }
    const texte = encodeURIComponent(`Bonjour Ecole-Senegal, je suis ${nomContact}. ${msgContact}`);
    window.open(`https://wa.me/221758376591?text=${texte}`, "_blank");
    setNomContact(""); setMsgContact("");
  };
  return (
    <div className="min-h-screen bg-[#f6f5f0]">
      <header className="bg-white/90 backdrop-blur sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><span className="bg-green-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg shadow-md">E</span><span className="font-black tracking-tight">Ecole-Senegal <span className="text-green-600">🇸🇳</span></span></Link>
          <nav className="hidden md:flex gap-5 text-sm font-bold text-gray-700"><Link href="/">Accueil</Link><Link href="#apropos">À propos</Link><Link href="#contact">Contact</Link><Link href="/questions">💬 Questions</Link><Link href="/enseignant">👩🏾‍🏫 Enseignant</Link><Link href="/inscription" className="text-orange-600">📝 Inscription</Link></nav>
          {user ? <div className="flex items-center gap-2"><span className="text-sm font-bold">👋 {user.nom}</span><button onClick={deconnecter} className="bg-gray-100 px-3 py-1.5 rounded-full text-xs font-bold">Déconnecter</button></div> : <Link href="/connexion" className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-bold shadow">Connexion</Link>}
        </div>
      </header>

      {/* HERO NOUVEAU */}
      <div className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14 text-center">
          <span className="bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold">✨ Keur Massar • Dakar • 100% Gratuit</span>
          <h1 className="text-[2.6rem] leading-[1.05] md:text-6xl font-black mt-5 tracking-tight">Apprendre en<br/>s&apos;amusant, <span className="text-yellow-300">de la Maternelle</span><br/>au CM2 🎉</h1>
          <p className="text-white/90 mt-4 max-w-md mx-auto">Leçons, jeux, exercices et questions-réponses avec Mme Diop. Simple, gratuit, pour tous les enfants du Sénégal.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link href="/inscription" className="bg-orange-500 text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-xl shadow-orange-500/30 active:scale-95 transition">📝 Inscrire mon enfant</Link>
            <Link href="/connexion" className="bg-white text-green-700 px-7 py-3.5 rounded-full font-bold text-sm shadow-xl active:scale-95 transition">Commencer →</Link>
          </div>
          <div className="bg-white rounded-[2rem] p-2 mt-8 shadow-2xl max-w-3xl mx-auto rotate-[-1deg]"><img src="/ecole-senegal.jpeg" alt="Ecole-Senegal" className="w-full rounded-[1.5rem] object-cover max-h-[320px]" /></div>
          <div className="flex justify-center gap-3 mt-6">
            <div className="bg-white/15 backdrop-blur rounded-2xl px-5 py-3"><p className="font-black text-xl">7</p><p className="text-xs opacity-80">Niveaux</p></div>
            <div className="bg-white/15 backdrop-blur rounded-2xl px-5 py-3"><p className="font-black text-xl">120+</p><p className="text-xs opacity-80">Leçons</p></div>
            <div className="bg-white/15 backdrop-blur rounded-2xl px-5 py-3"><p className="font-black text-xl">500+</p><p className="text-xs opacity-80">Élèves</p></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between"><div><p className="text-green-600 font-bold text-xs tracking-widest">📚 CHOISIS TON NIVEAU</p><h2 className="font-black text-2xl mt-1">Commence à apprendre</h2></div><Link href="/inscription" className="text-sm font-bold text-orange-600">Inscrire →</Link></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          {niveaux.map(n => (<Link key={n.lien} href={`/niveau/${n.lien}`} className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition"><span className={`${n.couleur} w-12 h-12 rounded-2xl flex items-center justify-center text-2xl`}>{n.emoji}</span><p className="font-bold mt-3">{n.nom}</p><p className="text-xs text-gray-500 mt-1">{n.desc}</p><p className="text-sm font-bold text-green-600 mt-3">Commencer →</p></Link>))}
          <Link href="/inscription" className="bg-orange-500 text-white rounded-3xl p-5 shadow-lg shadow-orange-500/20 col-span-2 md:col-span-1"><p className="text-3xl">📝</p><p className="font-bold mt-2">Inscription</p><p className="text-xs opacity-80">Inscrire mon enfant</p><p className="text-sm font-bold mt-2">S&apos;inscrire →</p></Link>
        </div>

        <div className="grid md:grid-cols-3 gap-3 mt-3">
          <Link href="/questions" className="bg-white rounded-3xl p-5 text-center shadow-sm hover:shadow-lg transition"><p className="text-4xl">💬</p><p className="font-bold mt-2">Questions / Réponses</p><p className="text-xs text-gray-500">Pose ta question à Mme Diop</p><p className="text-sm font-bold text-green-600 mt-2">Voir →</p></Link>
          <Link href="/enseignant" className="bg-violet-600 text-white rounded-3xl p-5 text-center shadow-lg shadow-violet-600/20"><p className="text-4xl">👩🏾‍🏫</p><p className="font-bold mt-2">Espace Enseignant</p><p className="text-xs opacity-80">Gérer élèves, leçons, questions</p><p className="text-sm font-bold mt-2">Entrer →</p></Link>
          <a href="https://wa.me/221758376591" target="_blank" className="bg-green-600 text-white rounded-3xl p-5 text-center shadow-lg shadow-green-600/20"><p className="text-4xl">💬</p><p className="font-bold mt-2">WhatsApp</p><p className="text-xs opacity-80">75 837 65 91</p><p className="text-sm font-bold mt-2">Écrire →</p></a>
        </div>
      </div>

      <div id="apropos" className="max-w-6xl mx-auto px-4 pb-10"><div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm"><p className="text-green-600 font-bold text-xs tracking-widest">🏫 À PROPOS</p><h2 className="font-black text-2xl mt-2">Bienvenue à Ecole-Senegal, à Keur Massar</h2><img src="/ecole-senegal.jpeg" alt="Notre école" className="w-full rounded-3xl mt-4 object-cover max-h-72" /><p className="text-gray-500 mt-4 leading-relaxed">Ecole-Senegal est une école en ligne 100% gratuite pour les enfants de la Maternelle au CM2. Notre mission : aider chaque enfant de Keur Massar et de tout le Sénégal à apprendre en s&apos;amusant.</p><div className="grid grid-cols-3 gap-3 mt-6 text-center"><div className="bg-green-50 rounded-3xl p-4"><p className="text-2xl">📚</p><p className="font-bold text-sm mt-1">Leçons faciles</p><p className="text-xs text-gray-500">Français, Maths</p></div><div className="bg-violet-50 rounded-3xl p-4"><p className="text-2xl">🎮</p><p className="font-bold text-sm mt-1">Jeux & Quiz</p><p className="text-xs text-gray-500">Apprendre en jouant</p></div><div className="bg-orange-50 rounded-3xl p-4"><p className="text-2xl">👩🏾‍🏫</p><p className="font-bold text-sm mt-1">Avec Mme Diop</p><p className="text-xs text-gray-500">Pose tes questions</p></div></div><p className="text-sm text-gray-500 mt-5">📍 Keur Massar, Dakar - Sénégal • 📞 <b className="text-black">75 837 65 91</b></p><Link href="/inscription" className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold text-sm inline-block mt-4 shadow-lg shadow-orange-500/30">📝 Inscrire mon enfant →</Link></div></div>

      <div id="contact" className="max-w-6xl mx-auto px-4 pb-16"><div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-[2rem] p-6 md:p-8 shadow-xl"><p className="font-bold text-xs tracking-widest opacity-80">📞 CONTACT</p><h2 className="font-black text-2xl mt-2">Une question ? Écris-nous !</h2><p className="text-sm opacity-80 mt-1">On vous répond très vite.</p><div className="grid md:grid-cols-2 gap-5 mt-6"><div className="space-y-3 text-sm"><p className="bg-white/10 rounded-2xl p-4">📍 <b>Adresse</b><br/>Keur Massar, Dakar, Sénégal</p><p className="bg-white/10 rounded-2xl p-4">📞 <b>WhatsApp</b><br/>75 837 65 91<br/><a href="https://wa.me/221758376591" target="_blank" className="bg-white text-green-700 px-4 py-2 rounded-full inline-block mt-2 font-bold text-xs">💬 Écrire sur WhatsApp →</a></p><p className="bg-white/10 rounded-2xl p-4">🕐 <b>Horaires</b><br/>Lun - Ven : 08h - 17h • Sam : 09h - 13h</p></div><div className="bg-white rounded-3xl p-5 text-black"><p className="font-bold">Envoyer un message</p><p className="text-xs text-gray-500">Ton message partira sur notre WhatsApp.</p><input value={nomContact} onChange={e => setNomContact(e.target.value)} placeholder="Ton nom" className="w-full border rounded-2xl p-3.5 mt-3 text-sm outline-none bg-gray-50 focus:bg-white focus:border-green-500" /><textarea value={msgContact} onChange={e => setMsgContact(e.target.value)} placeholder="Ton message..." rows={3} className="w-full border rounded-2xl p-3.5 mt-2 text-sm outline-none bg-gray-50 focus:bg-white focus:border-green-500" /><button onClick={envoyerContact} className="w-full bg-green-600 text-white py-3.5 rounded-full mt-3 font-bold text-sm shadow-lg shadow-green-600/30">Envoyer sur WhatsApp →</button></div></div></div><p className="text-center text-xs text-gray-400 mt-6">© 2026 Ecole-Senegal - Keur Massar, Dakar • WhatsApp : 75 837 65 91</p></div>
      <AssistantIA />
    </div>
  );
}