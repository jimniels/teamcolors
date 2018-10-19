/**
 * Take an array of items and return the same array with unique values only
 * [1,2,3,3] -> [1,2,3]
 */
export default function uniq(array) {
  return array.reduce((acc, item) => {
    return acc.includes(item) ? acc : acc.concat(item);
  }, []);
}
