module.exports = function (context, option) {
  console.log("Current Context");
  console.log("====================");
  console.log(context);
 
  if (option) {
    console.log("Value");
    console.log("====================");
    console.log(option);
  }
};