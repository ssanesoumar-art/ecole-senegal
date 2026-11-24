"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TableauInscriptions() {
  const [liste, setListe] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("ecole-inscriptions") || "[]");
    setListe(data);
  }, []);

  const supprimer = (index: number) => {
    if (!confirm("Supprimer cette inscription ?")) return;
    const nouvelle = liste.filter((_, i) => i !== index);
    setListe(nouvelle);
    localStorage.setItem("ecole-inscriptions", JSON.stringify(nouvelle));
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">📝 Tableau Inscriptions - {liste.length} élèves</h1>
          <Link href="/enseignant" className="bg-gray-100 px-4 py-2 rounded-full text-sm font-bold">← Retour</Link>
        </div>

        {liste.length === 0 ? (
          <p className="bg-white rounded-2xl p-8 text-center mt-6 text-gray-500">Aucune inscription pour le moment.<br/>Teste avec la page /inscription</p>
        ) : (
          <div className="bg-white rounded-3xl overflow-hidden mt-6 shadow">
            <table className="w-full text-sm">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="p-3 text-left">Parent</th>
                  <th className="p-3 text-left">Enfant</th>
                  <th className="p-3 text-left">Niveau</th>
                  <th className="p-3 text-left">Téléphone</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {liste.map((ins, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-3 font-bold">{ins.parent}</td>
                    <td className="p-3">{ins.enfant}</td>
                    <td className="p-3"><span className="bg-green-100 px-2 py-1 rounded-full text-xs font-bold">{ins.niveau}</span></td>
                    <td className="p-3"><a href={`https://wa.me/221${ins.telephone.replace(/\s/g,"")}`} target="_blank" className="text-green-600 font-bold">💬 {ins.telephone}</a></td>
                    <td className="p-3 text-xs text-gray-500">{ins.date}</td>
                    <td className="p-3"><button onClick={() => supprimer(i)} className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">Supprimer</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}