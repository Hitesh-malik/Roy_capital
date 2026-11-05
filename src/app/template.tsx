import { ViewTransition } from "react";
import { RouteFocus } from "@/components/layout/RouteFocus";

/**
 * Route transitions use the browser View Transitions API via React's
 * <ViewTransition>: the outgoing page fades away and the incoming page rises
 * in (`page-exit` / `page-enter` in globals.css). The header is anchored with
 * its own `viewTransitionName`. Unsupported browsers swap instantly.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>
        <RouteFocus />
        {children}
      </div>
    </ViewTransition>
  );
}
