import {createAvatar} from "@dicebear/core";
import {botttsNeutral, initials} from "@dicebear/collection";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface GeeneratedAvatarProps {
    seed: string;
    className?: string;
    variant?: 'bottsNeutral' | 'initials';
}

export const GeneratedAvatar = ({ seed, className, variant = 'bottsNeutral' }: GeeneratedAvatarProps) => {
    let avatar;

    if(variant === 'bottsNeutral') {
        avatar = createAvatar(botttsNeutral, {
            seed,
        });
    }
    else {
        avatar = createAvatar(initials, {
            seed,
            fontWeight: 500,
            fontSize: 42
        });
    }

    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar.toDataUri()} alt="Avatar"/>
            <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    )
}