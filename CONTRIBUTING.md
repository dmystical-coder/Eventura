# Contributing to Base Event Ticketing Platform

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit and push
7. Create a Pull Request

## Development Setup

See the [README.md](./README.md) for initial setup instructions.

## Project Structure

This is a monorepo using npm workspaces and Turbo:

- `apps/web` - Frontend Next.js application
- `packages/contracts` - Smart contracts
- `packages/wallet` - WalletConnect configuration

## Code Style

- **TypeScript** - Use TypeScript for all new code
- **ESLint** - Follow the ESLint configuration
- **Prettier** - Format code with Prettier before committing

Run linting:
```bash
npm run lint
```

## Smart Contract Development

### Guidelines

1. Follow [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
2. Use OpenZeppelin contracts when possible
3. Add comprehensive NatSpec comments
4. Write tests for all contract functions
5. Consider gas optimization

### Testing

All contract changes must include tests:

```bash
cd packages/contracts
npm run test
```

Aim for >90% test coverage.

### Deployment

Never commit private keys. Use environment variables.

## Frontend Development

### Guidelines

1. Use TypeScript for all components
2. Follow React best practices
3. Use Tailwind CSS for styling
4. Implement responsive design
5. Add proper error handling
6. Include loading states

### Component Structure

```typescript
// Component template
interface ComponentProps {
  // Props here
}

export function Component(props: ComponentProps) {
  // Implementation
  return <div>...</div>;
}
```

### Hooks

Custom hooks should:
- Start with `use` prefix
- Be placed in `src/hooks/`
- Include proper TypeScript types
- Handle loading and error states

## Commit Messages

Use conventional commit format:

```
type(scope): subject

body

footer
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(contracts): add ticket validation logic
fix(web): resolve wallet connection issue
docs(readme): update installation instructions
```

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update the README.md if needed
5. Request review from maintainers

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] No console.log or debug code
- [ ] TypeScript types properly defined
- [ ] Smart contracts tested
- [ ] No security vulnerabilities introduced

## Areas for Contribution

### High Priority

- [ ] Smart contract implementation
- [ ] WalletConnect integration
- [ ] Event creation UI
- [ ] Ticket purchasing flow
- [ ] Test coverage

### Medium Priority

- [ ] Marketplace implementation
- [ ] Organizer dashboard
- [ ] IPFS integration
- [ ] QR code validation

### Nice to Have

- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Social features
- [ ] Mobile app

## Testing

### Smart Contracts

```bash
cd packages/contracts
npm run test
npm run coverage
```

### Frontend

```bash
cd apps/web
npm run test
```

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about implementation
- Clarification on guidelines

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help newcomers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
