import { constant } from "@/configs/constant.config";
import CryptoJS from "crypto-js";
const { secretKey } = constant;

export const hashKey = (key: string) => {
  return CryptoJS.HmacSHA256(key, secretKey).toString();
};

export const encryptData = (data: any): string => {
  const dataStr = JSON.stringify(data);
  const cipherText = CryptoJS.AES.encrypt(dataStr, secretKey).toString();
  return cipherText;
};

export const decryptData = (cipherText: string) => {
  var bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(originalText);
};
