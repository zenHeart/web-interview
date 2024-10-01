function findMatchIndex (originArr, matchArr) {
  if (originArr.length < matchArr.length) {
    return null;
  }
  let matchIndex;
  const len = originArr.length - matchArr.length;
  for (let i = 0; i <= len; i++) {
    if (isMatch(originArr.slice(i, matchArr.length + i), matchArr)) {
      return i;
    }
  }
}

function isMatch (arr1, arr2) {
  return arr1.join('') === arr2.join('');
}

console.log(findMatchIndex([1, 2, 3, 5, 8, 7, 6, 5, 9, 1, 1, 6, 9, 8], [5, 8, 7]));
