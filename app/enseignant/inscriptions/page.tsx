"use client";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type Ins = { id: number; parent: string; enfant: string; age: string; sexe: string; niveau: string; tel: string; message: string; date: string; statut: string };

function Contenu() {
  const params = useSearchParams();
  const [liste, setListe] = useState<Ins[]>([]);
  const [monte, setMonte] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [aVerifier, setAVerifier] = useState<Ins | null>(null);
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

  // SI ON VIENT DE WHATSAPP, ON OUVRE LA FICHE TOUT SEUL
  useEffect(() => {
    if (!monte) return;
    const idParam = params.get("valider");
    if (!idParam) return;
    const trouve = liste.find(i => i.id === Number(idParam));
    if (trouve) { setAVerifier(trouve); return; }
    // Si pas trouvé (parent sur un autre téléphone), on crée avec les infos du lien
    const p = params.get("parent"); const e = params.get("enfant");
    if (p && e) {
      const nouvelle: Ins = { id: Number(idParam), parent: p, enfant: e, age: params.get("age") || "?", sexe: params.get("sexe") || "Garçon", niveau: params.get("niveau") || "CP", tel: params.get("tel") || "", message: "Via WhatsApp - Lien", date: "Aujourd'hui", statut: "En attente" };
      setListe(prev => [nouvelle, ...prev]);
      setAVerifier(nouvelle);
    }
  }, [monte, liste, params]);

  const ajouterDepuisWhatsApp = () => {
    if (!parent.trim() || !enfant.trim()) { alert("Mets le nom du parent et de l'enfant !"); return; }
    const nouvelle: Ins = { id: Date.now(), parent, enfant, age: age || "?", sexe, niveau, tel, message: "Via WhatsApp", date: "Aujourd'hui", statut: "En attente" };
    setListe([nouvelle, ...liste]);
    setParent(""); setEnfant(""); setAge(""); setTel(""); setShowForm(false);
  };

  const valider = (id: number) => {
    setListe(liste.map(i => i.id === id ? { ...i, statut: "Validé ✅" } : i));
    setAVerifier(null);
    alert("✅ OK ! Inscription validée !");
  };

  const refuser = (id: number) => {
    if (!confirm("Refuser ?")) return;
    setListe(liste.filter(i => i.id !== id));
    setAVerifier(null);
  };

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
            <div className="flex gap-2"><input value={age} onChange={e => setAge(e.target.value)} placeholder="Âge - Ex: 6" type="number" className="flex-1 border rounded-xl p-3" /><select value={sexe} onChange={e => setSexe(e.target.value)} className="flex-1 border rounded-xl p-3"><option>Garçon</option><option>Fille</option></select></div>
            <div className="flex gap-2"><select value={niveau} onChange={e => setNiveau(e.target.value)} className="border rounded-xl p-3 flex-1"><option>CP</option><option>CE1</option><option>CE2</option><option>CM1</option><option>CM2</option></select><input value={tel} onChange={e => setTel(e.target.value)} placeholder="Tél - 76 376 82 40" className="flex-1 border rounded-xl p-3" /></div>
            <button onClick={ajouterDepuisWhatsApp} className="w-full bg-black text-white py-3 rounded-full font-bold">Ajouter →</button>
          </div>
        )}
        <div className="space-y-3 mt-6">
          {liste.map((ins) => (
            <div key={ins.id} className={`bg-white rounded-2xl p-5 border-2 ${ins.statut.includes("Validé") ? "border-green-300" : "border-orange-200"}`}>
              <p className="font-bold">{ins.sexe === "Fille" ? "👧" : "👦"} {ins.enfant} <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{ins.niveau}</span> <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{ins.age} ans • {ins.sexe}</span></p>
              <p className="text-sm text-gray-600 mt-1">Parent : {ins.parent} • 📞 {ins.tel}</p>
              <div className="flex gap-2 mt-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full self-center ${ins.statut.includes("Validé") ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>{ins.statut}</span>
                <button onClick={() => setAVerifier(ins)} className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-full font-bold text-sm">👁️ Vérifier</button>
                {ins.statut === "En attente" && <button onClick={() => valider(ins.id)} className="flex-1 bg-green-600 text-white py-2 rounded-full font-bold text-sm">✅ Valider</button>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {aVerifier && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-4" onClick={() => setAVerifier(null)}>
          <div className="bg-white w-full max-w-md rounded-3xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center"><p className="font-bold">🔍 Vérifier les informations</p><button onClick={() => setAVerifier(null)} className="bg-gray-100 w-8 h-8 rounded-full">✕</button></div>
            <div className="text-center mt-4"><p className="text-6xl">{aVerifier.sexe === "Fille" ? "👧" : "👦"}</p><p className="font-bold text-lg mt-2">{aVerifier.enfant}</p><p className="text-sm text-gray-500">{aVerifier.niveau} • {aVerifier.age} ans • {aVerifier.sexe}</p></div>
            <div className="space-y-2 mt-5 text-sm bg-gray-50 p-4 rounded-2xl">
              <p><b>Parent :</b> {aVerifier.parent}</p>
              <p><b>Téléphone :</b> {aVerifier.tel}</p>
              <p><b>Âge :</b> {aVerifier.age} ans</p>
              <p><b>Sexe :</b> {aVerifier.sexe}</p>
              <p><b>Niveau :</b> {aVerifier.niveau}</p>
              <p><b>Message :</b> {aVerifier.message}</p>
            </div>
            {aVerifier.statut === "En attente" ? (
              <>
                <button onClick={() => valider(aVerifier.id)} className="w-full bg-green-600 text-white py-4 rounded-full mt-4 font-bold text-lg">✅ OK - Valider l&apos;inscription</button>
                <button onClick={() => refuser(aVerifier.id)} className="w-full bg-red-100 text-red-600 py-3 rounded-full mt-2 font-bold text-sm">🗑️ Refuser</button>
              </>
            ) : <p className="text-center bg-green-50 text-green-700 font-bold p-3 rounded-xl mt-4">✅ Déjà validé</p>}
            <button onClick={() => setAVerifier(null)} className="w-full bg-gray-100 py-3 rounded-full mt-2 font-bold text-sm">Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InscriptionsPage() {
  return <Suspense><Contenu /></Suspense>;
}