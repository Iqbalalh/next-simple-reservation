import { BaseModel } from "./BaseModel";

export class Customer extends BaseModel {
  constructor(id, name, email) {
    super(id);
    this.name = name;
    this.email = email;
  }

  displayInfo() {
    return `${this.name} (${this.email})`;
  }
}
