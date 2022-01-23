import { getAdvertSelector } from './selectors'

describe('getAdvertSelector', () => {
    test('should return an advert', () => {
        const data = [{id:1}, {id:2}]
        const state = {
            adverts : {
                data,
            },
        };
        expect(getAdvertSelector(state, 2)).toEqual(data[1])
    });
    test('should return null', () => {
        const data = [{id:1}, {id:2}]
        const state = {
            adverts : {
                data,
            },
        };
        expect(getAdvertSelector(state, 3)).toBeUndefined()
    });
});