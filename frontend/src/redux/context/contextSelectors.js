export const getContextRdx = (state) => state.context;

export const getUserIdRdx = (state) => getContextRdx(state).userId;
export const getUserTypeRdx = (state) => getContextRdx(state).userType;
export const getUserDataRdx = (state) => getContextRdx(state).userData;
export const getHotelDataRdx = (state) => getContextRdx(state).hotelData;
