export default class dataBuilder{
    constructor(){

    }
    completedProjects(data = [{project: "Lemin",xp:120,members:[{login:"yorehhali",avatar:"./media/avatar.png"}]}]){
        let nodes = data.map((p) => {

            let projectLine = document.createElement("div");
            projectLine.classList.add("projectGroupData");
    
            let projectName = document.createElement("p");
            projectName.classList.add("projectName");
            projectName.textContent = p.project
    
            let projectXp = document.createElement("div")
            projectXp.classList.add("projectXp");
            projectXp.textContent = p.xp;

            let projectMembers = document.createElement("div");
            projectMembers.classList.add("projectMembers");
            
            p.members.forEach((m) => {
                let member = document.createElement("div");
                member.classList.add("projectMember");
                member.innerHTML = `<img src="${m.avatar}" alt="${m.login}">`;
                projectMembers.appendChild(member);
            })
                
            projectLine.appendChild(projectName);
            projectLine.appendChild(projectXp);
            projectLine.appendChild(projectMembers);
            
        })
        return nodes;


    }
}