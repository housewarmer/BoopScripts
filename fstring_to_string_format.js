/**
	{
		"api":1,
		"name":"fstring to str.format()",
		"description":"Converts a python3 f-string to a python2 compatible str.format().",
		"author":"Em McDonald",
		"icon":"quote",
		"tags":"boop,python3,python2.7,f-string,python"
	}
**/

function main(state) {
	try {
		let input = state.text;
        let tokens = tokenizer(input);
        let newstring = reformat_fstring(input, tokens)

        state.text = newstring;
	}
	catch(error) {
		state.postError("Something strange happened here...")
	}
}

function tokenizer(input_string) {
    let stack = [];
    let tokens = [];
    let token_str = "";

    for (var charIndex in input_string) {
        const char = input_string[charIndex]

        if (char == '{') {
            stack.push(char)
        } else if (char == '}' && stack.length > 0) {
            stack.pop();
            tokens.push(token_str)
            token_str = "";
        }else if (stack.length > 0) {
            token_str += char
        }
    }
    return tokens
}

function reformat_fstring(fstring, tokens) {
    fstring = fstring.replace(/^f/, '')
    for (i in tokens) {
        const token = tokens[i];
        console.log(token)
        fstring = fstring.replace(token, '')
    }
    fstring += `.format(${tokens.join(', ')})`

    return fstring
}
