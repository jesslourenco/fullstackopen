/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function Users({ userList }) {
  return (

    <div>
      <h2>Users</h2>
      <Table size="sm" striped>
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
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                {user.posts.length}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Users;
