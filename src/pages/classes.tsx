"use client";

import React, { useState, useEffect } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Search } from "lucide-react";
import ClassCard from "~/components/cards/classCard";
import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import { PageProps, usePullContent } from "~/utils/pageUtils";

interface Lecture {
  id: number;
  title: string;
  description: string;
  date: string;
  slidesUrl: string;
  videoUrl: string;
  category: string;
}

export default function ClassesPage({ adminContent, adminError }: PageProps) {
  const pullContent = usePullContent(); // Unconditionally call the hook

  const content = adminContent ?? pullContent.content;
  const error = adminError ?? pullContent.error;

  const [categories, setCategories] = useState<{paragraph:string}[] | null>(null);
  const [lectures, setLectures] = useState<Lecture[] | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredLectures, setFilteredLectures] = useState<Lecture[] | null>(null);

  useEffect(() => {
    if (!content) return;

    console.log("Content recieved");
    setCategories(content.classes.categories);
    setLectures(content.classes.classes);
  }, [content]);

  useEffect(() => {
    if(!lectures) return;
    const filterLectures = () => {
      return lectures.filter((lecture) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        const dateObj = new Date(lecture.date);
        const year = dateObj.getFullYear().toString();
        const month = dateObj
          .toLocaleString("en-US", { month: "long" })
          .toLowerCase();
        const day = dateObj.getDate().toString();

        const matchesText =
          lecture.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          lecture.description.toLowerCase().includes(lowerCaseSearchTerm);

        const matchesDate =
          year.includes(lowerCaseSearchTerm) ||
          month.includes(lowerCaseSearchTerm) ||
          day.includes(lowerCaseSearchTerm);

        const matchesCategory =
          selectedCategory === "All" || lecture.category === selectedCategory;

        return (matchesText || matchesDate) && matchesCategory;
      });
    };

    setFilteredLectures(filterLectures());
  }, [lectures, searchTerm, selectedCategory]);

  if (error) {
    // Display a fallback error message if Firestore fetch fails
    return (
      <div className="error-container">
        <h1>Service Unavailable</h1>
        <p>
          We&apos;re experiencing issues retrieving content. Please try again
          later.
        </p>
      </div>
    );
  }

  if (!content || !filteredLectures || !categories) {
    // Loading indicator while content is being fetched
    return (
      <div className="flex items-center justify-center text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-darkPurple p-8 text-white">
        <h1 className="mb-8 text-center text-4xl font-bold text-gold">
          AstroGaels Lectures
        </h1>

        <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
          <div className="relative mb-4 w-full md:mb-0 md:w-1/3">
            <Input
              type="text"
              placeholder="Search lectures..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="z-10 border-gold bg-purple pl-10 text-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gold" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.paragraph}
                onClick={() => setSelectedCategory(category.paragraph)}
                variant={selectedCategory === category.paragraph ? "default" : "outline"}
                className={`${selectedCategory === category.paragraph ? "bg-gold text-darkPurple" : "border-gold text-gold"} hover:bg-gold hover:text-darkPurple`}
              >
                {category.paragraph}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredLectures.map((lecture) => (
            <ClassCard key={lecture.id} lecture={lecture} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
