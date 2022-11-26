export interface User {
    svw_name: string;
    svw_email: string;
    svw_photoUrl?: string;
    svw_firebaseid: string
  }

export interface UserDetails {
  user: User
}


export interface SilverwareSigninResponse {
  svw_token: string,
  user: User
}