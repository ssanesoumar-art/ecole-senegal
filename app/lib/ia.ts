// Petite IA de l'école - Gratuite, sans clé
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
  if (m.includes("fille") || m.includes("garçon") || m.includes("enfant") || m.includes("inscrire") || m.includes("inscription")) return "Super ! Pour inscrire votre fille, cliquez sur le bouton vert en bas : 📝 Inscrire mon enfant. Remplissez le formulaire, Mme Diop va valider. C'est 100% gratuit !";
  if (m.includes("prix") || m.includes("combien") || m.includes("payer")) return "L'inscription est 100% gratuite ici sur le site ! Remplissez le formulaire Inscription, Mme Diop va valider. L'école est à Yeumbeul, Dakar.";
  if (m.includes("où") || m.includes("adresse") || m.includes("yeumbeul") || m.includes("keur massar")) return "L'école est à Yeumbeul / Keur Massar, Dakar. Venez nous voir le matin de 8h à 12h.";
  if (m.includes("horaire") || m.includes("heure") || m.includes("cours")) return "Les cours sont le matin de 8h à 12h, de la Maternelle au CM2.";
  if (m.includes("niveau") || m.includes("classe") || m.includes("cp") || m.includes("ce1") || m.includes("cm2")) return "Nous avons de la Maternelle au CM2 : Maternelle, CP, CE1, CE2, CM1, CM2. Quel âge a votre enfant ? Je vous dis sa classe.";
  if (m.includes("bonjour") || m.includes("salut") || m.includes("salam")) return "Bonjour ! Bienvenue à l'école de Yeumbeul 😊 Comment je peux vous aider ? Vous voulez inscrire votre enfant ?";
  if (m.includes("merci")) return "De rien ! N'hésitez pas si vous avez d'autres questions. Mme Diop est là pour vous. ❤️";
  if (m.includes("whatsapp") || m.includes("numéro") || m.includes("numero") || m.includes("téléphone") || m.includes("telephone")) return "Voici le WhatsApp de Mme Diop : 75 837 65 91. Écrivez-lui directement !";
  return "Merci pour votre message ! Pour inscrire votre enfant, cliquez sur le bouton vert en bas : 📝 Inscrire mon enfant. Ou écrivez à Mme Diop sur WhatsApp au 75 837 65 91.";
}