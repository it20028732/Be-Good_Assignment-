export function modern(plateNo) {
  //check if provice entered
  var withOutWS = 0;
  var withWS = 0;
  const provinceEntered =
    /^(["SP"|"NW"|"WP"|"UP"|"CP"|"NC"|"SG"|"EP"|"NP"]{2})/.test(plateNo);
  if (provinceEntered) {
    //without variable ammount of whitespace between dashes
    withOutWS =
      /(^..\s[A-Z]{3}(-|\s)([0-9]|-)([0-9]|\s)([0-9]{2}$))|(^..\s[A-Z]{2}(-|\s)([0-9]|-)([0-9]|\s)([0-9]{2}$))/;
    //with variable ammount of whitespace between dashes
    withWS =
      /(^..\s[A-Z]{3}(-|\s)([0-9]|-)([0-9]|\s)([0-9]{4}$))|(^..\s[A-Z]{2}(-|\s)([0-9]|-)([0-9]|\s)([0-9]{4}$))/;
    if (withOutWS.test(plateNo) || withWS.test(plateNo)) {
      return 1;
    } else {
      return -1;
    }
  } else if (!provinceEntered) {
    //without variable ammount of whitespace between dashes
    withOutWS =
      /(^[A-Z]{3}(-|\s)([0-9]|-)([0-9]|\s)([0-9]{2}$))|(^[A-Z]{2}(-|\s)([0-9]|-)([0-9]|\s)([0-9]{2}$))/;
    //with variable ammount of whitespace between dashes
    withWS =
      /(^[A-Z]{3}(-|\s)([0-9]|-)([0-9]|\s)([0-9]{4}$))|(^[A-Z]{2}(-|\s)([0-9]|-)([0-9]|\s)([0-9]{4}$))/;
    if (withOutWS.test(plateNo) || withWS.test(plateNo)) {
      return 1;
    } else {
      return -1;
    }
  }
}