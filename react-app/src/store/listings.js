const GET_ALL = "GET_ALL";
const POST = "listings/POST";
const REVIEW_POST = "reviews/POST";
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
const update = (listing) => ({
  type: UPDATE,
  listing,
});
const remove = (listingId) => ({
  type: DELETE,
  listingId,
});
const postReview = (review) => ({
  type: REVIEW_POST,
  review,
});

export const allListings = () => async (dispatch) => {
  const res = await fetch("/api/listings/");
  const data = await res.json();
  dispatch(getAll(data.listings));
};
export const postListing =
  (video, images, name, description, price, tags) => async (dispatch) => {
    const formData = new FormData();
    if (video) formData.append("video", video);
    images.map((image, i) =>
      image ? formData.append(`image${i + 1}`, image) : null
    );
    formData.append("name", name);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(tags));
    if (price) formData.append("price", price);
    const res = await fetch("/api/listings/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    dispatch(post(data));
  };
export const editListing =
  (video, images, name, description, price, id, tags) => async (dispatch) => {
    const formData = new FormData();
    if (video) formData.append("video", video);
    images.map((image, i) =>
      image ? formData.append(`image${i + 1}`, image) : null
    );
    formData.append("name", name);
    formData.append("description", description);
    if (price) formData.append("price", price);
    formData.append("tags", JSON.stringify(tags));
    const res = await fetch(`/api/listings/${id}/`, {
      method: "PUT",
      body: formData,
    });
    const data = await res.json();
    dispatch(update(data));
  };
export const deleteListing = (listingId) => async (dispatch) => {
  const res = await fetch(`/api/listings/${listingId}/`, { method: "DELETE" });
  const data = await res.json();
  dispatch(remove(listingId));
  return data;
};

export const addReview = (review) => async (dispatch) => {
  let listingId = review.listing_id;
  console.log(review);
  const formData = new FormData();
  formData.append("content", review.content);
  formData.append("rating", review.rating);
  const res = await fetch(`/api/listings/${listingId}/reviews/`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  dispatch(postReview(data));
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL:
      return { ...state, ...action.listings };
    case POST:
      return { ...state, [action.listing.id]: action.listing };
    case REVIEW_POST:
      let newState = { ...state };
      if (newState?.[action.review.listing_id]?.reviews) {
        newState[action.review.listing_id].reviews = [
          ...newState[action.review.listing_id]?.reviews,
          action.review,
        ];
      }
      return newState;
    case UPDATE:
      return { ...state, [action.listing.id]: action.listing };
    case DELETE:
      delete state[action.listingId];
      return { ...state };
    default:
      return state;
  }
}
