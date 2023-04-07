export function CheckUserDarkMode(addListner: boolean) {
  const colorSchemeQueryList = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );

  const setColorScheme = (e: MediaQueryListEvent | MediaQueryList) => {
    // console.log(e);

    if (e.matches) {
      // Dark
      document.body.classList.add("dark");
    } else {
      // Light
      document.body.classList.remove("dark");
    }
  };

  setColorScheme(colorSchemeQueryList);

  if (addListner) {
    colorSchemeQueryList.addEventListener("change", setColorScheme);
    console.log("listner added");
  } else {
    colorSchemeQueryList.removeEventListener("change", setColorScheme);
    console.log("listner removed");
  }
}
