import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { auth } from '@/lib/auth';
import { MeetingIdView } from '@/modules/meetings/ui/views/meeting-id-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

interface Props {
  params: Promise<{
    meetingId: string
  }>;
}

const page = async({params} : Props) => {
  const {meetingId} = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  if(!session) redirect("/sign-in");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState title='Loading Meeting Details' description='This will only take few seconds'/>}>
        <ErrorBoundary fallback={<ErrorState title='Error Occured' description='Something went wrong, please try again in few seconds.' />}>
          <MeetingIdView meetingId={meetingId}/>
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default page