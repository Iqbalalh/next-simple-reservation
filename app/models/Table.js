import { BaseModel } from "./BaseModel";

export class Table extends BaseModel {
  constructor(id, tableName, capacity, status) {
    super(id);
    this.tableName = tableName;
    this.capacity = capacity;
    this.status = status;
  }

  displayTableInfo() {
    return `Table ${this.tableName} with capacity of ${
      this.capacity
    } seats. Availability: ${this.status ? "Available" : "Reserved"}`;
  }
}
