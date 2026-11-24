"use client";
import Link from "next/link";
import { useState } from "react";

const lecons: any = {
  "lecture-1": { titre: "Les voyelles : A E I O U", niveau: "CP - Lecture", contenu: "Les voyelles sont A, E, I, O, U. Exemple : A comme Avion, E comme Éléphant, I comme Ile, O comme Orange, U comme Ustensile.", question: "Quelle lettre est une voyelle ?", options: ["B", "A", "T"], bonne: 1 },
  "lecture-2": { titre: "Les syllabes : BA BE BI", niveau: "CP - Lecture", contenu: "On colle une consonne + une voyelle : B + A = BA, B + E = BE, B + I = BI. Essaie : MA, ME, MI, PA, PE, PI !", question: "B + A = ?", options: ["BE", "BA", "BI"], bonne: 1 },
  "lecture-3": { titre: "Lire mes premiers mots", niveau: "CP - Lecture", contenu: "Avec les syllabes on fait des mots : MA + MA = MAMA, PA + PA = PAPA, BA + BA = BABA. Bravo tu sais lire !", question: "MA + MA = ?", options: ["PAPA", "MAMA", "BEBE"], bonne: 1 },
  "maths-1": { titre: "Compter de 1 à 20", niveau: "CP - Maths", contenu: "On compte : 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 !", question: "Après 9, c'est quoi ?", options: ["8", "10", "11"], bonne: 1 },
  "maths-2": { titre: "Addition simple", niveau: "CP - Maths", contenu: "Addition c'est ajouter : 2 + 3 = 5. Prends 2 doigts + 3 doigts = 5 doigts !", question: "2 + 3 = ?", options: ["4", "5", "6"], bonne: 1 },
  "dec-1": { titre: "Les couleurs", niveau: "Moyenne Section - Découverte", contenu: "Rouge comme la tomate, Bleu comme le ciel, Jaune comme le soleil, Vert comme l'herbe !", question: "Le ciel est de quelle couleur ?", options: ["Rouge", "Bleu", "Jaune"], bonne: 1 },
  "dec-2": { titre: "Les formes", niveau: "Moyenne Section - Découverte", contenu: "Rond comme un ballon, Carré comme une fenêtre, Triangle comme un toit !", question: "Un ballon c'est quelle forme ?", options: ["Carré", "Triangle", "Rond"], bonne: 2 },
  "f1": { titre: "Français - Leçon 1", niveau: "Français", contenu: "On apprend à lire et à écrire en français. Chaque jour un petit pas !", question: "On apprend quoi en Français ?", options: ["À compter", "À lire et écrire", "À dessiner"], bonne: 1 },
  "m1": { titre: "Maths - Leçon 1", niveau: "Maths", contenu: "Les maths c'est compter, ajouter, jouer avec les nombres !", question: "2 + 2 = ?", options: ["3", "4", "5"], bonne: 1 },
};

export default function LeconPage({ params }: any) {
  const [choix, setChoix] = useState<number | null>(null);
  const [resultat, setResultat] = useState<string | null>(null);
  const lecon = lecons[params.id] || lecons["f1"];

  const verifier = () => {
    if (choix === lecon.bonne) setResultat("✅ Bravo ! Bonne réponse ! +10 points");
    else setResultat("❌ Pas grave, réessaie ! Tu vas y arriver.");
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] p-6">
      <Link href="/" className="text-sm">← Retour à l'accueil</Link>
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 mt-4 shadow-sm">
        <p className="text-xs bg-green-100 text-green-700 inline-block px-3 py-1 rounded-full font-bold">{lecon.niveau}</p>
        <h1 className="text-3xl font-bold mt-4">{lecon.titre}</h1>
        <p className="text-gray-600 mt-4 leading-relaxed">{lecon.contenu}</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mt-8">
          <h2 className="font-bold text-lg">🎯 Quiz : {lecon.question}</h2>
          <div className="space-y-2 mt-4">
            {lecon.options.map((opt: string, i: number) => (
              <button key={i} onClick={() => setChoix(i)} className={`w-full text-left border rounded-xl p-3 ${choix === i ? "bg-green-600 text-white border-green-600" : "bg-white"}`}>{opt}</button>
            ))}
          </div>
          <button onClick={verifier} className="w-full bg-black text-white py-3 rounded-full mt-4 font-bold">Vérifier ma réponse</button>
          {resultat && <p className="mt-4 font-bold text-center">{resultat}</p>}
        </div>
      </div>
    </div>
  );
}