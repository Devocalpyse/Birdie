import { useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserProvider';
import { Section, Title, Table, Level, Button } from 'reactbulma';

export default function Profile() {
  const { getUser, user } = useContext(UserContext);
  const { userId } = useParams();
  const [profile, setProfile] = useState({});

  function checkUser() {
    if (userId !== user.userId) return;
    return <Button>Edit Profile</Button>;
  }

  useEffect(() => {
    async function fetch() {
      let res = await getUser(userId);
      setProfile(res);
    }
    fetch();
  }, []);

  let { username, firstName, lastName, favoriteColor } = profile;

  return (
    <>
      <Section>
        <Level>
          <Level.Left>
            <Level.Item>
              <Title>
                Welcome to <span className='has-text-primary'>{username}</span>'s profile!
              </Title>
            </Level.Item>
          </Level.Left>
          {userId ==+ user.userId ? (
            <Level.Right>
              <Level.Item>
                <Button>Edit Profile</Button>
              </Level.Item>
            </Level.Right>
          ) : null}
        </Level>

        <hr />

        <Table bordered hoverable className='is-size-4'>
          <Table.Body>
            <Table.Tr>
              <Table.Td>First Name</Table.Td>
              <Table.Td>{firstName}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Last Name</Table.Td>
              <Table.Td>{lastName}</Table.Td>
            </Table.Tr>
            {favoriteColor ? (
              <Table.Tr>
                <Table.Td>Favorite Color</Table.Td>
                <Table.Td>{favoriteColor}</Table.Td>
              </Table.Tr>
            ) : null}
          </Table.Body>
        </Table>
      </Section>
      <Outlet />
    </>
  );
}
