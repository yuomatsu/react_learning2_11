import { useState } from "react";
import { UserProfile } from "../types/userProfile";
import axios from "axios";
import { User } from "../types/api/user";

// 全ユーザーを取得するカスタムフック
export const useAllUsers = () => {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setErrror] = useState(false);

  const getUsers = () => {
    setLoading(true);
    setErrror(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfiles(data);
      })
      .catch(() => {
        setErrror(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { getUsers, userProfiles, loading, error };
};
