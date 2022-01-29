

function helpers() {
  const genderName = (type) => {
    switch (type) {
      case 'm':
        return 'Male';
        break;
      case 'f':
        return 'Female';
        break;
      case 'o':
        return 'Other';
        break;
    }
  };

  const bloodGroup = (id) => {
    switch (id) {
      case 1:
        return 'A+ve';
        break;
      case 2:
        return 'A-ve';
        break;
      case 3:
        return 'B+ve';
        break;
      case 4:
        return 'B-ve';
        break;
      case 5:
        return 'O+ve';
        break;
      case 6:
        return 'O-ve';
        break;
      case 7:
        return 'AB+ve';
        break;
      case 8:
        return 'AB-ve';
        break;
    }
  };

  const getAge = (date_of_birth) => {
    const today = new Date();
    const birthDate = new Date(date_of_birth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };


  const changeDateFormat = (get_date, format) => {
    console.log(get_date, format)
    const date_obj = new Date(get_date);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sepr", "Oct", "Nov", "Dec"
    ];
    const z = {
      M: monthNames[date_obj.getMonth()],
      m: date_obj.getMonth() + 1,
      d: date_obj.getDate(),
      h: date_obj.getHours(),
      a: date_obj.getMinutes(),
      s: date_obj.getSeconds()
    };
    format = format.replace(/(M+|m+|d+|h+|a+|s+)/g, (v) => ((v.length > 1 ? '' : '') + z[v.slice(-1)]));
    return format.replace(/(y+)/g, (v) => date_obj.getFullYear().toString().slice(-v.length));
  };

  const tConvert = (time) => {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      console.log(time)
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      console.log(time)
      time[0] = +time[0] % 12 || 12; // Adjust hours
      console.log(time)
    }
    return time.join(''); // return adjusted time or original string
  }

  return {
    bloodGroup,
    genderName,
    getAge,
    changeDateFormat,
    tConvert
  };


  const changeDateWaiseFormat = (get_date) => {
    const date_obj = new Date(get_date);

  }



}


const helperFunction = helpers();

export default helperFunction;
