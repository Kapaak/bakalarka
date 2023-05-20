import { NextApiRequest, NextApiResponse } from "next";

import { createUser, getAllUsers, getUserByEmail, getUserById } from "@/prisma";
import { hashPassword } from "@/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET": {
        if (req.query.id) {
          const id = req.query.id as string;
          const user = await getUserById(id);

          return res.send(user);
        } else {
          const users = await getAllUsers();

          return res.send(users);
        }
      }
      case "POST": {
        //create user
        const { email, name, password } = req.body;

        const hashedPassword = await hashPassword(password);
        //todo -> send verification email and verified:true/false to each user
        const userExists = await getUserByEmail(email);

        if (userExists)
          return res
            .status(409)
            .send({ message: "User with this email already exists!" });

        const user = await createUser(email, name, hashedPassword);

        return res.send(user);
      }
    }
  } catch (e) {
    console.log(e, "err");
  }
};

export default handler;
