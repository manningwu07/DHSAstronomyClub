import TeamMemberCard from "../cards/theTeamCard";
import teamMembersJSON from "~/controlContentHere/landingPage/teamMembers.json";

interface TeamMember {
  name: string
  position: string
  introduction: string
  imageUrl: string
}

const teamMembers: TeamMember[] = teamMembersJSON.teamMembers;

export default function TheTeam() {
  return (
    <div className="mx-auto px-4 md:px-8 lg:px-12 container"> 
      <h2 className="mb-12 text-center text-3xl font-bold text-white">
        The Team 
        {/* Change the title however you want */}
      </h2>
      <div className="grid grid-cols-1 gap-16 sm:mx-4 md:grid-cols-2">
        {teamMembers.map((teamMember, index) => (
          <TeamMemberCard key={index} {...teamMember} />
        ))}
      </div>
    </div>
  );
}
