export class PNAccount {
  phoneEmail: string;
  name: string;
  publicAddress: string;
  constructor(phoneEmail: string, name: string, publicAddress: string) {
    this.phoneEmail = phoneEmail;
    this.name = name;
    this.publicAddress = publicAddress;
  }

  static parseFrom(params: string): PNAccount {
    return JSON.parse(params) as PNAccount;
  }
}
