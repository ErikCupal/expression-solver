import { tokenize } from '../src/tokenize'
const { log } = console

it('should not throw', () => {

  expect(() => log(tokenize('1 + 2.3 + 3.456'))).not.toThrow()
})