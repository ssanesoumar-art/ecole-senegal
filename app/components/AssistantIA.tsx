"use client";
import { useState } from "react";
import { reponseParent } from "../lib/ia";

type Msg = { qui: "moi" | "ia"; texte: string };

export default function AssistantIA() {
  const [ouvert, setOuvert] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { qui: "ia", texte: "Bonjour ! Je suis l'assistante de l'école de Yeumbeul 😊 Vous voulez inscrire votre enfant ? Demandez-moi : prix, horaires, adresse..." }
  ]);
  const [txt, setTxt] = useState("");

  const envoyer = () => {
    if (!txt.trim()) return;
    const question = txt;
    setMsgs([...msgs, { qui: "moi", texte: question }]);
    setTxt("");
    setTimeout(() => {
      setMsgs(prev => [...prev, { qui: "ia", texte: reponseParent(question) }]);
    }, 500);
  };

  return (
    <>
      {/* LE BOUTON ROND EN BAS À DROITE - LÀ OÙ TU AS ENTOURÉ */}
      {!ouvert && (
        <button onClick={() => setOuvert(true)} className="fixed bottom-5 right-5 z-50 w-16 h-16 bg-purple-600 text-white rounded-full shadow-2xl text-3xl flex items-center justify-center animate-bounce">
          🤖
        </button>
      )}

      {ouvert && (
        <div className="fixed bottom-5 right-5 z-50 w-[90vw] max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border">
          <div className="bg-purple-700 text-white p-4 flex justify-between items-center">
            <div><p className="font-bold">🤖 Assistante IA</p><p className="text-xs opacity-80">École de Yeumbeul • En ligne • Répond tout de suite</p></div>
            <button onClick={() => setOuvert(false)} className="bg-white/20 w-8 h-8 rounded-full">✕</button>
          </div>
          <div className="h-72 overflow-y-auto p-4 space-y-3 bg-[#f8f7f4]">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.qui === "ia" ? "bg-white shadow" : "bg-purple-600 text-white ml-auto"}`}>{m.texte}</div>
            ))}
          </div>
          <div className="flex gap-2 p-3 border-t">
            <button onClick={() => setMsgs([...msgs, { qui: "moi", texte: "C'est combien l'inscription ?" }, { qui: "ia", texte: reponseParent("combien inscription") }])} className="text-xs bg-gray-100 px-2 py-1 rounded-full">💰 Prix ?</button>
            <button onClick={() => setMsgs([...msgs, { qui: "moi", texte: "C'est où l'école ?" }, { qui: "ia", texte: reponseParent("où école") }])} className="text-xs bg-gray-100 px-2 py-1 rounded-full">📍 Adresse ?</button>
            <button onClick={() => setMsgs([...msgs, { qui: "moi", texte: "C'est quoi les horaires ?" }, { qui: "ia", texte: reponseParent("horaire") }])} className="text-xs bg-gray-100 px-2 py-1 rounded-full">🕐 Horaires ?</button>
          </div>
          <div className="flex gap-2 p-3 pt-0">
            <input value={txt} onChange={e => setTxt(e.target.value)} onKeyDown={e => e.key === "Enter" && envoyer()} placeholder="Pose ta question..." className="flex-1 border rounded-full px-4 py-2 outline-none text-sm" />
            <button onClick={envoyer} className="bg-purple-700 text-white px-4 rounded-full font-bold">➤</button>
          </div>
          <a href="/inscription" className="block text-center bg-green-600 text-white py-3 font-bold text-sm">📝 Inscrire mon enfant →</a>
        </div>
      )}
    </>
  );
}