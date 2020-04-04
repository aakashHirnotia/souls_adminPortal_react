export const TeamDatas = [
    {id: 1, firstname: 'Owaish',lastname:'Kalim', email:'vkgoyal661@gmail.com', mobile:'84895626565', registered: '2018/01/01', joining :'2019/02/05', role: 'admin', address:'Rajiv bhawan, IIT roorkee, room_no-126, IIT Rorrkee', status: 'Deleted'},
    {id: 2, firstname: 'Viany Kumar',lastname:'Goyal',email:'vkgoyal@qwert', mobile:'84895626565', registered: '2018/01/01', joining :'2019/02/05', role: 'accountant', address:'roorkee', status: 'Inactive'},
    {id: 3, firstname: 'Aakash',lastname:'Hirnotia',email:'vkgoyal@qwert', mobile:'84895626565', registered: '2018/02/01', joining :'2019/02/05', role: 'admin', address:'roorkee', status: 'Active'},
    {id: 4, firstname: 'Ayush',lastname:'Kumar',email:'vkgoyal@qwert', mobile:'84895626565', registered: '2001/05/21', joining :'2019/02/05', role: 'customer care', address:'roorkee', status: 'Inactive'}
  ]
  
  // export default TeamDatas
  

export let TeamData=[]

export const setTeamData = (data) => {
  TeamData=data;
}

export const getTeamData=(data) => {
  return TeamData;
}

