/**
 * Litopia API
 * This is the Litopia API an api made to manange player of litopia an lot more !
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { UserEntityMinecraftUser } from './userEntityMinecraftUser';


export interface UserEntity { 
    discordID: string;
    minecraftUser?: UserEntityMinecraftUser | null;
    discordNickname: string;
    discordAvatar: string;
    role: UserEntity.RoleEnum;
    candidature: string;
    candidatureProposalAt: string;
    candidatureAcceptedAt: string;
    lastActivity: string;
}
export namespace UserEntity {
    export type RoleEnum = 'ghost' | 'candidate' | 'pre-accepted' | 'pretopien' | 'litopien' | 'active-litopien' | 'inactive-litopien' | 'ban' | 'refuse' | 'litogod' | 'unique-god';
    export const RoleEnum = {
        Ghost: 'ghost' as RoleEnum,
        Candidate: 'candidate' as RoleEnum,
        PreAccepted: 'pre-accepted' as RoleEnum,
        Pretopien: 'pretopien' as RoleEnum,
        Litopien: 'litopien' as RoleEnum,
        ActiveLitopien: 'active-litopien' as RoleEnum,
        InactiveLitopien: 'inactive-litopien' as RoleEnum,
        Ban: 'ban' as RoleEnum,
        Refuse: 'refuse' as RoleEnum,
        Litogod: 'litogod' as RoleEnum,
        UniqueGod: 'unique-god' as RoleEnum
    };
}


