const cartItem = class {
  constructor(id, name, price, quantity, total_amount, image) {
    (this.id = id),
      (this.name = name),
      (this.price = price),
      (this.quantity = quantity),
      (this.total_amount = total_amount),
      (this.image = image);
  }
};

export default cartItem;
