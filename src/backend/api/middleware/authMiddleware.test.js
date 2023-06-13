const jwt = require('jsonwebtoken');
// const authMiddleware = require('./authMiddleware');
const { authMiddleware, authAdminMiddleware } = require('./authMiddleware');
require('dotenv').config();

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('authMiddleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {},
      query: {},
      cookies: {},
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if no token is found', () => {
    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'No token found! Provide a valid token',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if the token is invalid', () => {
    req.headers['x-jet-token'] = 'invalid-token';
    jwt.verify.mockImplementation(() => {
      throw new Error();
    });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'No token found! Provide a valid token',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should add the decoded payload to the request object and call next if the token is valid', () => {
    const decodedPayload = {
      id: 1,
      username: 'user1',
    };
    req.headers['authorization'] = 'Bearer valid-token';
  
    jwt.verify.mockImplementation((token, secret) => {
      if (token === 'valid-token' && secret === process.env.SECRET) {
        return decodedPayload;
      }
      throw new Error();
    });
  
    authMiddleware(req, res, next);
  
    expect(jwt.verify).toHaveBeenCalled();
    expect(req.user).toEqual(decodedPayload);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
