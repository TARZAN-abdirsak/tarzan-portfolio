"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

export interface Testimonial {
  image: string
  name: string
  username: string
  text: string
  social?: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
  className?: string
  title?: string
  description?: string
  maxDisplayed?: number
  loadMoreLabel?: string
}

export function Testimonials({
  testimonials,
  className,
  title = "Read what people are saying",
  description = "Dummy feedback from virtual customers using our component library.",
  maxDisplayed = 6,
  loadMoreLabel = "Load More",
}: TestimonialsProps) {
  const [showAll, setShowAll] = useState(false)

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")?.focus()
  }

  return (
    <div className={className}>
      <div className="flex flex-col items-center justify-center pt-5">
        <div className="flex flex-col gap-5 mb-8">
          <h2 className="text-center text-4xl font-medium text-foreground">{title}</h2>
          <p className="text-center text-muted-foreground">
            {description.split("<br />").map((line, i) => (
              <span key={i}>
                {line}
                {i !== description.split("<br />").length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="relative">
        <div
          className={cn(
            "flex justify-center items-stretch gap-5 flex-wrap",
            !showAll &&
              testimonials.length > maxDisplayed &&
              "pb-20",
          )}
        >
          {testimonials
            .slice(0, showAll ? undefined : maxDisplayed)
            .map((testimonial, index) => (
              <Card
                key={index}
                className="w-80 flex flex-col p-5 relative bg-card border-border shadow-none hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="h-[50px] w-[50px] rounded-full object-cover shrink-0"
                  />
                  <div className="flex flex-col pl-4 min-w-0">
                    <span className="font-semibold text-base text-card-foreground truncate">
                      {testimonial.name}
                    </span>
                    <span className="text-sm text-muted-foreground truncate">
                      {testimonial.username}
                    </span>
                  </div>
                </div>
                <div className="mt-5 mb-2 flex-1">
                  <p className="text-foreground font-medium leading-relaxed">
                    {testimonial.text}
                  </p>
                </div>
                {testimonial.social && (
                  <button
                    type="button"
                    onClick={() => openInNewTab(testimonial.social!)}
                    title="View on Daahqaad"
                    aria-label={`${testimonial.name} on Daahqaad`}
                    className="absolute top-4 right-4 text-foreground hover:opacity-75 transition-opacity"
                  >
                    <Icons.daahqaad className="h-5 w-5" aria-hidden="true" />
                  </button>
                )}
              </Card>
            ))}
        </div>

        {testimonials.length > maxDisplayed && !showAll && (
          <>
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background via-background/80 to-transparent" />
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20">
              <Button
                variant="secondary"
                className="rounded-full border border-border shadow-sm px-6"
                onClick={() => setShowAll(true)}
              >
                {loadMoreLabel}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
