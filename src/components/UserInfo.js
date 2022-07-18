import { Stack } from 'react-bootstrap';
import {FaUser, FaBell} from 'react-icons/fa';
import {Button} from 'react-bootstrap';
function UserInfo({ user, logout }) {
    return (
      <Stack direction="horizontal" gap={2}>
        <span><FaUser/>{user.username}</span>
        <FaBell />
        <Button onClick={logout}> Logout </Button>
      </Stack>
    );
  }
  
  export default UserInfo;