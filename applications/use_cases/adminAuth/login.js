export default function login(email, password, adminRepository, authService, bcryptService) {
    if (!email) {
        const error = new Error('Please enter an email address');
        error.statusCode = 401;
        throw error;
    }

    return adminRepository.findByEmail(email).then(async (adminData) => {
        console.log(adminData)
        if (!adminData) {
            const error = new Error('Admin not found');
            error.statusCode = 401;
            throw error;
        }

        const isPasswordMatch = await bcryptService.comparePassword(password, adminData.password);
        if (!isPasswordMatch) {
            const error = new Error('Password does not match');
            error.statusCode = 401;
            throw error;
        }

        const payloads = {
            admin: {
                id: adminData._id,
                email: adminData.email,
                role: adminData.role
            }
        }
        return authService.generateToken(payloads);
    })
}
