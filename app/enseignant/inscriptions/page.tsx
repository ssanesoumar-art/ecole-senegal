"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Ins = { id: number; parent: string; enfant: string; age: string; sexe: string; niveau: string; tel: string; message: string; date: string; statut: string };

export default function InscriptionsPage() {
  const [liste, setListe] = useState<Ins[]>([]);
  const [monte, setMonte] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [parent, setParent] = useState("");
  const [enfant, setEnfant] = useState("");
  const [age, setAge] = useState("");
  const [sexe, setSexe] = useState("Garçon");
  const [niveau, setNiveau] = useState("CP");
  const [tel, setTel] = useState("");

  useEffect(() => {
    setMonte(true);
    const s = localStorage.getItem("ecole-inscriptions");
    if (s) setListe(JSON.parse(s));
    // eslint-disable-next-line react-hooks/set-state-in-effect
  }, []);

  useEffect(() => {
    if (monte) localStorage.setItem("ecole-inscriptions", JSON.stringify(liste));
  }, [liste, monte]);

  const ajouterDepuisWhatsApp = () => {
    if (!parent.trim() || !enfant.trim()) { alert("Mets le nom du parent et de l'enfant !"); return; }
    const nouvelle: Ins = { id: Date.now(), parent, enfant, age: age || "?", sexe, niveau, tel, message: "Via WhatsApp", date: "Aujourd'hui", statut: "En attente" };
    setListe([nouvelle, ...liste]);
    setParent(""); setEnfant(""); setAge(""); setTel(""); setShowForm(false);
  };

  const valider = (id: number) => setListe(liste.map(i => i.id === id ? { ...i, statut: "Validé ✅" } : i));
  const refuser = (id: number) => { if (confirm("Refuser ?")) setListe(liste.filter(i => i.id !== id)); };

  return (
    <div className="min-h-screen bg-[#f8f7f4] p-6">
      <Link href="/enseignant" className="text-sm">← Retour Dashboard</Link>
      <div className="max-w-4xl mx-auto mt-4">
        <h1 className="text-2xl font-bold">📝 Tableau des Inscriptions</h1>
        <p className="text-sm text-gray-500">{liste.length} demandes • {liste.filter(i => i.statut.includes("Validé")).length} validées ✅</p>

        <button onClick={() => setShowForm(!showForm)} className="w-full bg-green-600 text-white py-4 rounded-2xl mt-4 font-bold">{showForm ? "Fermer ✕" : "➕ Ajouter depuis WhatsApp"}</button>

        {showForm && (
          <div className="bg-white rounded-2xl p-5 mt-4 space-y-3">
            <input value={parent} onChange={e => setParent(e.target.value)} placeholder="Parent - Ex: Moussa seck" className="w-full border rounded-xl p-3" />
            <input value={enfant} onChange={e => setEnfant(e.target.value)} placeholder="Enfant - Ex: Lamine seck" className="w-full border rounded-xl p-3" />
            <div className="flex gap-2">
              <input value={age} onChange={e => setAge(e.target.value)} placeholder="Âge - Ex: 6" type="number" className="flex-1 border rounded-xl p-3" />
              <select value={sexe} onChange={e => setSexe(e.target.value)} className="flex-1 border rounded-xl p-3"><option>Garçon</option><option>Fille</option></select>
            </div>
            <div className="flex gap-2">
              <select value={niveau} onChange={e => setNiveau(e.target.value)} className="border rounded-xl p-3 flex-1"><option>CP</option><option>CE1</option><option>CE2</option><option>CM1</option><option>CM2</option></select>
              <input value={tel} onChange={e => setTel(e.target.value)} placeholder="Tél - 76 376 82 40" className="flex-1 border rounded-xl p-3" />
            </div>
            <button onClick={ajouterDepuisWhatsApp} className="w-full bg-black text-white py-3 rounded-full font-bold">Ajouter →</button>
          </div>
        )}

        <div className="space-y-3 mt-6">
          {liste.map((ins) => (
            <div key={ins.id} className={`bg-white rounded-2xl p-5 border-2 ${ins.statut.includes("Validé") ? "border-green-300" : "border-orange-200"}`}>
              <p className="font-bold">{ins.sexe === "Fille" ? "👧" : "👦"} {ins.enfant} <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{ins.niveau}</span> <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{ins.age} ans • {ins.sexe}</span></p>
              <p className="text-sm text-gray-600 mt-1">Parent : {ins.parent} • 📞 {ins.tel} • {ins.date}</p>
              <p className="text-xs text-gray-400">{ins.message}</p>
              <div className="flex justify-between items-center mt-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${ins.statut.includes("Validé") ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>{ins.statut}</span>
                {ins.statut === "En attente" && <div className="flex gap-2"><button onClick={() => valider(ins.id)} className="bg-green-600 text-white px-4 py-2 rounded-full font-bold text-sm">✅ Valider</button><button onClick={() => refuser(ins.id)} className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-bold text-sm">Refuser</button></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}