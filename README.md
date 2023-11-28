# Hello, World! JavaScript Action

[![GitHub Super-Linter](https://github.com/actions/hello-world-javascript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/hello-world-javascript-action/actions/workflows/ci.yml/badge.svg)

This action prints `Hello, World!` or `Hello, <who-to-greet>!` to the log. To
learn how this action was built, see
[Creating a JavaScript action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action).

## Create Your Own Action

To create your own action, you can use this repository as a template! Just
follow the below instructions:

1. Click the **Use this template** button at the top of the repository
1. Select **Create a new repository**
1. Select an owner and name for your new repository
1. Click **Create repository**
1. Clone your new repository

> [!CAUTION]
>
> Make sure to remove or update the [`CODEOWNERS`](./CODEOWNERS) file! For
> details on how to use this file, see
> [About code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners).

## Usage

Here's an example of how to use this action in a workflow file:

```yaml
name: Example Workflow

on:
  workflow_dispatch:
    inputs:
      who-to-greet:
        description: Who to greet in the log
        required: true
        default: 'World'
        type: string

jobs:
  say-hello:
    name: Say Hello
    runs-on: ubuntu-latest

    steps:
      # Change @main to a specific commit SHA or version tag, e.g.:
      # actions/hello-world-javascript-action@e76147da8e5c81eaf017dede5645551d4b94427b
      # actions/hello-world-javascript-action@v1.2.3
      - name: Print to Log
        id: print-to-log
        uses: actions/hello-world-javascript-action@main
        with:
          who-to-greet: ${{ inputs.who-to-greet }}
```

For example workflow runs, check out the
[Actions tab](https://github.com/actions/hello-world-javascript-action/actions)!
:rocket:

## Inputs

| Input          | Default | Description                     |
| -------------- | ------- | ------------------------------- |
| `who-to-greet` | `World` | The name of the person to greet |

## Outputs

| Output | Description             |
| ------ | ----------------------- |
| `time` | The time we greeted you |
