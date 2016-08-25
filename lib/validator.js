(function(windin){
	var validator = {};

	validator.isAlphabet = function(char) {
		var code = char.charCodeAt();
		if (code >= 97 && code <= 122 || code >= 65 && code <= 90) {
			return true;
		} else {
			return false;
		}
	}

	validator.isNumber = function(char) {
		var code = char.charCodeAt();
		if (code >= 48 && code <= 57) {
			return true;
		} else {
			return false;
		}
	}

	validator.isAlphanumeric = function(word){
		debugger
		var res = true;
		for (var i=0; i <word.length; i++) {
				var char = word.charAt(i);
				if (!(validator.isAlphabet(char) || validator.isNumber(char))) {
					res = false;
					break;
				}
		}
		return res;
	}

	// 1.Checks if the input parameter is an email address.
	validator.isEmailAddress = function(email) {
		if (!email) throw "Missing Parameter in isEmailAddress function: 'email'."

		if (typeof email != 'string') {
			return false;
		}
		var atIndex = email.indexOf('@');
		var dotIndex = email.lastIndexOf('.');
		var len = email.length;
		if (atIndex <= 0 || atIndex + 2 > dotIndex || dotIndex > len - 2) {
			return false;
		} else {
			return true;
		}
	};


	//2.Checks if the input parameter is a valid phone number 
	validator.isPhoneNumber = function(phoneNum) {
		if (!phoneNum) throw "Missing Parameter in isPhoneNumber function: 'phoneNum'."
		var numberList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
		phoneNum = phoneNum.toString();

		if (phoneNum.indexOf(numberList[0]) != 0) {
			return false;
		} else if (phoneNum.length != 11) {
			return false;
		}

		for (var i = 0; i < phoneNum.length; i++) {
			if (!numberList.includes(phoneNum.charAt(i))) {
				return false;
			}
		}
		return true;
	};

	//3.Returns the input parameter text with all symbols removed 
	validator.withoutSymbols = function(str) {
		if (!str) throw "Missing Parameter in withoutSymbols function: 'str'."
			//a ~ z 97~122,A~Z 65~90 0~9 48~57
		var newStr = "";

		for (var i = 0; i < str.length; i++) {
			var code = str.charAt(i).charCodeAt();
			if (code >= 97 && code <= 122 || code >= 65 && code <= 90 || code >= 48 && code <= 57 || code == 32) {
				newStr += str.charAt(i);
			}
		}

		return newStr;
	};

	//4.Checks if the input parameter text is a valid date. 
	validator.isDate = function(input) {
		if (!input) throw "Missing Parameter in isDate function: 'input'."

		let d;
		if (typeof input === "string") {
			d = new Date(input);
		} else if (input instanceof Date) {
			d = input;
		}

		return !isNaN(d);
	};

	//5.Checks if the input parameter is a date that comes after the reference date. 
	validator.isBeforeDate = function(input, reference) {
		if (!input) throw "Missing Parameter in isBeforeDate function: 'input'."
		if (!reference) throw "Missing Parameter in isBeforeDate function: 'reference'."

		if (!validator.isDate(input)) throw "Input is not Date."
		if (!validator.isDate(reference)) throw "Reference is not Date."

		var date1;
		if (typeof input === "string") {
			date1 = new Date(input);
		} else if (input instanceof Date) {
			date1 = input;
		}

		var date2;
		if (typeof reference === "string") {
			date2 = new Date(reference);
		} else if (reference instanceof Date) {
			date2 = reference;
		}

		if (date2.getTime() - date1.getTime() > 0) {
			return true;
		} else {
			return false;
		}
	};

	//6.Checks if the input parameter is a date that comes before the reference date. 
	validator.isAfterDate = function(input, reference) {
		if (!input) throw "Missing Parameter in isBeforeDate function: 'input'."
		if (!reference) throw "Missing Parameter in isBeforeDate function: 'reference'."

		if (!validator.isDate(input)) throw "Input is not Date."
		if (!validator.isDate(reference)) throw "Reference is not Date."

		var date1;
		if (typeof input === "string") {
			date1 = new Date(input);
		} else if (input instanceof Date) {
			date1 = input;
		}

		var date2;
		if (typeof reference === "string") {
			date2 = new Date(reference);
		} else if (reference instanceof Date) {
			date2 = reference;
		}

		if (date2.getTime() - date1.getTime() < 0) {
			return true;
		} else {
			return false;
		}
	};

	//7.Checks if the input parameter is a date that comes before today. 
	validator.isBeforeToday = function(input) {
		if (!input) throw "Missing Parameter in isBeforeToday function: 'input'."

		if (!validator.isDate(input)) throw "Input is not Date."

		let d;
		if (typeof input === "string") {
			d = new Date(input);
		} else if (input instanceof Date) {
			d = input;
		}
		var today = new Date();

		if (today.getTime() - d.getTime() > 0) {
			return true;
		} else {
			return false;
		}
	};

	//8.Checks if the input parameter is a date that comes after today. 
	validator.isAfterToday = function(input) {
		if (!input) throw "Missing Parameter in isAfterToday function: 'input'."

		if (!validator.isDate(input)) throw "Input is not Date."

		let d;
		if (typeof input === "string") {
			d = new Date(input);
		} else if (input instanceof Date) {
			d = input;
		}
		var today = new Date();
		today.setHours(0);
		today.setMinutes(0);
		today.setSeconds(0);
		if (today.getTime() - d.getTime() < 0) {
			return true;
		} else {
			return false;
		}
	};

	//9.Checks the input parameter and returns true if it is an empty string
	validator.isEmpty = function(input) {
		if (!input || typeof input == 'undefined') {
			return true;
		} else if (input.toString().trim().length == 0) {
			return true;
		} else {
			return false;
		}
	};

	//10.Checks if the input text parameter contains one or more of the words within the words array.
	validator.contains = function(input, words) {
		var subStr = input.split(' ');
		var res = [];
		var preFlag = false;
		var endFlag = false;
		subStr.forEach(function(e) {
			words.forEach(function(c) {
				var pos = e.indexOf(c);
				preFlag = false;
				endFlag = false;

				if (e === c) {
					preFlag = true;
					endFlag = true;
				} else {
					if (pos > 0 && !validator.isAlphabet(e.charAt(pos - 1)) || pos == 0) {
						preFlag = true;
					}
					if (e.length - pos == c.length || (pos + c.length - 1) < e.length && !validator.isAlphabet(e.charAt(pos + c.length))) {
						endFlag = true;
					}
				}
				if (preFlag && endFlag) {
					res.push(true);
				}
			});
		});
		return res.length > 0;
	};

	//11.Checks if the input text parameter does not contain any of the words within the words array. 
	validator.lacks = function(input, words) {
		var subStr = input.split(' ');
		var res = [];
		var preFlag = false;
		var endFlag = false;
		subStr.forEach(function(e) {
			words.forEach(function(c) {
				var pos = e.indexOf(c);
				preFlag = false;
				endFlag = false;

				if (e === c) {
					preFlag = true;
					endFlag = true;
				} else {
					if (pos > 0 && !validator.isAlphabet(e.charAt(pos - 1)) || pos == 0) {
						preFlag = true;
					}
					if (e.length - pos == c.length || (pos + c.length - 1) < e.length && !validator.isAlphabet(e.charAt(pos + c.length))) {
						endFlag = true;
					}
				}
				if (preFlag && endFlag) {
					res.push(true);
				}
			});
		});
		return res.length == 0;
	};

	//12.Checks that the input text parameter contains only strings found within the strings array.
	validator.isComposedOf = function(input, strings) {
		var temp = input;
		strings.forEach(function(e) {
			var len;
			do{
				len = temp.length;
				temp = temp.replace(e,'');
			}while(len != temp.length);
		});
		return temp.trim().length == 0;
	};

	//13.Checks if the input parameter’s character count is less than or equal to the n parameter.
	validator.isLength = function(input, n) {
		if (!input) throw "Missing Parameter in isLength function: 'input'."
		var len = input.length;
		return len <= n;
	};

	//14.Checks if the input parameter’s character count is greater than or equal to the n parameter.
	validator.isOfLength = function(input, n) {

		if (!input){
			return false;
		}
		var len = input.length;
		return len >= n;
	};

	//15.Counts the number of words in the input parameter. Refer to the definition of word used in the description of the .contains function above.
	validator.countWords = function(input) {
		if (!input) throw "Missing Parameter in countWords function: 'input'."
		
		var res = [];
		var word = '';

		for (var i=0; i <input.length; i++) {
			var char = input.charAt(i);
			if (validator.isAlphabet(char) || validator.isNumber(char)) {
				word += char;
			}else if(word.length>0){
				res.push(word);
			}
		}

		return res.length;
	};

	//16.Checks if the input parameter has a word count less than or equal to the n parameter.
	validator.lessWordsThan = function(input,n) {
		return validator.countWords(input) <= n;
	};

	//17.Checks if the input parameter has a word count greater than or equal to the n parameter.
	validator.moreWordsThan = function(input,n) {
		return validator.countWords(input) >= n;
	};

	//18.Checks that the input parameter matches all of the following
	validator.isBetween = function(input, floor, ceil) {
		return input>=floor && input <= ceil;
	};

	//19.Checks that the input parameter string is only composed of the following characters: a—z, A—Z, or 0—9. 
	validator.isAlphanumeric = function(input) {
		var res = true;
		for (var i=0; i <input.length; i++) {
			var char = input.charAt(i);
			if (!(validator.isAlphabet(char) || validator.isNumber(char))) {
				res = false;
				break;
			}
		}
		return res;
	};

	//20.Checks if the input parameter is a credit card or bank card number. 
	validator.isCreditCard = function(input) {
		var res = true;
		var sub = input.split('-');
		if(sub.length == 4){
			sub.forEach(function(e){
				if(!validator.isAlphanumeric(e)){
					res = false;
				}
			});
		}else if(input.length == 16) {
			for (var i=0; i <input.length; i++) {
				var char = input.charAt(i);
				if (!validator.isAlphanumeric(char)) {
					res = false;
					break;
				}
			}
		}else{
			res = false;
		}
		return res;
	};

	//21.Checks if the input string is a hexadecimal color, such as #3677bb.
	validator.isHex = function(input) {
		var alphabets = ['A','B','C','D','E','F'];
		if(input.indexOf('#') != 0 || input.length > 7){
			return false;
		}
		var subStr = input.slice(1).toLocaleUpperCase();
		var res = true;
		for(var i=0;i<subStr.length;i++){
			if(! (validator.isNumber(subStr.charAt(i)) || alphabets.includes(subStr.charAt(i)))){
				res = false;
				break;
			}
		}
		return res;
	};

	//22.Checks if the input string is an RGB color, such as rgb(200, 26, 131). 
	validator.isRGB = function(input) {
		var temp = input.trim().toLocaleUpperCase();;

		if(temp.indexOf('RGB') != 0){
			return false;
		}

		var str = temp.slice(4,a.length-1);
		var subStr = str.split(',');
		if(subStr.length > 3){
			return false;
		}

		var res = true;
		for(var i=0;i<subStr.length;i++){
			if(parseInt(subStr[i])<0 || parseInt(subStr[i])>255){
				res = false;
				break;
			}
		}
		return res;
	};

	//23.Checks if the input string is an HSL color
	validator.isHSL = function(input) {
		var temp = input.trim().toLocaleUpperCase();;

		if(temp.indexOf('HSL') != 0){
			return false;
		}

		var str = temp.slice(4,a.length-1);
		var subStr = str.split(',');
		if(subStr.length > 3){
			return false;
		}

		var res = true;
		if(parseInt(subStr[0])<0 || parseInt(subStr[0])>360){
				res = false;
		}

		if(parseFloat(subStr[1])<0 || parseFloat(subStr[1])>1 || parseFloat(subStr[2])<0 || parseFloat(subStr[2])>1){
				res = false;
		}
		
		return res;
	};

	//24.Checks if the input parameter is a hex, RGB, or HSL color type.
	validator.isColor = function(input) {
		if(validator.isHex(input) || validator.isRGB(input) || validator.isHSL(input)){
			return true;
		}else{
			return false;
		}
	};

	//25.Checks if the input parameter has leading or trailing whitespaces or too many spaces between words. 
	validator.isTrimmed = function(input) {
		if(input.length != input.trim().length){
			return false;
		}
		var sub = input.split(' ');
		var len = 0;
		sub.forEach(function(e){
			len += e.length;
		});
		if(input.length != len+sub.length-1){
			return false;
		}else{
			return true;
		}
	};

	window.validator = validator;
})(window);