export default function admin(email, password) {
    return {
        getEmail: () => email,
        getPassword: () => password,
    }
}