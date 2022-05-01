export const getHotelData = (state) => state.hotelData;

export const getRoomsRdx = (state) => getHotelData(state).rooms;
export const getBranchesRdx = (state) => getHotelData(state).branches;
export const getAmenitiesRdx = (state) => getHotelData(state).amenities;
