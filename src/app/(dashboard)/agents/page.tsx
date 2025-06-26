import { LoadingState } from '@/components/loading-state';
import { AgentsView } from '@/modules/agents/ui/views/agents-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import React, { Suspense } from 'react'
import { ErrorState } from '@/components/error-state';

const page = async() => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={
                <LoadingState title='Loading Agents' description='This may take a few seconds' />
            }>
                <ErrorBoundary fallback={<ErrorState title='Error Loading Agents' description='Please try again later' />}>
                    <AgentsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default page