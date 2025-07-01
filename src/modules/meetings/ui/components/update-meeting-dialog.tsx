import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingGetOne } from "../../types";
import { MeetingForm } from "./meeting-form";

interface UpdateMeetingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    inititalValues: MeetingGetOne;
}

export const UpdateMeetingDialog = ({ open, onOpenChange, inititalValues }: UpdateMeetingDialogProps) => {
    return (
        <ResponsiveDialog
            title="Edit Meeting"
            description="Edit the meeting details"
            open={open}
            openChange={onOpenChange}
        >
            <MeetingForm
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
                initialValues={inititalValues}
            />
        </ResponsiveDialog>
    )
}