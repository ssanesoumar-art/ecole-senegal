// Petite IA de l'école - Sans clé, sans paiement
export function proposerReponse(question: string, niveau: string): string {
  const q = question.toLowerCase();

  if (q.includes("ba + ba") || q.includes("baba")) return "Bravo ! BA + BA ça fait BABA, comme Papa ! Tu as bien compris, c'est 2 fois BA. 👏";
  if (q.includes("écrire") || q.includes("comment on écrit")) return "On écrit lettre par lettre, doucement. Dis-moi le mot et on l'écrit ensemble. ✏️";
  if (q.includes("pourquoi")) return "Très bonne question ! C'est parce que c'est comme ça que ça marche. On va découvrir ensemble. 🌟";
  if (q.includes("calcul") || q.includes("combien") || q.includes("+") || q.includes("-")) return "On compte ensemble avec les doigts. Montre-moi avec tes doigts, on va y arriver ! 🖐️";
  if (q.includes("lire") || q.includes("lecture")) return "On lit doucement : on coupe le mot en syllabes. BA - BA = BABA. Essaie ! 📖";

  return `Très bonne question ! En ${niveau}, on apprend ça pas à pas. Tu es sur la bonne voie, continue comme ça ! 👏`;
}

export function verifierInscription(age: string, niveau: string, sexe: string): string {
  const a = Number(age);
  if (niveau === "CP" && a >= 5 && a <= 7) return "✅ Parfait ! Âge idéal pour CP.";
  if (niveau === "CP" && a < 5) return "⚠️ Attention : un peu jeune pour CP. Vérifie l'âge avec le parent.";
  if (niveau === "CP" && a > 7) return "⚠️ Attention : un peu grand pour CP. CE1 serait peut-être mieux ?";
  if (niveau === "CE1" && a >= 6 && a <= 8) return "✅ Parfait ! Âge idéal pour CE1.";
  if (niveau === "CM2" && a < 9) return "⚠️ Attention : un peu jeune pour CM2.";
  return "✅ Âge OK pour ce niveau.";
}

export function reponseParent(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("prix") || m.includes("combien") || m.includes("inscription")) return "L'inscription se fait ici sur le site. Remplissez le formulaire, Mme Diop va valider. L'école est à Yeumbeul, Dakar.";
  if (m.includes("où") || m.includes("adresse") || m.includes("yeumbeul")) return "L'école est à Yeumbeul, Dakar. Venez nous voir le matin.";
  if (m.includes("horaire") || m.includes("heure")) return "Les cours sont le matin de 8h à 12h.";
  if (m.includes("bonjour") || m.includes("salut")) return "Bonjour ! Bienvenue à l'école de Yeumbeul. Comment je peux vous aider ? 😊";
  return "Merci pour votre message ! Mme Diop va vous répondre très vite sur WhatsApp.";
}