export class ImageUploadResDto {
  public imageUrl: string;

  constructor(url: string) {
    this.imageUrl = url;
  }
}
