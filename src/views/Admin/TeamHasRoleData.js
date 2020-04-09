export const TeamHasRoleDatas = [
    {teamid: '1', team_has_role_id: '123',status:'active', CreatedAt:'45/45/4564', UpdatedAt:'45/45/4564'},
    {teamid: '2', team_has_role_id: '456',status:'inactive',CreatedAt:'45/45/4564', UpdatedAt:'45/45/4564'},
    {teamid: '3', team_has_role_id: '789',status:'active',CreatedAt:'45/45/4564', UpdatedAt:'45/45/4564'},
    {teamid: '4', team_has_role_id: '156',status:'active',CreatedAt:'45/45/4564', UpdatedAt:'45/45/4564'}
  ]

export let TeamHasRoleData=[]

export const SetTeamHasRoleData = (data) => {
  TeamHasRoleData=data;
}

export const getTeamHasRoleData=(data) => {
  return TeamHasRoleData;
}