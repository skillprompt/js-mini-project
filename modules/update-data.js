export function updateData(linksArr = [], dataToEditId, valuesToUpdate) {
  console.log("updating data", dataToEditId, linksArr);

  const indexToEdit = linksArr.findIndex((link) => {
    if (link.id === dataToEditId.toString()) {
      return true;
    } else {
      return false;
    }
  });
  if (indexToEdit > -1) {
    linksArr.splice(indexToEdit, 1, {
      id: dataToEditId.toString(),
      title: valuesToUpdate.title,
      link: valuesToUpdate.link,
    });
  }
}
