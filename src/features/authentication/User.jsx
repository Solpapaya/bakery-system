import styled from "styled-components";

const StyledUser = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 15rem;
  /* justify-content: flex-end; */
`;

const Avatar = styled.img`
  display: block;
  width: 2.8rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 1px solid var(--color-brand-300);
  outline-offset: 1px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const UserName = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-gray-700);
`;

const UserJob = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--color-gray-600);
`;

function User() {
  return (
    <StyledUser>
      <Avatar src={"/default-user.jpg"} alt={`Avatar of Dan Sol`} />
      <UserInfo>
        <UserName>Deivid Crack</UserName>
        {/* <UserJob>Crack</UserJob> */}
      </UserInfo>
    </StyledUser>
  );
}

export default User;
