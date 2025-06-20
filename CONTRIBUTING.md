# Contributing to Sidebar App

Thank you for your interest in contributing to Sidebar App! This document provides guidelines and information for contributors.

## Code of Conduct

By participating in this project, you agree to abide by our code of conduct:
- Be respectful and inclusive
- Use welcoming and inclusive language
- Be collaborative
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature or bug fix
4. Make your changes
5. Test your changes thoroughly
6. Submit a pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/sidebar-app.git
cd sidebar-app

# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build
```

## Pull Request Process

1. **Branch Naming**: Use descriptive branch names:
   - `feature/add-new-component`
   - `fix/sidebar-responsive-issue`
   - `docs/update-readme`

2. **Commit Messages**: Write clear, concise commit messages:
   - Use imperative mood ("Add feature" not "Added feature")
   - Keep first line under 50 characters
   - Reference issues when applicable

3. **Code Quality**:
   - Follow the existing code style
   - Add appropriate comments
   - Update documentation if needed
   - Add tests for new features

4. **Testing**: Ensure your changes don't break existing functionality:
   - Run `npm run lint` to check for linting errors
   - Test the application in both development and production builds
   - Verify responsive design works correctly

5. **Documentation**: Update relevant documentation:
   - README.md for new features
   - Component documentation
   - API documentation if applicable

## Issue Reporting

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Screenshots if applicable

## Coding Standards

- **TypeScript**: Use TypeScript for all new code
- **Components**: Follow the existing component structure
- **Styling**: Use Tailwind CSS classes, avoid custom CSS when possible
- **Naming**: Use descriptive names for variables, functions, and components
- **Imports**: Use absolute imports when possible

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # Reusable components
│   ├── ui/       # shadcn/ui components
│   └── ...       # Custom components
├── contexts/      # React contexts
├── hooks/        # Custom hooks
└── lib/          # Utility functions
```

## Questions?

If you have questions about contributing, feel free to:
- Open an issue for discussion
- Start a discussion in the GitHub Discussions tab
- Contact the maintainers

We appreciate your contributions! 