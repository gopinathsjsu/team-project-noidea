export const getContextRdx = (state) => state.context;

export const getUserIdRdx = (state) => getContextRdx(state).userId;
export const getUserTypeRdx = (state) => getContextRdx(state).userType;
