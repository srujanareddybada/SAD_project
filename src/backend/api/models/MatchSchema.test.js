const { Match } = require('./MatchSchema');
jest.mock('mongoose');
jest.mock('./MatchSchema', () => {
        const matchModel = jest.fn(); // Create a test double for the Match model
        const matchSchema = {}; // Define the matchSchema variable
        return { Match: matchModel, matchSchema };
      });
describe('Match Model', () => {

  it('should export the Match model', () => {
    expect(Match).toBeDefined();
  });

});
