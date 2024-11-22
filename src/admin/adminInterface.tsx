"use client";

import { useState, useEffect, useCallback } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import type { DataStructure } from "~/utils/dataStructure";
import { renderEditField } from "./renderEditField";
import { DeployDialog } from "./DeployDialog";
import { PreviewPane } from "./PreviewPane";
import { EmailManagementDialog } from "./emailManagementDialog";
import { fetchFullContent } from "~/utils/pageUtils";
// import initalContent from "~/content.json";

export default function AdminInterface() {
  const [data, setData] = useState<DataStructure | null>(null);
  const [activePage, setActivePage] = useState("landing");
  const [sliderPosition, setSliderPosition] = useState(33);
  const [isDragging, setIsDragging] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  useEffect(() => {
    async function loadFullContent() {
      const fullContent = await fetchFullContent();
      if(!fullContent) {
        throw new Error("Failed to load full content");
      }
      return fullContent;
    }

    loadFullContent()
      .then((fullContent) => {
        setData(fullContent);
      })
      .catch((error) => {
        console.error("Error loading full content:", error);
        setData(null);
      });
  }, []);

  const handleEdit = (path: string, value: any) => {
    setData((prev) => setNestedValue(prev, path, value));
  };

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newPosition = (e.clientX / window.innerWidth) * 100;
        setSliderPosition(Math.max(10, Math.min(90, newPosition)));
      }
    },
    [isDragging],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <div className="flex items-center justify-between border-b p-4">
        <DeployDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          isDeploying={isDeploying}
          setIsDeploying={setIsDeploying}
          data={data}
        />
        <EmailManagementDialog
          isOpen={isEmailDialogOpen}
          setIsOpen={setIsEmailDialogOpen}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ScrollArea
          className="border-r"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="space-y-8 p-8">
            <ScrollArea className="w-full">
              <div className="flex flex-wrap pb-4">
                {["landing", "aeroAdvantage", "students", "parents"].map(
                  (
                    page, // Change this to page names
                  ) => (
                    <Button
                      key={page}
                      onClick={() => setActivePage(page)}
                      variant={activePage === page ? "default" : "outline"}
                      className="m-2"
                    >
                      {page.charAt(0).toUpperCase() + page.slice(1)}
                    </Button>
                  ),
                )}
              </div>
            </ScrollArea>
            {data &&
              renderEditField(
                `${activePage}`,
                data[activePage as keyof typeof data],
                handleEdit,
              )}
            {renderEditField("components", data.components, handleEdit)}
          </div>
        </ScrollArea>

        <div
          className="w-1 cursor-col-resize bg-gray-300 hover:bg-gray-400 active:bg-gray-500"
          onMouseDown={handleMouseDown}
        />

        <PreviewPane
          data={data}
          activePage={activePage}
          width={100 - sliderPosition}
        />
      </div>
    </div>
  );
}

function setNestedValue(obj: any, path: string, value: any) {
  const newObj = { ...obj };
  const parts = path.split(".");
  const last = parts.pop()!;
  const target = parts.reduce((acc, part) => acc[part], newObj);
  target[last] = value;
  return newObj;
}
