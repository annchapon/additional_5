module.exports = function check(str, bracketsConfig) {
	var leftBraces = bracketsConfig.map(x => x[0]);
	var rightBraces = bracketsConfig.map(x => x[1]);
	var stack = [];
  
	for(var i = 0; i < str.length; i++){
		var current = str[i];
		
		if (leftBraces.includes(current) && leftBraces.indexOf(current) !== rightBraces.indexOf(current)){			
			stack.push(current);
		} else if (leftBraces.indexOf(current) === rightBraces.indexOf(current)){
			if(stack.includes(current)){
				var lastLeftBrace = stack.pop();
				if (current !== lastLeftBrace) return false;
			} else {
				stack.push(current);
			}
		} else {
			if (stack.length === 0) return false;
			var lastLeftBrace = stack.pop();
			var currentBraceConfig = bracketsConfig.find(x => x[0] === lastLeftBrace);
			var expectedRightBrace = currentBraceConfig[1];
			if (current !== expectedRightBrace) return false;
		}
	}
	
	return stack.length === 0;
}