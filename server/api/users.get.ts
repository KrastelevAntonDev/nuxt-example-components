import type { User } from "../../app/types/user";
export default cachedEventHandler(
  async () => {
    const users = await $fetch<User[]>(
      "https://jsonplaceholder.typicode.com/users"
    );
    return users.map((u) => ({
      id: u.id,
      name: u.name,
      username: u.username,
      email: u.email,
    }));
  },
  {
    swr: true,
    maxAge: 60,
  }
);
