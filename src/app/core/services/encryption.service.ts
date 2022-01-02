import { Injectable } from '@angular/core';
import JSEncrypt from 'jsencrypt';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  constructor() {}

  encryptVoto(publicKey: any, voto: any) : string {
    if (publicKey) {
      const votoString = JSON.stringify(voto);
      const encryptor = new JSEncrypt();
      encryptor.setPublicKey(publicKey);
      const resp = encryptor.encrypt(votoString);
      return (resp ? resp : "");
    }
    return "";
  }
}
