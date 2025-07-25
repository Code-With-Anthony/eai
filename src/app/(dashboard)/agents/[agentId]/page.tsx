import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { AgentIdView } from "@/modules/agents/ui/views/agent-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
    params: Promise<{ agentId: string }>;
};

const Page = async ({ params }: Props) => {
    const { agentId } = await params;

    const querClient = getQueryClient();
    void querClient.prefetchQuery(
        trpc.agents.getOne.queryOptions({
            id: agentId,
        })
    )

    return (
        <HydrationBoundary state={dehydrate(querClient)}>
            <Suspense fallback={<LoadingState title="Loading Agent" description="This may take few seconds" />}>
                <ErrorBoundary fallback={<ErrorState title="Error loading agents" description="Something went wrong" />}>
                    <AgentIdView
                        agentId={agentId}
                    />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default Page;