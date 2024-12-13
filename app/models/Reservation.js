import { BaseModel } from "./BaseModel";

export class Reservation extends BaseModel {
  constructor(id, customerId, tableId, reservationDate, status) {
    super(id);
    this.customerId = customerId;
    this.tableId = tableId;
    this.reservationDate = reservationDate;
    this.status = status;
  }

  displayReservationInfo() {
    return `${this.customerId}, Table ID: ${this.tableId}, Date: ${this.reservationDate}, Status: ${this.status}`;
  }
}
