/* eslint-disable quotes */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllUsers } from '../reducers/usersReducer';

function Users() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (

    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>
              {' '}
              {' '}
              {' '}
            </th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>
                {user.name}
              </td>
              <td>
                {user.posts.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
