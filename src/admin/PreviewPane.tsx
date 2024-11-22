import { ScrollArea } from "~/components/ui/scroll-area";
import AboutUsPage from "~/pages/about";
import ClassesPage from "~/pages/classes";
import LandingPage from "~/pages/LandingPage";
import OpportunitiesPage from "~/pages/opportunities";
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
      case "about":
        return (
          <AboutUsPage adminContent={data}/>
        );
      case "classes":
        return (
          <ClassesPage adminContent={data}/>
        );
      case "oppurtunities":
        return (
          <OpportunitiesPage adminContent={data}/>
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
