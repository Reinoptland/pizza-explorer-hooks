export function toggleSomething(array, input) {
  let newArray;

  if (array.includes(input)) {
    newArray = array.filter(ingredient => ingredient !== input);
  } else {
    newArray = [...array, input];
  }

  return newArray;
}
