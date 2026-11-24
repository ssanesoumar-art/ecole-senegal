"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Connexion() {
  const router = useRouter();
  const [role, setRole] = useState("eleve");
  const [nom, setNom] = useState("");
  const [niveau, setNiveau] = useState("CP");
  const [code, setCode] = useState("");
  const [erreur, setErreur] = useState("");

  const connecter = () => {
    if (!nom.trim()) { setErreur("⚠️ Écris ton prénom d'abord !"); return; }
    if (role === "prof" && code !== "1234") { setErreur("❌ Code prof incorrect. Essaie : 1234"); return; }
    localStorage.setItem("ecole-user", JSON.stringify({ nom, role, niveau }));
    if (role === "prof") router.push("/enseignant");
    else if (role === "parent") router.push("/");
    else router.push(`/niveau/${niveau.toLowerCase().replace(" ", "-")}`);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] p-6 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow">
        <Link href="/" className="text-sm">← Retour</Link>
        <div className="text-center mt-4">
          <span className="bg-green-600 text-white w-14 h-14 rounded-full inline-flex items-center justify-center text-2xl font-bold">E</span>
          <h1 className="text-2xl font-bold mt-3">Connexion</h1>
          <p className="text-sm text-gray-500">Ecole-Senegal • Yeumbeul</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-6">
          <button onClick={() => setRole("eleve")} className={`py-3 rounded-xl font-bold text-sm ${role === "eleve" ? "bg-green-600 text-white" : "bg-gray-100"}`}>👦 Élève</button>
          <button onClick={() => setRole("prof")} className={`py-3 rounded-xl font-bold text-sm ${role === "prof" ? "bg-purple-700 text-white" : "bg-gray-100"}`}>👩🏾‍🏫 Prof</button>
          <button onClick={() => setRole("parent")} className={`py-3 rounded-xl font-bold text-sm ${role === "parent" ? "bg-blue-600 text-white" : "bg-gray-100"}`}>👨‍👩‍👧 Parent</button>
        </div>
        <label className="block text-sm font-bold mt-6">Ton prénom</label>
        <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Ex: Moussa" className="w-full border rounded-xl p-3 mt-1 outline-none" />
        {role === "eleve" && (<><label className="block text-sm font-bold mt-4">Ton niveau</label>
          <select value={niveau} onChange={e => setNiveau(e.target.value)} className="w-full border rounded-xl p-3 mt-1">
            <option>Moyenne Section</option><option>Grande Section</option><option>CP</option><option>CE1</option><option>CE2</option><option>CM1</option><option>CM2</option>
          </select></>)}
        {role === "prof" && (<><label className="block text-sm font-bold mt-4">Code Prof (test : 1234)</label>
          <input type="password" value={code} onChange={e => setCode(e.target.value)} placeholder="••••" className="w-full border rounded-xl p-3 mt-1 outline-none" /></>)}
        {erreur && <p className="text-sm text-center mt-4 bg-red-50 text-red-600 p-3 rounded-xl">{erreur}</p>}
        <button onClick={connecter} className="w-full bg-black text-white py-3 rounded-full mt-6 font-bold">Entrer →</button>
        <button onClick={() => { localStorage.removeItem("ecole-user"); setNom(""); setCode(""); setErreur("✅ Déconnecté !"); }} className="w-full text-sm text-gray-500 mt-3">Se déconnecter</button>
        <div className="bg-yellow-50 rounded-xl p-4 mt-6 text-sm"><p className="font-bold">💡 Pour tester :</p><p className="mt-1">👦 Élève : <b>Moussa</b> + CP</p><p>👩🏾‍🏫 Prof : <b>Mme Diop</b> + Code <b>1234</b></p></div>
      </div>
    </div>
  );
}