/**
 * Custom Hook for Typed Redux Dispatch
 * Provides proper TypeScript typing for async thunks
 */

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../app/store';

/**
 * Typed version of useDispatch hook
 * Use this instead of plain useDispatch for better TypeScript support
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();