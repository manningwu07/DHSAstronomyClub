import { ScrollArea } from "~/components/ui/scroll-area";
import AeroAdvantage from "~/pages/AeroAdvantage";
import LandingPage from "~/pages/LandingPage";
import ParentsPage from "~/pages/parents";
import StudentsPage from "~/pages/students";
import type { DataStructure } from "~/utils/dataStructure";

interface PreviewPaneProps {
  data: DataStructure;
  activePage: string;
  width: number;
}

export function PreviewPane({data, activePage, width }: PreviewPaneProps) {
  // Change this to page names
  const renderPreview = () => {
    switch (activePage) {
      case "landing":
        return <LandingPage adminContent={data}/>;
      case "aeroAdvantage":
        return (
          <AeroAdvantage adminContent={data}/>
        );
      case "students":
        return (
          <StudentsPage adminContent={data}/>
        );
      case "parents":
        return (
          <ParentsPage adminContent={data}/>
        );
      default:
        return (
          <LandingPage adminContent={data}/>
        );
    }
  };

  return (
    <div className="bg-white" style={{ width: `${width}%` }}>
      <ScrollArea className="h-full">{renderPreview()}</ScrollArea>
    </div>
  );
}
