Function.prototype.myBind =  function myBind(bindThis,...argv) {
	return ()  => {
		this.apply(bindThis,argv)
	};
}


function say() {
	console.log('say',arguments)
}

say.myBind(1,1,2,3,4,45)()
