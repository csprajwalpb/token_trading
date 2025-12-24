"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./button";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-card rounded-xl border">
                    <AlertTriangle className="h-10 w-10 text-destructive mb-4" />
                    <h2 className="text-lg font-bold mb-2">Something went wrong</h2>
                    <p className="text-muted-foreground mb-4 text-sm max-w-md">
                        {this.state.error?.message || "An unexpected error occurred while rendering this component."}
                    </p>
                    <Button onClick={() => this.setState({ hasError: false, error: null })}>
                        Try again
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}
