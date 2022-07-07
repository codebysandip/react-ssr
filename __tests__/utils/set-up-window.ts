Object.defineProperty(window.Navigator, "onLine", {
  get() {
    return true;
  },
});

let cookieData = "";
Object.defineProperty(window.document, "cookie", {
  get() {
    return cookieData;
  },
  set(cookieValue) {
    const cookies = cookieData.split("; ");
    const cookieName = cookieValue.split("=").shift();
    const cookieNameLength = cookieName.length;
    let cookieIndex = -1;
    cookies.forEach((value, index) => {
      if (`${value.substr(0, cookieNameLength)}=` === `${cookieName}=`) {
        cookieIndex = index;
      }
    });
    if (cookieIndex > -1) {
      cookies[cookieIndex] = `${cookieValue}`;
    } else {
      cookies.push(`${cookieValue}`);
    }
    cookieData = cookies.join("; ").trim();
  },
});
