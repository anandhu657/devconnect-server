import * as bcrypt from 'bcrypt';

export default function bcryptService() {
    const compare = async (password, hash) => await bcrypt.compare(password, hash);

    return {
        compare
    };
}
