
const countdownTraveldate = (travelDate) => {

    // Create a new date instance dynamically with JS
    let currentDate = new Date();
    console.log(currentDate);
    travelDate = new Date(travelDate);
    console.log(travelDate);
    let countdowninmillisecs = travelDate  - currentDate;
    let countdowninHrs = countdowninmillisecs/1000/60/60/24;
    return Math.round(countdowninHrs);
    }
    
export {countdownTraveldate};

