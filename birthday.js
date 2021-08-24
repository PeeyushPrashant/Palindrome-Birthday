function reverseString(str) {
    var charList = str.split('');
    var reverseList = charList.reverse();
    var reverseStr = reverseList.join('');
    return reverseStr;
}

function isPalindrome(str) {
    var reverseStr = reverseString(str);
    return (reverseStr === str);
}

function dateToString(date) {

    var dateStr = { day: '', month: '', year: '' };

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    }

    else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10)
        dateStr.month = '0' + date.month;
    else
        dateStr.month = date.month.toString();

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date) {
    var dateStr = dateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];

}

function checkPalindromeForAllDateFormats(date) {
    var listOfAllFormats = getAllDateFormats(date);

    var flag = false;

    for (var i = 0; i < listOfAllFormats.length; i++) {
        if (isPalindrome(listOfAllFormats[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
    if (year % 400 === 0)
        return true;
    if (year % 100 === 0)
        return false;
    if (year % 4 === 0)
        return true;

    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(date.year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        }
        else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    }

    else {
        if (day > daysOfMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date){
 var ctr=0;
 var nextDate= getNextDate(date);

 while(1)
 {
     ctr++;
     var isPalindrome= checkPalindromeForAllDateFormats(nextDate);
     if(isPalindrome)
       break;
    nextDate= getNextDate(nextDate);
 }
 return [ctr,nextDate];
}


function clickHandler()
{
    var dob= dateInput.value;

    if(dob!='')
    {
        var listOfDate= dob.split('-');
        var date= {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

    var isPalindrome= checkPalindromeForAllDateFormats(date);

    if(isPalindrome){
        Output.innerText= "Yay! your birthday is a palindrome!!";
    }
    else{
        var [ctr,next]=getNextPalindromeDate(date);
        
        Output.innerText= `The next palindrome date is ${next.day} - ${next.month}- ${next.year} ,you missed it by ${ctr} days!`;
    }
    }

}


var dateInput=document.querySelector("#input");
var showButton = document.querySelector("#check-btn");
var Output = document.querySelector("#output");

showButton.addEventListener("click", clickHandler);