import md5 from 'md5'

export default function({ id, email, password }) {
  id = md5(id)
  email = md5(email)
  password = md5(password)
  return md5(id + email + password)
}
