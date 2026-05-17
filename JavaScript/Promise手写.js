class Promisen {
  static PENDING = "待定";
  static FULFILLED = "成功";
  static REJECT = "拒绝";

  constructor(func) {
    this.status = Promisen.PENDING;
    this.result = null;
    this.status = Promisen.PENDING;
    func(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve() {
    if (this.status === Promisen.PENDING) {
      this.status = Promisen.FULFILLED;
      this.status = result;
    }
  }
  reject() {
    if (this.status === Promisen.PENDING) {
      this.status = Promisen.FULFILLED;
      this.status = result;
    }
  }
}

new Promisen();
