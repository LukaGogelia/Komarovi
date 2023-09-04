import dbConnect from "@/data/mongoDb/database";
import { UserInvitation } from "@/data/mongoDb/models";

export default async function saveInvitations(req, res) {
  const { users, familyUsers } = req.body;
  console.log(users, familyUsers);

  if (familyUsers.length) {
    try {
      await dbConnect();

      // Set familyPosition for mother and father
      familyUsers[0].familyPosition = "mother";
      familyUsers[1].familyPosition = "father";

      const motherInvitation = await UserInvitation.create(familyUsers[0]);
      const fatherInvitation = await UserInvitation.create(familyUsers[1]);

      // For children, set their mother, father, and familyPosition fields
      const childrenInvitations = familyUsers.slice(2).map((child) => ({
        ...child,
        mother: motherInvitation._id,
        father: fatherInvitation._id,
        familyPosition: "child",
      }));

      await UserInvitation.insertMany(childrenInvitations);

      // Update mother and father with references to children
      motherInvitation.children = childrenInvitations.map((inv) => inv._id);
      fatherInvitation.children = childrenInvitations.map((inv) => inv._id);
      await motherInvitation.save();
      await fatherInvitation.save();

      res.status(200).json({ message: "Invitations saved successfully." });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error saving invitations.", error: err.message });
    }
  }

  // Save general users
  if (users.length) {
    try {
      for (const user of users) {
        const newUser = new UserInvitation(user);
        await newUser.save();
        res.status(200).json({ message: "Invitations saved successfully." });
      }
    } catch (error) {
      console.error("Error saving a general user:", error);
    }
  }
}
