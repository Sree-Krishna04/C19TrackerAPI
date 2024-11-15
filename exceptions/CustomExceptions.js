export class InvalidRequestException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
export class ItemNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
