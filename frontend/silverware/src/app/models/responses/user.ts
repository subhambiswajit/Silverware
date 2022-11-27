export interface User {
    svw_name: string;
    svw_email: string;
    svw_photoUrl?: string;
    svw_firebaseid: string;
    svw_bio: string;
    svw_dob: string;
    svw_address: string;
    svw_city: string;
    svw_province: string;
    svw_postalcode: string;
    svw_telephone: string;
  }


export interface SilverwareSigninResponse {
  svw_token: string,
  user: User
}