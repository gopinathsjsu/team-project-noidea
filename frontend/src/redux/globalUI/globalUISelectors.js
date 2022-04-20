export const getGlobalUIRdx = (state) => state.globalUI;

export const getGUIMessage = (state) => getGlobalUIRdx(state).message;
export const getGUILoading = (state) => getGlobalUIRdx(state).loading;
