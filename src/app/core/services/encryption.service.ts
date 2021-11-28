import { Injectable } from '@angular/core';

@Injectable()
export class EncryptionService {
  constructor() {}

  encryptVoto(publicKey: any, voto: any) {
    if (publicKey) {
      /*const votoString = JSON.stringify(voto);
      const encryptor = new JSEncrypt();
      encryptor.setPublicKey(publicKey);
      return encryptor.encrypt(votoString);*/
    }
  }
}
