import bcrypt from "bcrypt";

export const hash = async (password: string) => bcrypt.hash(password, await bcrypt.genSalt(10));