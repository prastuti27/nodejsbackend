interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const users: User[] = [
  {
    id: "1",
    firstname: "user1",
    lastname: "1user",
    email: "user1@user.com",
    password: "hashedPassword1",
  },
  {
    id: "2",
    firstname: "user2",
    lastname: "2user",
    email: "user1@user.com",
    password: "hashedPassword2",
  },
];
export default users;
