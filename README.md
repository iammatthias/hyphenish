# Hyphenish

Turn your text into secret messages using hyphens and dashes! Inspired by [this clever idea](https://warpcast.com/polluterofminds/0xa819b509).

## What is this?

It's a fun way to encode text:

- Short hyphens (-) are ones
- Long dashes (—) are zeros
- Each letter becomes a pattern of these marks
- Spaces separate each letter's pattern

For example, typing 'hi' turns into something like:
`—-———-— ——-——-—`

## Try it out

1. Clone this repo:

```bash
git clone https://github.com/yourusername/hyphenish.git
cd hyphenish
```

2. Install stuff:

```bash
bun install
```

3. Run it:

```bash
bun run dev
```

Visit `http://localhost:5173` and have fun!

## Tech stuff

Built with:

- [SvelteKit](https://kit.svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Bun](https://bun.sh/)

## Want to help?

Feel free to jump in! Open an issue or PR if you've got ideas.

## License

MIT - do whatever you want with it! See [LICENSE](LICENSE) for the boring details.
