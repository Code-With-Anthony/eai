import { EmptyState } from "@/components/empty-state";

export const ProcessingState = () => {
    return (
        <div className="bg-white rounded-lg px-4 py-5 flex flex-col items-center gap-y-8 justify-center">
            <EmptyState
                image="/processing.svg"
                title="Meeting completed"
                description="This meeting was completed, a summary will appear soon."
            />
        </div>
    )
}