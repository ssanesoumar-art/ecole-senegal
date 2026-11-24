"use client";
import { useState } from "react";
import Link from "next/link";

export default function InscriptionPage() {
  const [parent, setParent] = useState("");
  const [enfant, setEnfant] = useState("");
  const [age, setAge] = useState("");
  const [sexe, setSexe] = useState("Garçon");
  const [niveau, setNiveau] = useState("CP");
  const [tel, setTel] = useState("");
  const [message, setMessage] = useState("");
  const [envoye, setEnvoye] = useState(false);

  const envoyer = () => {
    if (!parent.trim() || !enfant.trim() || !age.trim() || !tel.trim()) {
      alert("Remplis tous les champs : Parent, Enfant, Âge, Téléphone !");
      return;
    }
    const id = Date.now();
    const nouvelle = { id, parent, enfant, age, sexe, niveau, tel, message, date: "Aujourd'hui", statut: "En attente" };
    const anciennes = JSON.parse(localStorage.getItem("ecole-inscriptions") || "[]");
    localStorage.setItem("ecole-inscriptions", JSON.stringify([nouvelle, ...anciennes]));

    // LIEN AVEC TOUTES LES INFOS DEDANS
    const lien = `https://ecole-senegal.vercel.app/enseignant/inscriptions?valider=${id}&parent=${encodeURIComponent(parent)}&enfant=${encodeURIComponent(enfant)}&age=${age}&sexe=${encodeURIComponent(sexe)}&niveau=${niveau}&tel=${encodeURIComponent(tel)}`;
    const texte = `Bonjour Mme Diop, nouvelle inscription:%0A- Parent: ${parent}%0A- Enfant: ${enfant}%0A- Âge: ${age} ans%0A- Sexe: ${sexe}%0A- Niveau: ${niveau}%0A- Tél: ${tel}%0A- Message: ${message}%0A%0A👉 CLIQUE ICI POUR VERIFIER ET VALIDER:%0A${lien}%0A%0AAppuie sur OK pour valider.`;
    // ✅ BON NUMÉRO : 75 837 65 91
    window.open(`https://wa.me/221758376591?text=${texte}`, "_blank");
    setEnvoye(true);
  };

  if (envoye) return (
    <div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center p-6 text-center">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full">
        <p className="text-5xl">✅</p><h1 className="text-xl font-bold mt-3">Merci {parent} !</h1>
        <p className="text-sm text-gray-500 mt-2">Inscription de {enfant} ({age} ans, {sexe}, {niveau}) envoyée.<br/>Mme Diop va te répondre sur WhatsApp.</p>
        <Link href="/" className="block bg-black text-white py-3 rounded-full mt-6 font-bold text-sm">Retour à l&apos;accueil</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f7f4] p-6">
      <Link href="/" className="text-sm">← Retour</Link>
      <div className="max-w-md mx-auto bg-white rounded-3xl p-6 mt-4">
        <h1 className="text-2xl font-bold">📝 Inscrire mon enfant</h1>
        <p className="text-sm text-gray-500">École de Yeumbeul • Dakar</p>
        <div className="space-y-3 mt-5">
          <input value={parent} onChange={e => setParent(e.target.value)} placeholder="Nom du parent - Ex: Moussa seck" className="w-full border rounded-xl p-3" />
          <input value={enfant} onChange={e => setEnfant(e.target.value)} placeholder="Nom de l'enfant - Ex: Lamine seck" className="w-full border rounded-xl p-3" />
          <div className="flex gap-2">
            <input value={age} onChange={e => setAge(e.target.value)} placeholder="Âge - Ex: 6" type="number" className="flex-1 border rounded-xl p-3" />
            <select value={sexe} onChange={e => setSexe(e.target.value)} className="flex-1 border rounded-xl p-3">
              <option>Garçon</option><option>Fille</option>
            </select>
          </div>
          <select value={niveau} onChange={e => setNiveau(e.target.value)} className="w-full border rounded-xl p-3"><option>CP</option><option>CE1</option><option>CE2</option><option>CM1</option><option>CM2</option></select>
          <input value={tel} onChange={e => setTel(e.target.value)} placeholder="Téléphone WhatsApp - Ex: 75 837 65 91" className="w-full border rounded-xl p-3" />
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message pour Mme Diop (optionnel)" rows={2} className="w-full border rounded-xl p-3" />
          <button onClick={envoyer} className="w-full bg-green-600 text-white py-4 rounded-full font-bold">Envoyer sur WhatsApp →</button>
        </div>
      </div>
    </div>
  );
}