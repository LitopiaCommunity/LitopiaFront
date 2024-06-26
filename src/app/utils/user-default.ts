import {UserEntity} from "../apis/litopia-api";

export function getUserName(user: UserEntity | undefined) {
  return user?.minecraftUser?.minecraftNickname || user?.discordNickname || 'Inconnu';
}

export function getProfilePicture(user: UserEntity | undefined) {
  return user?.minecraftUser?.minecraftUUID ?
    `https://mc-heads.net/head/${user.minecraftUser.minecraftUUID}/left` :
    user?.discordAvatar ? `https://cdn.discordapp.com/avatars/${user?.discordID}/${user?.discordAvatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png';
}

export function getMnecraftFullSkin(user: UserEntity | undefined) {
  return user?.minecraftUser?.minecraftUUID ? `https://api.mineatar.io/body/full/${user.minecraftUser.minecraftUUID}?scale=32` : 'https://cdn.discordapp.com/embed/avatars/0.png';
}

export function getRole(user: UserEntity | undefined) {
  switch (user?.role){
    case "ghost":
      return "👻 Ghost";
    case "candidate":
      return "📋 Candidat";
    case "pre-accepted":
      return "🗳️ Pre-Accepted";
    case "pretopien":
      return "🌟 Pretopien";
    case "litopien":
      return "🏅 Litopien";
    case "active-litopien":
      return "🔥 Litopien Actif";
    case "inactive-litopien":
      return "🛌 Litopien Inactif";
    case "ban":
      return "🚫 Bani";
    case "refuse":
      return "❌ Refusé";
    case "litogod":
      return "👼 Litodieux";
    case "unique-god":
      return "🔱 Unique Dieux";
    default:
      return "❓ Unknown Role";
  }
}
