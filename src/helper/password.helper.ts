import * as bcrypt from 'bcrypt'

const saltRounds: number = 10;

export const hashPassword = async (password: string) => {
  const hash = bcrypt.hashSync(password, saltRounds)

  return hash
}

export const comparePassword = async (password: string, passwordCompare: string) => {
  const compare = bcrypt.compareSync(password, passwordCompare);

  return compare;
}