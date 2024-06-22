import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Token decode edilemedi', Error);
      return null;
    }
  }

  //buralarda try catch bloğuna alıp iyileştirme yapılabilir.

  getUserId(): string {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    const decodedToken: any = this.decodeToken(token);
    if (!decodedToken || !decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']) {
      throw new Error('Token decode edilemedi veya ID bulunamadı');
    }

    const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    return userId;
  }

  getUserEmail():string{
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    const decodedToken: any = this.decodeToken(token);
    if (!decodedToken || !decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']) {
      throw new Error('Token decode edilemedi veya ID bulunamadı');
    }

    const userEmail = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    return userEmail;
  }

  getUserRole()
  {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    const decodedToken: any = this.decodeToken(token);
    if (!decodedToken || !decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) {
      throw new Error('Token decode edilemedi veya ID bulunamadı');
    }

    const userRoles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

 //bu daha sonradan silinebilir sadece consoleda ne yazdığını görmek adına
  // Eğer userRoles bir dizi ise, her bir rolü yazdırmak için
  if (Array.isArray(userRoles)) {
    //userRoles.forEach(role => console.log(role));
  } else {
    // Eğer userRoles tek bir string ise
    //console.log(userRoles);
  }

  return userRoles;
  }
}
