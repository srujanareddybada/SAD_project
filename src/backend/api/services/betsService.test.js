const services = require('../../api/services/betsService');

describe('Allbets', () => {
    let dbMock;

    beforeEach(() => {
        dbMock = {
            collection: jest.fn().mockReturnThis(),
            find: jest.fn().mockReturnThis(),
            toArray: jest.fn(),
        };
    });

    it('should retrieve upcoming matches for the next 10 days', async () => {
        const mockMatches = [
            { utcDate: '2023-06-09' },
            { utcDate: '2023-06-10' },
        ];

        dbMock.toArray.mockResolvedValue(mockMatches);

        const result = await services.Allbets(dbMock);

        expect(dbMock.collection).toHaveBeenCalledWith('Upcoming_Matches_10_Days');
        expect(dbMock.find).toHaveBeenCalledWith({ utcDate: { $gt: expect.any(String) } });
        expect(dbMock.toArray).toHaveBeenCalled();
        expect(result).toEqual(mockMatches);
    });

    it('should use today\'s date to filter upcoming matches', async () => {
        const mockMatches = [
            { utcDate: '2023-06-09' },
            { utcDate: '2023-06-10' },
        ];

        dbMock.toArray.mockResolvedValue(mockMatches);

        const result = await services.Allbets(dbMock);

        const todayDate = new Date().toISOString().split('T')[0];

        expect(dbMock.find).toHaveBeenCalledWith({ utcDate: { $gt: todayDate } });
        expect(result).toEqual(mockMatches);
    });
});
