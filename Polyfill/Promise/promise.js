class MyPromise {
  constructor(executorFn) {
    this._state = "pending";

    this._thenCallBackArray = [];
    this._catchCallBackArray = [];
    this._finallyCallBackArray = [];
    this._value = undefined;

    executorFn(this.resolveFn.bind(this), this.rejectFn.bind(this));
  }

  resolveFn(value) {
    this._state = "fulfilled";
    this._value = value;
    this._thenCallBackArray.forEach((cb) => cb(this._value));
    this._finallyCallBackArray.forEach((cb) => cb(value));
    return this;
  }

  rejectFn(value) {
    this._state = "rejected";
    this._value = value;
    this._catchCallBackArray.forEach((cb) => cb(this._value));
    this._finallyCallBackArray.forEach((cb) => cb(value));
    return this;
  }

  then(cb) {
    if (this._state === "fulfilled") {
      cb(this._value);
    } else {
      this._thenCallBackArray.push(cb);
    }
    return this;
  }

  catch(cb) {
    if (this._state === "rejected") {
      cb(this._value);
    } else {
      this._catchCallBackArray.push(cb);
    }
    return this;
  }

  finally(cb) {
    if (this._state === "fulfilled" || this._state === "rejected") {
      cb();
    } else {
      this._finallyCallBackArray.push(cb);
    }
    return this;
  }
}

const wait = new MyPromise((resolveFn, rejectFn) => {
  //   setTimeout(() => {
  //     // resolveFn("Success");
  //     rejectFn("Error");
  //   }, 2000);
  //   rejectFn("Error");
  resolveFn("Data");
});

const hero = wait
  .then((data) => console.log("I have been resolved after 1 second", data))
  .catch((err) => console.log("I have been rejected after 1 second", err))
  .finally(() => console.log("I am finally"));
