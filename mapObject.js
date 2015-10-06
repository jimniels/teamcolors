/*
  Map Object Helper
  Example usage:

  mapObject(yourObject, function (key, value) {
    return <div>Key: {key}, Value: {value}</div>;
  })
*/
function mapObject(object, callback) {
  return Object.keys(object).map(function (key) {
    return callback(key, object[key]);
  });
}

module.exports = mapObject;
