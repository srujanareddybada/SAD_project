const Allbets = async (db) => {
    let todayDate = new Date().toISOString().split('T')[0];
    return await db.collection('Upcoming_Matches_10_Days')
        .find({utcDate:{$gt: `${todayDate}`}}).toArray();
}

services = {
  Allbets,
};
module.exports = services;
