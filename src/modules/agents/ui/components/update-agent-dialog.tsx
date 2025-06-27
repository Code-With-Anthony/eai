import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";

interface NewAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    inititalValues: AgentGetOne;
}

export const UpdateAgentDialog = ({ open, onOpenChange, inititalValues }: NewAgentDialogProps) => {
    return (
        <ResponsiveDialog
            title="Edit Agent"
            description="Edit the agent details"
            open={open}
            openChange={onOpenChange}
        >
            <AgentForm
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
                initialValues={inititalValues}
            />
        </ResponsiveDialog>
    )
}