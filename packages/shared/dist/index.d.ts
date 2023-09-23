interface Blog {
    title: string;
    id: string;
    amount: number;
}

interface User {
    name: string;
    email: string;
}
interface UserWithID extends User {
    id: number;
}

export { Blog, User, UserWithID };
