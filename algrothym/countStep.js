function countStep(n) {
	if(n<=3) {
		return n;
	} else {
		return countStep(n-1)+countStep(n-2)+countStep(n-3);
	}

}


console.log(countStep(4))

