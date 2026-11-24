"use client";
import { useState } from "react";
import Link from "next/link";

const niveaux = ["Moyenne Section", "Grande Section", "CP", "CE1", "CE2", "CM1", "CM2"];

export default function Inscription() {
  const [nomParent, setNomParent] = useState("");
  const [nomEnfant, setNomEnfant] = useState("");
  const [niveau, setNiveau] = useState("CP");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");

  const envoyer = () => {
    if (!nomParent.trim() || !nomEnfant.trim() || !telephone.trim()) {
      alert("Remplis : ton nom, nom de l'enfant et téléphone !");
      return;
    }
    const texte = encodeURIComponent(`📝 NOUVELLE INSCRIPTION - Ecole-Senegal\n\n👤 Parent : ${nomParent}\n👧 Enfant : ${nomEnfant}\n📚 Niveau : ${niveau}\n📞 Tél parent : ${telephone}\n💬 Message : ${message || "Aucun"}\n\nMerci !`);
    window.open(`https://wa.me/221758376591?text=${texte}`, "_blank");
    const envoyer = () => {
  if (!nomParent.trim() || !nomEnfant.trim() || !telephone.trim()) {
    alert("Remplis : ton nom, nom de l'enfant et téléphone !");
    return;
  }

  // 1. ENREGISTRER dans le tableau
  const nouvelle = {
    parent: nomParent,
    enfant: nomEnfant,
    niveau: niveau,
    telephone: telephone,
    message: message,
    date: new Date().toLocaleString("fr-SN"),
  };
  const anciennes = JSON.parse(localStorage.getItem("ecole-inscriptions") || "[]");
  anciennes.push(nouvelle);
  localStorage.setItem("ecole-inscriptions", JSON.stringify(anciennes));

  // 2. Envoyer aussi sur WhatsApp comme avant
  const texte = encodeURIComponent(`📝 NOUVELLE INSCRIPTION - Ecole-Senegal\n\n👤 Parent : ${nomParent}\n👧 Enfant : ${nomEnfant}\n📚 Niveau : ${niveau}\n📞 Tél parent : ${telephone}\n💬 Message : ${message || "Aucun"}`);
  window.open(`https://wa.me/221758376591?text=${texte}`, "_blank");
};
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      {/* HEADER simple */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-green-600 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold">E</span>
            <span className="font-bold">Ecole-Senegal</span>
          </Link>
          <Link href="/" className="bg-gray-100 px-4 py-2 rounded-full text-sm font-bold">← Retour Accueil</Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">🇸🇳 Keur Massar • 100% Gratuit</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-4">📝 Inscrire mon enfant</h1>
          <p className="text-gray-500 mt-2">Remplis le formulaire, ça part directement sur notre WhatsApp <b>+221 75 837 65 91</b>. On te répond très vite !</p>
          <img src="/ecole-senegal.jpeg" alt="Ecole-Senegal" className="w-full rounded-3xl mt-4 object-cover max-h-56" />
        </div>

        <div className="bg-white rounded-3xl p-6 mt-6 shadow">
          <label className="font-bold text-sm">Nom du parent *</label>
          <input value={nomParent} onChange={e => setNomParent(e.target.value)} placeholder="Ex: Awa Diop" className="w-full border rounded-xl p-3 mt-1 mb-4 text-sm outline-none" />

          <label className="font-bold text-sm">Nom de l'enfant *</label>
          <input value={nomEnfant} onChange={e => setNomEnfant(e.target.value)} placeholder="Ex: Moussa Diop" className="w-full border rounded-xl p-3 mt-1 mb-4 text-sm outline-none" />

          <label className="font-bold text-sm">Niveau souhaité *</label>
          <select value={niveau} onChange={e => setNiveau(e.target.value)} className="w-full border rounded-xl p-3 mt-1 mb-4 text-sm outline-none bg-white">
            {niveaux.map(n => <option key={n} value={n}>{n}</option>)}
          </select>

          <label className="font-bold text-sm">Téléphone du parent *</label>
          <input value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="Ex: 77 123 45 67" className="w-full border rounded-xl p-3 mt-1 mb-4 text-sm outline-none" />

          <label className="font-bold text-sm">Message (optionnel)</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Ex: Mon enfant veut commencer lundi..." rows={3} className="w-full border rounded-xl p-3 mt-1 text-sm outline-none" />

          <button onClick={envoyer} className="w-full bg-green-600 text-white py-4 rounded-full mt-5 font-bold">📩 Envoyer l'inscription sur WhatsApp →</button>
          <p className="text-center text-xs text-gray-400 mt-3">Horaires : Lun-Ven 08h-17h (Pauses 10h-10h30 et 13h-14h) • Sam 09h-13h (Pause 10h-10h30)</p>
        </div>

        <div className="bg-green-600 text-white rounded-3xl p-5 mt-4 text-center">
          <p className="font-bold">Tu préfères appeler ?</p>
          <a href="https://wa.me/221758376591" target="_blank" className="bg-white text-green-700 px-5 py-2 rounded-full inline-block mt-2 font-bold text-sm">💬 WhatsApp : 75 837 65 91</a>
        </div>
      </div>
    </div>
  );
}