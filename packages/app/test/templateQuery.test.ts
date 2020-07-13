import { template, map } from "lodash";

const mutationCreateActivity = (schedulesId: any[]) => {
    const text = `
        mutation createActivity( $description: String $color:String $name: String){
          createActivity(data:{
            description: $description color: $color name: $name 
            schedules: {connect: [<% map(schedules, function(schedule) { %>{id: "<%- schedule.id %>"} <% }); %>]}
          }){
            id description color name
            schedules{start end day label}
          }
        }
    `;
    const compiled = template(text, {'imports': { 'map': map }})
    return compiled({'schedules': schedulesId});
}

console.log(mutationCreateActivity([{id: 'lsdjflsdjfsdf'}, {id: 'sljdfñlsjñflkwe'}]))
