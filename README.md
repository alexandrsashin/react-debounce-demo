# React Debounce Demo

A demonstration project showing the use of debounce from lodash in React components with a custom hook implementation.

## Description

The project demonstrates:

- Using `debounce` from the lodash library to optimize function calls
- Managing a timer using React hooks
- Dynamic mounting/unmounting of components
- Changing component styles on interaction
- Custom React hook (`useDebounceCallback`) for reusable debounce logic
- Proper cleanup of debounced functions on component unmount

## Project Structure

### Components

#### App Component

- Displays a timer that counts seconds
- Manages two demo components: `DebouncedAction` and `AdvancedDebouncedAction`
- Implements timer start logic via `handleStart`

#### DebouncedAction Component

- **Start Button**: Starts the timer and changes the component's background color (with a 5-second debounce effect)
- **Unmount Button**: Unmounts the component (timer continues running)
- Debounce logic is encapsulated inside the component

#### AdvancedDebouncedAction Component

- Similar to `DebouncedAction` but uses the custom `useDebounceCallback` hook
- Demonstrates proper cancellation of pending debounced actions on unmount
- Shows best practices for debounce in React

### Custom Hook

#### useDebounceCallback

A reusable hook that creates a debounced version of a callback function with:

- Automatic cleanup on component unmount
- Support for callback updates without resetting the debounce timer
- TypeScript support with proper typing
- Memory-efficient implementation using refs

## Technologies

- React 19
- TypeScript
- Vite
- Lodash (debounce)
- Vitest (testing framework)
- React Testing Library

## Installation and Running

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## How It Works

When you click the "Start" button:

1. The timer starts immediately
2. The background color change happens with a 5-second delay (debounce)
3. If you quickly click the button multiple times, the color will change only once, 5 seconds after the last click

This demonstrates how debounce helps optimize frequent function calls.

### Advanced Features

The `AdvancedDebouncedAction` component showcases:

- **Automatic cleanup**: When you click "Unmount" before the debounce delay expires, the pending action is cancelled
- **Latest callback execution**: If the callback changes during the debounce delay, the most recent version will be executed
- **Memory safety**: No memory leaks or stale closures

## Testing

The project includes comprehensive tests for the `useDebounceCallback` hook covering:

- Basic debounce functionality
- Callback updates during debounce delay
- Reference stability across re-renders
- Proper cleanup on component unmount
- Multiple rapid callback changes

Run tests with: `npm test`
