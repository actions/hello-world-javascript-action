/**
 * Unit tests for the action's main functionality, src/main.js
 */
const core = require('@actions/core')
const github = require('@actions/github')
const main = require('../src/main')

// Mock the GitHub Actions core library
const infoMock = jest.spyOn(core, 'info').mockImplementation()
const getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
const setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

// Other utilities
const timeRegex = /^\d{2}:\d{2}:\d{2}/

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sets the time output', async () => {
    // Mock the action's inputs
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'who-to-greet':
          return 'World'
        default:
          return ''
      }
    })

    // Mock the action's payload
    github.context.payload = {}

    await main.run()

    expect(runMock).toHaveReturned()
    expect(setOutputMock).toHaveBeenCalledWith('time', expect.any(String))
  })

  it('logs the event payload', async () => {
    // Mock the action's inputs
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'who-to-greet':
          return 'World'
        default:
          return ''
      }
    })

    // Mock the action's payload
    github.context.payload = {
      actor: 'mona'
    }

    await main.run()

    expect(runMock).toHaveReturned()
    expect(infoMock).toHaveBeenCalledWith(
      `The event payload: ${JSON.stringify(github.context.payload, null, 2)}`
    )
  })

  it('sets a failed status', async () => {
    // Mock the action's inputs
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'who-to-greet':
          throw new Error('Something went wrong...')
        default:
          return ''
      }
    })

    // Mock the action's payload
    github.context.payload = {
      actor: 'mona'
    }

    await main.run()

    expect(runMock).toHaveReturned()
    expect(setFailedMock).toHaveBeenCalledWith('Something went wrong...')
  })
})
