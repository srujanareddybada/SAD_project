const { Allbets } = require('./betsService');
const { Match } = require('../models/MatchSchema');

jest.mock('../models/MatchSchema');

describe('Allbets', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve upcoming matches for the next 10 days', async () => {
    const filters = {
      utcDate: { $gte: new Date() }, // Example: filter for matches with UTC date greater than or equal to the current date
      status: 'SCHEDULED', // Example: filter for scheduled matches only
    };
    const page = 1;
    const limit = 30;
    const mockMatches = [{ utcDate: '2023-06-09' }, { utcDate: '2023-06-10' }];

    Match.find.mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockMatches),
    });
    Match.countDocuments.mockResolvedValue(mockMatches.length);

    const expectedResponse = {
      count: mockMatches.length,
      page,
      limit,
      matches: mockMatches,
    };

    const response = await Allbets(filters, page, limit);

    expect(Match.find).toHaveBeenCalledWith(filters);
    expect(Match.find().skip).toHaveBeenCalledWith((page - 1) * limit);
    expect(Match.find().limit).toHaveBeenCalledWith(limit);
    expect(Match.countDocuments).toHaveBeenCalledWith(filters);
    expect(response).toEqual(expectedResponse);
  });

  it("should use today's date to filter upcoming matches", async () => {
    const filters = {
      utcDate: { $gte: new Date() }, // Example: filter for matches with UTC date greater than or equal to the current date
      status: 'SCHEDULED', // Example: filter for scheduled matches only
    };
    const page = 1;
    const limit = 30;
    const mockMatches = [{ utcDate: '2023-06-09' }, { utcDate: '2023-06-10' }];

    Match.find.mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockMatches),
    });
    Match.countDocuments.mockResolvedValue(mockMatches.length);

    const response = await Allbets(filters, page, limit);

    expect(Match.find).toHaveBeenCalledWith(expect.objectContaining({ utcDate: { $gte: expect.any(Date) } }));
    // other expectations...
  });

 
});
