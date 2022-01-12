
const rawToday = new Date();
// const today = rawToday.getFullYear() + "-" + ( rawToday.getMonth() +1 ) + "-" + rawToday.getDate();

let month = (someDate) => {
    const thisMonth = someDate.getMonth() + 1
    if ( thisMonth < 10 )  {

        return "0"+thisMonth
    
    } else {
    
        return thisMonth
    
    }
}

let day = (someDate) => {
    const thisMonth = someDate.getDate()
    if ( thisMonth < 10 )  {

        return "0"+thisMonth
    
    } else {
    
        return thisMonth
    
    }
}

const today = rawToday.getFullYear() + "-" + month(rawToday) + "-" + day(rawToday);


console.log( day(rawToday) );
console.log(today);

// module.exports = {
//     today: today
// }