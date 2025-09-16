import { WIDTH_BREAKPOINTS } from "../constants/breakpoints";

export const camelToKebab = (str) =>
  str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

export const getCalendarMatrix = (date) => {
  if (!date) return;

  const numDaysOfWeek = 7;
  const calendarRows = 6;

  // date = new Date(2025, 5, 23);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const firstWeekday = getWeekday(new Date(year, month - 1, 1));
  const lastDay = getLastDay(year, month);

  const [prevMonthYear, prevMonth] = getPrevMonth(year, month);
  const prevMonthLastDay = getLastDay(prevMonthYear, prevMonth);

  const [nextMonthYear, nextMonth] = getNextMonth(year, month);

  const iterations = numDaysOfWeek * calendarRows;

  let acc = 0;
  let accPrevMonth = prevMonthLastDay - firstWeekday;
  let loopMonth = month;
  let loopYear = year;
  let matrix = [[]];
  for (let i = 0; i < iterations; i++) {
    const rowIndex = Math.floor(i / numDaysOfWeek);
    const colIndex = i % numDaysOfWeek;

    if (!matrix[rowIndex]) matrix[rowIndex] = [];
    if (i >= firstWeekday) {
      if (acc === lastDay) {
        acc = 0;
        loopMonth = nextMonth;
        loopYear = nextMonthYear;
      }
      acc += 1;
      matrix[rowIndex][colIndex] = new Date(loopYear, loopMonth - 1, acc);
    } else {
      accPrevMonth += 1;
      matrix[rowIndex][colIndex] = new Date(
        prevMonthYear,
        prevMonth - 1,
        accPrevMonth
      );
    }
  }

  return matrix;
};

export const getMonthStr = (date) => {
  if (!date) return;
  const month = date.toLocaleString("es-MX", { month: "long" });
  return month;
};

export const getLastDay = (year, month) => {
  if (!year || !month) return;

  // const nextMonth = month % 12;
  let newDate;
  if (month === 12) newDate = new Date(year + 1, 0, 0); // December case
  else newDate = new Date(year, month, 0);
  const lastDay = newDate.getDate();
  return lastDay;
};

export const getPrevMonth = (year, month) => {
  let prevYear = year;
  let prevMonth = month;
  if (month === 1) {
    prevMonth = 12;
    prevYear -= 1;
  } else prevMonth -= 1;

  return [prevYear, prevMonth];
};

export const getNextMonth = (year, month) => {
  let nextYear = year;
  let nextMonth = month;
  if (month === 12) {
    nextMonth = 1;
    nextYear += 1;
  } else nextMonth += 1;

  return [nextYear, nextMonth];
};

export const convertStrToDate = (date) => {
  if (!date) return;
  const [year, month, day] = date
    .split("-")
    .map((dateElement) => parseInt(dateElement));

  const newDate = new Date(year, month - 1, day);
  return newDate;
};

export const formatDate = (date, type = "Month DD, YYYY") => {
  if (!date) return;
  if (typeof date === "string") date = convertStrToDate(date);

  let newDate;
  switch (type) {
    case "Month DD, YYYY":
      {
        const formatted = date.toLocaleDateString("es-MX", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const [day, month, year] = formatted
          .split("de")
          .map((word) => word.trim());
        const monthFormatted =
          month[0].toUpperCase() + month.slice(1).toLocaleLowerCase();

        newDate = `${monthFormatted} ${day}, ${year}`;
      }
      break;
    case "YYYY-MM-DD":
      newDate = date.toISOString().slice(0, 10);
      break;
    default:
      console.error(`No type ${type} in formatDate function`);
      break;
  }

  return newDate;
};

export const getWeekday = (date) => {
  if (!date) return;

  const weekday = (date.getDay() + 6) % 7;
  return weekday;
};

export const addDays = (date, days) => {
  /*
  Adds N days (in milliseconds) to a date.
  Example: 7 days
  7 days × 24 hours/day = 168 hours  
  168 × 60 = 10,080 minutes  
  10,080 × 60 = 604,800 seconds  
  604,800 × 1000 = 604,800,000 milliseconds
  */
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
};

export const subtractDays = (date, days) => {
  /*
  Similar to addDays but it subtracts
  */
  return new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
};

export const convertQueryParamToDict = (
  queryParam,
  firstSeparator,
  secondSeparator
) => {
  if (!queryParam) return;
  return Object.fromEntries(
    queryParam.split(firstSeparator).map((sortKey) => {
      const [key, sortDirection] = sortKey.split(secondSeparator);
      return [key, sortDirection];
    })
  );
};

export const convertQueryParamToArray = (
  queryParam,
  firstSeparator,
  secondSeparator
) => {
  if (!queryParam) return;
  return queryParam.split(firstSeparator).map((sortKey) => {
    const [key, sortDirection] = sortKey.split(secondSeparator);
    return [key, sortDirection];
  });
};

export const convertStrToCurrency = (number) => {
  let num = number;

  if (typeof num === "number") {
    num = num.toString();

    if (number < 1000 && !num.includes(".")) return `${num}.00`;
    if (number < 1000 && num.includes(".")) {
      const integerPart = num.split(".")[0];
      const fractionalPart = num.split(".")[1];
      if (fractionalPart.length < 2) return `${integerPart}.${fractionalPart}0`;
    }
  }

  num = num.replace(/[.,]/g, "");

  let currency = num;
  if (num.length < 3) {
    currency = `0.${num.padStart(2, "0")}`;
  } else {
    const fractionalPart = num.slice(-2);
    let integerPart = num.slice(0, -2);
    const integerPartLength = integerPart.length;

    let iter = 1;
    let index = integerPartLength - 3;
    let thousands = Math.floor(integerPartLength / 3);
    const modulo = Math.floor(integerPartLength % 3);
    if (modulo === 0) thousands -= 1;
    while (thousands > 0) {
      index = index - 3 * (iter - 1);
      // console.log(`
      //   iter: ${iter},
      //   index: ${index},
      //   thousands: ${thousands},
      //   integerPart: ${integerPart},
      //   `);
      integerPart = insertCharAt(integerPart, index, ",");
      thousands -= 1;
      iter += 1;
    }

    currency = `${integerPart}.${fractionalPart}`;
  }

  // console.log(`
  //   number: ${number},
  //   currency: ${currency},
  //   `);

  return currency;
};

export function insertCharAt(str, index, char) {
  return str.slice(0, index) + char + str.slice(index);
}

export default async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");

  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    return null;
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  // return croppedCanvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, "image/jpeg");
  });
}

export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export function scrollToTop(topCoordinate) {
  requestAnimationFrame(() => {
    window.scrollTo({ top: topCoordinate, behavior: "auto" });
  });
  return;
}

export function getDateShortcut(dateStr) {
  if (!dateStr) return;

  // const date = new Date("2025-08-30");
  const date = convertStrToDate(dateStr);
  const today = getMexicoCityTodayDate();

  // negative = today < date
  // positive = today > date
  // 0 = today === date
  const diff = getDiffInDays(today, date);
  const absDiff = Math.abs(diff);
  if (diff === 0) return "Hoy";
  if (diff < 0) {
    // negative = today < date
    if (absDiff === 1) return "Mañana";
    if (absDiff === 7) return `Próxima semana`;
    if (absDiff === 14) return `En 2 semanas`;
    if (absDiff === 21) return `En 3 semanas`;
    // if (absDiff === 28) return `Próximo mes`;
    // if (absDiff >= 29) return "En más de 1 mes";
    return `En ${absDiff} días`;
  } else {
    // positive = today > date
    if (absDiff === 1) return "Ayer";
    if (absDiff === 7) return `Semana Pasada`;
    if (absDiff === 14) return `Hace 2 semanas`;
    if (absDiff === 21) return `Hace 3 semanas`;
    // if (absDiff === 28) return `Mes Pasado`;
    // if (absDiff >= 29) return "Hace más de 1 mes";
    return `Hace ${absDiff} días`;
  }
}

export function getMexicoCityTodayDate() {
  return convertStrToDate(
    new Date().toLocaleString("en-CA", {
      timeZone: "America/Mexico_City",
    })
  );
}

export function getDiffInDays(date1, date2) {
  // date1 - date2 = you get the difference in milliseconds between them.
  // 1000 * 60 * 60 * 24 = 86_400_000 ms in one day
  return Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
}

export function getDaysLeft(dateStr) {
  if (!dateStr) return;

  // const date = new Date("2025-08-30");
  const date = convertStrToDate(dateStr);
  const today = getMexicoCityTodayDate();

  // negative = today < date
  // positive = today > date
  // 0 = today === date
  const diff = getDiffInDays(today, date);
  return diff;
}

export function convertArrayToObjBasedOnKey(arr, key) {
  const obj = {};
  for (let i = 0; i < arr.length; i++) {
    const objNoKey = { ...arr[i] };
    delete objNoKey[key];
    obj[arr[i][key]] = objNoKey;
  }

  return obj;
}

export function isEqualObjs(obj1, obj2, ignoreProps = [""]) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = [...new Set(keys1.concat(keys2))];
  const properties = Object.keys(obj1[keys[0]]);

  const copy1 = JSON.parse(JSON.stringify(obj1));
  const copy2 = JSON.parse(JSON.stringify(obj2));
  const sortedObj1 = {};
  const sortedObj2 = {};
  for (const key of keys) {
    sortedObj1[key] = {};
    sortedObj2[key] = {};
    for (const prop of properties) {
      sortedObj1[key][prop] = copy1[key]?.[prop];
      sortedObj2[key][prop] = copy2[key]?.[prop];
    }
  }

  if (ignoreProps.length !== 0) {
    for (const key of keys) {
      for (const prop of ignoreProps) {
        try {
          delete sortedObj1[key][prop];
        } catch (e) {}
        try {
          delete sortedObj2[key][prop];
        } catch (e) {}
      }
    }
    return JSON.stringify(sortedObj1) === JSON.stringify(sortedObj2);
  }
  return JSON.stringify(sortedObj1) === JSON.stringify(sortedObj2);
}

export const device = {
  mobile: WIDTH_BREAKPOINTS.mobile,
  tablet: WIDTH_BREAKPOINTS.tablet,
  desktop: WIDTH_BREAKPOINTS.desktop,
};
