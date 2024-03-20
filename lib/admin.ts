import { auth } from "@clerk/nextjs"

const adminIds = [
    "user_2dl9fR7YoYb0UiwyiZzykNnmtoR",
];

export const isAdmin = () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    return adminIds.indexOf(userId) !== -1;
};
