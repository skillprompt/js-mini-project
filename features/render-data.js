/**
 * 4. Render the data
 */

export function renderData(linksArr = []) {
  const dataContainer = document.getElementById("data");

  if (linksArr.length) {
    dataContainer.style.display = "block";
  } else {
    dataContainer.style.display = "none";
  }

  // generate the markup
  let markup = "";

  linksArr
    .filter((link) => {
      if (link.title.length) {
        return true;
      } else {
        return false;
      }
    })
    .forEach((item) => {
      markup += `
      <li>
        <h3>${item.title}</h3>
        <span>
          Link :
          <a href="${item.link}" target="_blank">${item.link}</a>
        </span>
      </li>
    `;
    });

  dataContainer.innerHTML = markup;
}
