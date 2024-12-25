var myObject = {
  foo: 'bar',
  func: function()  {
    var self = this;
    console.log('outer func:  this.foo = ' + this.foo);
    console.log('outer func:  self.foo = ' + self.foo);
    (function() {
      console.log('inner func:  this.foo = ' + this.foo);
      console.log('inner func:  self.foo = ' + self.foo);
    }());
  }
};
myObject.func();