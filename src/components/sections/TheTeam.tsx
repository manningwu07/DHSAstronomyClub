import TeamMemberCard from "../cards/theTeamCard";

interface TeamMember {
  name: string
  position: string
  introduction: string
  imageSrc: string
}

export default function TheTeam({ teamMembers }: { teamMembers: TeamMember[] }) {
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
