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
    state: "clean",
    marker_id: "1",
    lat: 14.63204607870904,
    lng: 121.02621501232493,
    description: `When you land on a sample web page or open an email template and see content beginning with "lorem ipsum," the page creator placed that apparent gibberish there on purpose. Page layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum, also known as placeholder copy, to distinguish which areas on a page will hold advertisements, editorials, and filler before the final written content and website designs receive client approval. Fun Lorem Ipsum text may appear in any size and font to simulate everything you create for your campaigns.`,
    date_posted: "12 10 2024",
    image:
      "https://t3.ftcdn.net/jpg/02/74/06/48/360_F_274064877_Tuq84kGOn5nhyIJeUFTUSvXaSeedAOTT.jpg",
  },
  {
    user_email: "vincentflores88@gmail.com",
    state: "clean",
    marker_id: "2",
    lat: 14.629056365246745,
    lng: 121.02909034038889,
    description: `When you land on a sample web page or open an email template and see content beginning with "lorem ipsum," the page creator placed that apparent gibberish there on purpose. Page layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum, also known as placeholder copy, to distinguish which areas on a page will hold advertisements, editorials, and filler before the final written content and website designs receive client approval. Fun Lorem Ipsum text may appear in any size and font to simulate everything you create for your campaigns.`,

    date_posted: "12 10 2024",
    image:
      "https://t3.ftcdn.net/jpg/02/74/06/48/360_F_274064877_Tuq84kGOn5nhyIJeUFTUSvXaSeedAOTT.jpg",
  },
  {
    user_email: "vincentflores88@gmail.com",
    state: "clean",
    marker_id: "3",
    lat: 14.633208734056646,
    lng: 121.03372519756662,
    description: `When you land on a sample web page or open an email template and see content beginning with "lorem ipsum," the page creator placed that apparent gibberish there on purpose. Page layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum, also known as placeholder copy, to distinguish which areas on a page will hold advertisements, editorials, and filler before the final written content and website designs receive client approval. Fun Lorem Ipsum text may appear in any size and font to simulate everything you create for your campaigns.`,
    date_posted: "12 10 2024",
    image:
      "https://t3.ftcdn.net/jpg/02/74/06/48/360_F_274064877_Tuq84kGOn5nhyIJeUFTUSvXaSeedAOTT.jpg",
  },
];
