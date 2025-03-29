export async function POST() {
    return new Response(
        JSON.stringify({ message: "User logged out successfully" }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Set-Cookie": "token=; HttpOnly; Secure; Path=/; Max-Age=0",
            },
        }
    );
}
