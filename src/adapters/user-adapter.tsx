import {User, ServerUserInfo} from "../types";

export const userAdapter = (user: ServerUserInfo): User => ({
  id: user.id,
  email: user.email,
  name: user.name,
  avatarUrl: `https://4.react.pages.academy${user.avatar_url}`,
});
