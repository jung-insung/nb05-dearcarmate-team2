export interface IBcryptHashManager {
  hash(password: string) : Promise<string>;
  verifyPassword(plainPassword: string, hashedPasswordFromDB: string) : Promise<boolean>;
}

