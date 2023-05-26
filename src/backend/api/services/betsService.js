
const Allbets = async (db) => {
    return await db.collection('Upcoming_Matches_10_Days')
        .find({}).toArray();
}

services = {
    Allbets
}
module.exports = services