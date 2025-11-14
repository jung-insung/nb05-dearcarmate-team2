export interface IBcryptHashUtil {
  hash(password: string): Promise<string>;
  verifyPassword(
    plainPassword: string,
    hashedPasswordFromDB: string,
  ): Promise<boolean>;
}
