//validate modern numbe rplate
export function modern(plateNo) {
  //check if provice entered
  var withOutWS = 0;
  var withWS = 0;
  const provinceEntered =/^(["SP"|"NW"|"WP"|"UP"|"CP"|"NC"|"SG"|"EP"|"NP"]{2})/.test(plateNo);
  if (provinceEntered) {
    //without variable ammount of whitespace between dashes
    withOutWS =/(^..\s[A-Z]{3}(-|\s)([0-9]|-)([0-9]|\s)([0-9]{2}$))|(^..\s[A-Z]{2}(-|\s)([0-9]|-)([0-9]|\s)([0-9]{2}$))/;
    //with variable ammount of whitespace between dashes
    withWS =/(^..\s[A-Z]{3}(-|\s)([0-9]|-)([0-9]|\s)([0-9]{4}$))|(^..\s[A-Z]{2}(-|\s)([0-9]|-)([0-9]|\s)([0-9]{4}$))/;
    if (withOutWS.test(plateNo) || withWS.test(plateNo)) {
      return 1;
    } else {
      return -1;
    }
  } else if (!provinceEntered) {
    //without variable ammount of whitespace between dashes
    withOutWS =/(^[A-Z]{3}(-|\s)([0-9]|-)([0-9]|\s)([0-9]{2}$))|(^[A-Z]{2}(-|\s)([0-9]|-)([0-9]|\s)([0-9]{2}$))/;
    //with variable ammount of whitespace between dashes
    withWS =/(^[A-Z]{3}(-|\s)([0-9]|-)([0-9]|\s)([0-9]{4}$))|(^[A-Z]{2}(-|\s)([0-9]|-)([0-9]|\s)([0-9]{4}$))/;
    if (withOutWS.test(plateNo) || withWS.test(plateNo)) {
      return 1;
    } else {
      return -1;
    }
  }
}
//validate vintage number plate
export function vintage(plateNo) {
  const withWS =/(^[0-9]{2}\s[\u0D80-\u0DFF]{2}...\s[0-9]{4}$)|(^[0-9]\s[\u0D80-\u0DFF]{2}...\s[0-9]{4}$)/
  const withOutWS =/(^[0-9]{2}[\u0D80-\u0DFF]{2}...[0-9]{4}$)|(^[0-9][\u0D80-\u0DFF]{2}...[0-9]{4}$)/
  if (withWS.test(plateNo) || withOutWS.test(plateNo)) {
    return 1;
  } else {
    return -1;
  }
}
export function old(plateNo) {
  const withOutWS=/(^[0-9]{3}-[0-9]{4}$)|(^[0-9]{2}-[0-9]{4}$)/
  const withWS=/(^[0-9]{2}\s-\s[0-9]{4}$)|(^[0-9]{3}\s-\s[0-9]{4}$)/
  if (withWS.test(plateNo) || withOutWS.test(plateNo)) {
    console.log("valid")
    return 1
  } else {
    console.log("invalid")
    return -1
  }
}