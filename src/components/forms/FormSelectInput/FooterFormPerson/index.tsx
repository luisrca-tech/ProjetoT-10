import { Container, PersonByRoleForm, RoleAndPerson } from "./styles";

export function FooterForm() {
  return (
    <Container>
      <RoleAndPerson>
        <span>Pessoa</span>
        <span>Cargo</span>
      </RoleAndPerson>
      <PersonByRoleForm>
        <span>Luis Felipe</span>
        <span>Front-end PL</span>
      </PersonByRoleForm>
      <PersonByRoleForm>
        <span>Luis Felipe</span>
        <span>Front-end PL</span>
      </PersonByRoleForm>
    </Container>
  );
}
