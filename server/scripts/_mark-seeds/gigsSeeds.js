const db = require("../../models");

async function createGigs() {
  // find all users
  let users = await db.User.find({});
  // find all setlists
  let setlists = await db.Setlist.find({});
  console.log("all setlists", setlists);
  // create an arary of gig object for each user
  // find the users setlists and use the first one in the gig object
  let gigSeeds = users.map((user) => {
    let userSetlists = setlists.filter((setlist) => {
      return setlist.user.equals(user._id);
    });

    return {
      name: `gig for ${user.username}`,
      user: user,
      setlists: [userSetlists[0]],
    };
  });
  // returns the created gigs promise object
  return db.Gig.create(gigSeeds);
}

async function deleteGigs() {
  // returns the deleted gigs promise object
  return db.Gig.deleteMany();
}

module.exports = {
  createGigs,
  deleteGigs,
};
