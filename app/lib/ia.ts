"use client";
import { useState } from "react";
import { reponseParent } from "../lib/ia";
type Msg = { qui: "moi" | "ia"; texte: string };
export default function AssistantIA() {
  const [ouvert, setOuvert] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ qui: "ia", texte: "Bonjour ! Je suis l'assistante de l'école de Yeumbeul 😊 Vous voulez inscrire votre enfant ? Demandez-moi : prix, horaires, adresse..." }]);
  const [txt, setTxt] = useState("");
  const envoyer = () => { if (!txt.trim()) return; const q = txt; setMsgs([...msgs, { qui: "moi", texte: q }]); setTxt(""); setTimeout(() => setMsgs(prev => [...prev, { qui: "ia", texte: reponseParent(q) }]), 500); };
  const rapide = (question: string) => setMsgs([...msgs, { qui: "moi", texte: question }, { qui: "ia", texte: reponseParent(question) }]);
  return <>
    {!ouvert && <button onClick={() => setOuvert(true)} className="fixed bottom-5 right-5 z-50 w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-full shadow-2xl shadow-violet-600/40 text-3xl flex items-center justify-center animate-bounce border-4 border-white">🤖</button>}
    {ouvert && <div className="fixed bottom-5 right-5 z-50 w-[92vw] max-w-sm bg-white rounded-[1.8rem] shadow-2xl overflow-hidden border animate-in">
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-4 flex justify-between items-center"><div className="flex items-center gap-3"><span className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center text-xl">🤖</span><div><p className="font-bold">Assistante IA</p><p className="text-xs opacity-80">● En ligne • Répond tout de suite</p></div></div><button onClick={() => setOuvert(false)} className="bg-white/20 w-8 h-8 rounded-full">✕</button></div>
      <div className="h-72 overflow-y-auto p-4 space-y-3 bg-[#f6f5f0]">{msgs.map((m, i) => <div key={i} className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${m.qui === "ia" ? "bg-white" : "bg-violet-600 text-white ml-auto rounded-br-md"}`}>{m.texte}</div>)}</div>
      <div className="flex gap-2 p-3 overflow-x-auto"><button onClick={() => rapide("C'est combien l'inscription ?")} className="whitespace-nowrap text-xs bg-violet-50 text-violet-700 px-3 py-2 rounded-full font-bold">💰 Prix ?</button><button onClick={() => rapide("C'est où l'école ?")} className="whitespace-nowrap text-xs bg-violet-50 text-violet-700 px-3 py-2 rounded-full font-bold">📍 Adresse ?</button><button onClick={() => rapide("C'est quoi les horaires ?")} className="whitespace-nowrap text-xs bg-violet-50 text-violet-700 px-3 py-2 rounded-full font-bold">🕐 Horaires ?</button></div>
      <div className="flex gap-2 px-3 pb-3"><input value={txt} onChange={e => setTxt(e.target.value)} onKeyDown={e => e.key === "Enter" && envoyer()} placeholder="Pose ta question..." className="flex-1 border rounded-full px-4 py-3 outline-none text-sm bg-gray-50 focus:bg-white" /><button onClick={envoyer} className="bg-violet-600 text-white w-11 h-11 rounded-full font-bold shadow-lg">➤</button></div>
      <a href="/inscription" className="block text-center bg-green-600 text-white py-3.5 font-bold text-sm">📝 Inscrire mon enfant →</a>
    </div>}
  </>;
}