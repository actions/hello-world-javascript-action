/**
 * Unit tests for the action's main functionality, src/main.js
 */
import { afterEach, beforeEach, jest } from '@jest/globals'
const core = await import('../__fixtures__/core')
const github = await import('../__fixtures__/github')

jest.unstable_mockModule('@actions/core', () => core)
jest.unstable_mockModule('@actions/github', () => github)

const main = await import('../src/main')

describe('action', () => {
  beforeEach(() => {
    // Mock the action's inputs
    core.getInput.mockReturnValueOnce('World')

    // Mock the action's payload
    github.context.payload = {
      actor: 'mona'
    }
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('sets the time output', async () => {
    await main.run()

    expect(core.setOutput).toHaveBeenCalledWith('time', expect.any(String))
  })

  it('logs the event payload', async () => {
    await main.run()

    expect(core.info).toHaveBeenCalledWith(
      `The event payload: ${JSON.stringify(github.context.payload, null, 2)}`
    )
  })

  it('sets a failed status', async () => {
    // Mock a failure
    core.getInput.mockReset().mockImplementation((name) => {
      throw new Error('Something went wrong...')
    })

    await main.run()

    expect(core.setFailed).toHaveBeenCalledWith('Something went wrong...')
  })
})
