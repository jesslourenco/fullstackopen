/* eslint-disable react/prop-types */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

function UserPage({ matchUser, userList }) {
  const user = matchUser
    ? userList.find((u) => u.id === matchUser.params.id)
    : null;

  if (!user) { // fix error when page is accessed directly
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>posts created by this user:</h3>
      <ul>
        {user.posts.map((post) => (
          <li key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserPage;
