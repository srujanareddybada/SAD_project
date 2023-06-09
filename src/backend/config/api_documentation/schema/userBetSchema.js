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
