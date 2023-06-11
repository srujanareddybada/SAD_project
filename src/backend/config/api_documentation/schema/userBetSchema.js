/**
 * @swagger
 * components:
 *   schemas:
 *     UserBet:
 *       type: object
 *       properties:
 *         betAmount:
 *           type: string
 *           description: The amount of the bet
 *         successBetReturnAmount:
 *           type: string
 *           description: The return amount for a successful bet
 *         betEvent:
 *           type: object
 *           description: Match details associated with the bet
 *         outcome:
 *           $ref: '#/components/schemas/BetOutcomeEnum'
 *           description: win loss or scheduled
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the user bet was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the user bet was last updated
 *       required:
 *         - betAmount
 *         - matchStatus
 *         - createdAt
 *         - updatedAt
 *         - outcome
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserBets:
 *      type: array
 *      items:
 *       $ref: '#/components/schemas/UserBet'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BetBalance:
 *       type: object
 *       properties:
 *         balance:
 *           type: string
 *           description: The amount of the bet
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserBlocked:
 *       type: object
 *       properties:
 *         blocked:
 *           type: boolean
 *           description: to block (true) or unblock (false) the user
 */
