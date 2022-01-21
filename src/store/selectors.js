export const getIsLogged = state => state.auth;

export const getAllAdverts = state => state.adverts.data;

export const areAdvertsLoaded = state => state.adverts.loaded;

export const getAdvertLoad = state => state.adverts.adLoad;

export const getUi = state => state.ui;

export const getAdvertSelector = (state, advertId) => state.adverts.data.find((advert) => advert.id === advertId);

export const getDeleteAdvert = state => state.adverts.deleate;
