function sum1 () {
  let total = 0
  for (let i = 0; i < arguments.length; i++) {
    const element = arguments[i];
    total += element
  }
  return total;
}

function sum2 (...args) {
  let sum = 0
  args.forEach(el => {
    sum += el
  });
  console.log(sum)
}

// console.log(sum1(1, 2, 3, 4, ))
// sum2(1, 2, 3, 4, 5)

Function.prototype.myBind1 = function (ctx) {
  const fn = this;
  console.log(fn);
  const bindArgs = Array.from(arguments).slice(1);
  return function _boundFn() {
    const callArgs = Array.from(arguments);
    return fn.apply(ctx,bindArgs.concat(callArgs));
  }; 
};


Function.prototype.myBind2 = function (ctx, ...bindArgs) {
  return (...callArgs) => this.apply(ctx, bindArgs.concat(callArgs));
};

// function Product(name, price) {
//   this.name = name;
//   this.price = price;
// }

// function Food(name, price) {
//   Product.call(this, name, price);
//   this.category = 'food';
//   console.log(this)
// }

// console.log(new Food('cheese', 5).name);
// // expected output: "cheese"

function curriedSum(numArgs) {
  const numbers = [];

  function _curriedSum(number) {
    numbers.push(number);

    if (numbers.length === numArgs) {
      let total = 0;

      numbers.forEach((n) => { total += n; });

      return total;
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
};

// console.log(curriedSum(3)(1)(2)(4))

Function.prototype.curry = function (numArgs) {
  const numbers = [];
  const fn = this;

  function _currySum(number) {
    numbers.push(number);

    if (numbers.length === numArgs) {
      return fn(...numbers);
    } else {
      return _currySum;
    }
  }
  return _currySum();
}

Function.prototype.curry1 = function (numArgs) {
  const numbers = [];
  const fn = this;
  function _curriedSum(number) {
    numbers.push(number);
    if (numbers.length === numArgs) {
      return fn.apply(null, numbers);
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}

Function.prototype.curry2 = function (numArgs) {
  const numbers = [];
  const _curriedSum = (number) => {
    numbers.push(number);
    if (numbers.length === numArgs) {
      return this(...numbers);
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}