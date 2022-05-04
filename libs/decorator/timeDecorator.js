const niceDate = (dt) => {
    return `${dt.toLocaleString("en-IN",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`.replace(/,/ig, ' ').replace(/\s/i, ' -');
  }
  
  const niceTime = (dt) => {
    return `${dt.toLocaleString("en-IN")}`.split(',')[1];
  }

  const getRoundTime = secs => {
    let daysRound = Math.round(secs/86400);
    secs -= daysRound * 86400;
    let hoursRound = Math.round(secs/3600);
   secs-= hoursRound * 3600;
   let minutesRound = Math.round(secs/60);
   secs-= minutesRound * 60;
   let secondsRound = Math.round(secs);
 
    if(daysRound){ 
     return `${daysRound} day${daysRound>=2?'s':''}${hoursRound>0?' '+hoursRound + ' hour' + (hoursRound>=2?'s':''):''}`
    }else if(hoursRound){
     return `${hoursRound} hour${hoursRound>=2?'s':''}${minutesRound>0?' '+minutesRound + ' minute' + (minutesRound>=2?'s':''):''}`
    }else if(minutesRound){
     return `${minutesRound} minute${minutesRound>=2?'s':''}${secondsRound>0?' '+secondsRound + ' second' + (secondsRound>=2?'s':''):''}`
    }else if(secondsRound){
     return `${secondsRound} second${secondsRound>=2?'s':''}`
    }
 }

  module.exports = {niceDate, niceTime, getRoundTime}