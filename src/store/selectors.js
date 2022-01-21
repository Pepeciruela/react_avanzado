export const getIsLogged = state => state.auth;

export const getAllAdverts = state => state.adverts;

export const getUi = state => state.ui;

export const getAdvertSelector = (state, advertId) => state.adverts.find(advert => advert.id === advertId);
