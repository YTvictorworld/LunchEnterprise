window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };
  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
  // why do you need this?
  // to display electron to user?

  // Emm I don't know i forgot that i had this here, nop this is in docs
  //i remember this is in the docs but i dont know what it does cuz i don't like c&p code i don't learn anything

  // this isen't needed right?
  // you can keep it as long as you know the code usage
});
