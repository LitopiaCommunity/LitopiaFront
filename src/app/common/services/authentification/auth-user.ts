export enum UserRole {
  GHOST = "ghost",
  CANDIDATE = "candidate",
  BAN="ban",
  REFUSED = "refuse",
  LITOPIEN = "litopien",
  ACTIVE_LITOPIEN = "active litopien",
  INACTIVE_LITOPIEN = "inactive litopien",
  LITOGOD = "litogod",
  UNIQUE_GOD = "unique god",
}

export interface logged{
  logged:boolean,
}

export interface User extends logged{
  discordID: string;
  minecraftUUID: string;
  discordNickname: string;
  discordAvatar: string;
  minecraftNickname: string;
  role: UserRole;
  candidature: string;
  candidatureProposalAt:Date;
  candidatureAcceptedAt:Date;
  createdAt: Date;
  updatedAt: Date;
}
