const MarkerModel = require("../../Models/MarkerModel");

let DbMarker = { getMarkers };
module.exports = DbMarker;

async function getMarkers() {
  return markerDataArr.map((marker) => {
    const mm = new MarkerModel();
    mm.UserEmail = marker.user_email;
    mm.State = marker.state;
    mm.MarkerId = marker.marker_id;
    mm.Lat = marker.lat;
    mm.Lng = marker.lng;
    mm.Description = marker.description;
    mm.DatePosted = marker.date_posted;
    mm.Image = marker.image;
    return mm;
  });
}

markerDataArr = [
  {
    user_email: "vincentflores88@gmail.com",
    state: "dirty",
    marker_id: "1",
    lat: 14.63204607870904,
    lng: 121.02621501232493,
    description: "There are a lot of trash in the sewage and it is blocking the flow of water. It also smells really bad and the color of the water is brown",
    date_posted: "12 10 2024",
    image:
      "https://media.philstar.com/photos/2019/01/12/nat1-estero-manila-bay-roy-cimatu-eddgumban_2019-01-12_20-40-02.jpg",
  },
  {
    user_email: "vincentflores88@gmail.com",
    state: "clean",
    marker_id: "2",
    lat: 14.629056365246745,
    lng: 121.02909034038889,
    description: "the water from the faucet looks clean and does not smell of anything. Thank you Maynilad!",

    date_posted: "12 10 2024",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBrIlYtWTm7o-ttgGqPkScjGXQiZBwDvK_Uw&s",
  },
  {
    user_email: "vincentflores88@gmail.com",
    state: "dirty",
    marker_id: "3",
    lat: 14.633208734056646,
    lng: 121.03372519756662,
    description: "The water is old and there are eggs of mosquitos",
    date_posted: "12 10 2024",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0HtpPvgc2sr8eZc4SUwzwAxITPTypk0nFJw&s",
  },
];
