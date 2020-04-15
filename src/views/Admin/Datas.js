export const RoleData = [
    {RoleID: '1',Role:'Admin', RoleStatus:'active'},
    {RoleID: '2',Role:'Accountant',RoleStatus:'active'},
    {RoleID: '3',Role:'Customer Service',RoleStatus:'active'}
  ]



export let TeamHasRoleData=[]

export const SetTeamHasRoleData = (data) => {
  TeamHasRoleData=data;
}

export const getTeamHasRoleData=(data) => {
  return TeamHasRoleData;
}

export let SoulsSettingsData=[]

export const SetSoulsSettingsData = (data) => {
  SoulsSettingsData=data;
}

export const getSoulsSettingsData=(data) => {
  return SoulsSettingsData;
}

export let CommTempelateData=[]

export const SetCommTempelateData = (data) => {
  CommTempelateData=data;
}

export const getCommTempelateData=(data) => {
  return CommTempelateData;
}