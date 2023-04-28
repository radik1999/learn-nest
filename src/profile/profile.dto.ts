import { UserState } from "./profile.model";

export interface ProfileDTO{
    firstName: string;
    lastName: string;
    state: UserState;
}