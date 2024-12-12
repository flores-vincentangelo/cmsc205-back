const responses = require("../Helpers/responsesHelper");
const DbMarker = require("../DataAccess/Database/DbMarker");
const DbAccounts = require("../DataAccess/Database/DbAccounts");

let MarkerRoutes = { getMarkers };
module.exports = MarkerRoutes;

async function getMarkers(req, res, next) {
  const markerArr = await DbMarker.getMarkers();
  const promiseArr = markerArr
    .map((marker) => marker.UserEmail)
    .filter(onlyUnique)
    .map((userEmail) => DbAccounts.getAccountByEmail(userEmail));

  userDetailsArr = await Promise.all(promiseArr);

  finalMarkerArr = markerArr.map(marker => {
    const user = userDetailsArr.find(user => user.Email === marker.UserEmail)
    if (user) {
        return {
            ...marker,
            UserFullName: `${user.FirstName} ${user.LastName}`,
            UserImage: user.Picture
        }
    }
  })
    console.log(finalMarkerArr);
  res.status(200).json({
    markers: markerArr,
    ...responses.OkResponseBuilder("Ok"),
  });
}

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}
