

// Write a PHP and JS function that returns whether the first character in a string is alphanumeric
function isFirstCharAlphanumeric(string) {
    // dont accept anything that is not a string
    if(typeof(string) != 'string') {
        return false;
    }

    // get first character
    var firstChar = string.charAt(0);
    var regex = /^[0-9a-zA-Z]+/;
    return regex.test(firstChar);
}

/**
 * Write a JS function that determines the missing element in an array containing all integers except for one between 1 and N
 */
function getMissingNumber(input) {
    // calulate sum of input array
    var arraySum = input.reduce((total, num) => {
        return total + num
    })
    // add one because we know this is a missing value
    var potentialLength = input.length + 1;
    var potentialSum = 0;

    // add up all numbers of the potential length
    // if length is 4 add 4 + 3 + 2 + 1
    while(potentialLength > 0) {
        potentialSum += potentialLength;
        potentialLength--;
    }
    // subtract the calculated sum with the sum of the array
    return potentialSum - arraySum
}
