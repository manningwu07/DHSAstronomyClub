"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

interface OpportunityCardProps {
  imageUrl?: string;
  title: string;
  description: string;
  className?: string;
}

export default function OpportunityCard({
  imageUrl,
  title,
  description,
  className,
}: OpportunityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className={`w-full max-w-md md:max-w-2xl overflow-hidden bg-darkPurple text-white transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg ${className}`}
    >
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
        </div>
      )}
      <CardContent className="p-4">
        <h3 className="mb-2 text-lg md:text-xl lg:text-2xl font-semibold text-gold">
          {title}
        </h3>
        <div className="relative">
          <p
            className={`text-sm md:text-lg  ${isExpanded ? "" : "line-clamp-4"}`}
          >
            {description}
          </p>
          <div className="md:hidden">
            <Button
              variant="link"
              className="mt-2 text-gold"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Less" : "More"}
            </Button>
          </div>
          <div className="hidden md:block">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="mt-2 text-gold">
                  More
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-darkPurple text-white">
                <DialogHeader>
                  <DialogTitle className="text-gold">{title}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  {imageUrl && (
                    <div className="relative mb-4 h-64 w-full">
                      <Image
                        src={imageUrl}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <p>{description}</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
