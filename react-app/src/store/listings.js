const GET_ALL = "listings/GET_ALL";
const POST = "listings/POST";
const UPDATE = "listings/UPDATE";
const DELETE = "listings/DELETE";

const getAll = (listings) => ({
  type: GET_ALL,
  listings,
});
const post = (listing) => ({
  type: POST,
  listing,
});
const update = (listings) => ({
  type: GET_ALL,
  listings,
});
const remove = (listings) => ({
  type: GET_ALL,
  listings,
});

export const allListings = () => async (dispatch) => {
  const res = await fetch("/api/listings");
  const data = await res.json();
  dispatch(getAll(data.listings));
};
export const postListing =
  (video, images, name, description, price) => async (dispatch) => {
    const formData = new FormData();
    if (video) formData.append("video", video);
    images.forEach((image, i) => formData.append(`image${i + 1}`, image));
    formData.append("name", name);
    formData.append("description", description);
    if (price) formData.append("price", price);
    const res = await fetch("/api/listings/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    dispatch(post(data));
  };
// };
// export const allListings = () => async (dispatch) => {
//   const res = await fetch("/api/listings");
//   const data = await res.json();
//   dispatch(getAll(data));
// };
// export const allListings = () => async (dispatch) => {
//   const res = await fetch("/api/listings");
//   const data = await res.json();
//   dispatch(getAll(data));
// };

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL:
      return { ...state, ...action.listings };
    case POST:
      return { ...state, [action.listing.id]: action.listing };
    default:
      return state;
  }
}
