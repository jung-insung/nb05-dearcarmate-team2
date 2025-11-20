export interface IBcryptHashManager {
  hash(password: string): Promise<string>;
  compare(inputValue: string, hashedValueFromDB: string): Promise<boolean>;
}
