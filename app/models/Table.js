import { BaseModel } from "./BaseModel";

export class Table extends BaseModel {
  constructor(id, tableNumber, capacity, isAvailable) {
    super(id);
    this.tableNumber = tableNumber;
    this.capacity = capacity;
    this.isAvailable = isAvailable;
  }

  displayTableInfo() {
    return `Table ${this.tableNumber} with capacity of ${
      this.capacity
    } seats. Availability: ${this.isAvailable ? "Available" : "Reserved"}`;
  }
}
