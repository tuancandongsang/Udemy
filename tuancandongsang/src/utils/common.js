export async function onkeydownPreventNumber(event, state) {
  const key = event ? event.charCode || event.keyCode : 0;

  // case telephone, add to ( + )
  if (
    event.shiftKey &&
    state === "telephone" &&
    [187, 48, 57, 107].includes(key)
  ) {
    return;
    //   if (key === 187 || key === 48 || key === 57 || key === 107) {
    //     return;
    //   }
  }

  // allow ctr + x, v, c
  if (event.ctrlKey && [67, 88, 86, 65].includes(key)) return false;

  // prevent dot .
  if ([190, 110].includes(key)) return false;

  if (
    !(
      key === 8 ||
      key === 9 ||
      key === 13 ||
      key === 46 ||
      (key >= 35 && key <= 40) ||
      (key >= 48 && key <= 57) ||
      (key >= 96 && key <= 105)
    )
  ) {
    event.preventDefault();
  }
}
