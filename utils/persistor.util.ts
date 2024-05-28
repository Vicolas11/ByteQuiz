import { decryptData, encryptData, hashKey } from "./crypto.util";

export class Persistor {
  constructor() {}

  public static getData(key: string) {
    const hashedKey = hashKey(key);
    const cypherText = localStorage.getItem(hashedKey);
    try {
      if (!cypherText) {
        return null;
      }
      return decryptData(cypherText);
    } catch (error) {
      return null;
    }
  }

  public static setData(key: string, value: any) {
    const hashedKey = hashKey(key);
    const encryptValue = encryptData(value);
    localStorage.setItem(hashedKey, encryptValue);
  }

  public static removeData(key: string) {
    const hashedKey = hashKey(key);
    localStorage.removeItem(hashedKey);
  }
}
