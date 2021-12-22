const order = class {
  constructor(id, total_amount, items_count, date, items) {
    (this.id = id),
      (this.total_amount = total_amount),
      (this.items_count = items_count),
      (this.date = date),
      (this.items = items);
  }
};

export default order;
