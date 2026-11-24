"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

export interface Testimonial {
  id?: string
  image?: string
  name: string
  username?: string
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
  loading?: boolean
  emptyTitle?: string
  emptyDescription?: string
  emptyActionLabel?: string
  onEmptyAction?: () => void
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function Testimonials({
  testimonials,
  className,
  title = "Read what people are saying",
  description = "Thoughts and experiences shared by people we've worked with.",
  maxDisplayed = 6,
  loadMoreLabel = "Load More",
  loading = false,
  emptyTitle = "No feedback yet",
  emptyDescription = "Be the first to share your thoughts and experience.",
  emptyActionLabel,
  onEmptyAction,
}: TestimonialsProps) {
  const [showAll, setShowAll] = useState(false)

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

      {loading ? (
        <div className="flex justify-center items-stretch gap-5 flex-wrap">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-80 h-44 rounded-lg border border-border bg-card p-5 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="h-[50px] w-[50px] rounded-full bg-muted shrink-0" />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-4 w-28 rounded bg-muted" />
                  <div className="h-3 w-20 rounded bg-muted" />
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-5/6 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="max-w-md mx-auto mt-4">
          <Card className="p-8 text-center bg-card border-border shadow-none">
            <h3 className="text-lg font-semibold text-card-foreground">
              {emptyTitle}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {emptyDescription}
            </p>
            {emptyActionLabel && onEmptyAction && (
              <div className="mt-6">
                <Button
                  type="button"
                  onClick={onEmptyAction}
                  className="rounded-full px-6"
                >
                  {emptyActionLabel}
                </Button>
              </div>
            )}
          </Card>
        </div>
      ) : (
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
                  key={testimonial.id ?? index}
                  className="w-80 flex flex-col p-5 relative bg-card border-border shadow-none hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center pr-7">
                    {testimonial.image ? (
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="h-[50px] w-[50px] rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="h-[50px] w-[50px] rounded-full bg-foreground text-background font-semibold text-sm flex items-center justify-center shrink-0 select-none"
                      >
                        {getInitials(testimonial.name)}
                      </div>
                    )}
                    <div className="flex flex-col pl-4 min-w-0">
                      <span className="font-semibold text-base text-card-foreground truncate">
                        {testimonial.name}
                      </span>
                      {testimonial.username && (
                        <span className="text-sm text-muted-foreground truncate">
                          {testimonial.username}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-5 mb-2 flex-1">
                    <p className="text-foreground font-medium leading-relaxed">
                      {testimonial.text}
                    </p>
                  </div>
                  {testimonial.social && (
                    <a
                      href={testimonial.social}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View on Daahqaad"
                      aria-label={`${testimonial.name} on Daahqaad`}
                      className="absolute top-4 right-4 text-foreground hover:opacity-75 transition-opacity"
                    >
                      <Icons.daahqaad className="h-5 w-5" aria-hidden="true" />
                    </a>
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
      )}
    </div>
  )
}
