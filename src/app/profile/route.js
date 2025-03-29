export async function GET(req) {
    // Access the decoded user info attached by the middleware
    const user = req.user;

    // Check if the user exists
    if (user) {
        return new Response(
            JSON.stringify({ message: `Welcome, ${user.username}!` }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } else {
        return new Response(
            JSON.stringify({ error: "User not found in token" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }
}
