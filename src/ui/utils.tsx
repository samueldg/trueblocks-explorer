import { useHotkeys } from 'react-hotkeys-hook';
import { useCallback, useState } from 'react';

export const cookieVars = {
  dashboard_current_tab: 'DASHBOARD_CURRENT_TAB',
  explorer_current_tab: 'EXPLORER_CURRENT_TAB',
  names_current_tab: 'NAMES_CURRENT_TAB',
  settings_current_tab: 'SETTINGS_CURRENT_TAB',
  support_current_tab: 'SUPPORT_CURRENT_TAB',
  menu_expanded: 'MENU_EXPANDED',
  status_expanded: 'STATUS_EXPANDED',
  help_expanded: 'HELP_EXPANDED',
};

export const useKeyBindings = (expandedRowKeys: readonly React.ReactText[], setExpandedRowKeys: any) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = useCallback((event) => {
    // Check if the element with querySelector string is
    // in focus, if so, take over the control from here.
    const blurredFrom = event.relatedTarget;
    // const focusedTo = event.target;

    // If the blurredFrom and focusedTo have different parents,
    // then we turn the focused flag on.
    if (blurredFrom === null || blurredFrom.tagName !== 'TR') {
      setIsFocused(true);
    }
  }, []);

  const handleOnBlur = useCallback((event) => {
    const blurredTo = event.relatedTarget;
    // const focusedFrom = event.target;

    // if blurredTo belongs to an element outside the currentDOM tree, then
    // we should mark this element as not-focused
    if (blurredTo === null || blurredTo.tagName !== 'TR') {
      setIsFocused(false);
    }
  }, []);

  // Go to previous row
  const handleUpKey = useCallback(
    (event) => {
      // If activeElement is a TR element or has any of it's parent as TR element, then we must look for next TR element
      if (isFocused && event.target) {
        // let's check if this itself is a TR element, if not, lets find one
        const currentRow =
          event.target.tagName === 'TR'
            ? event.target
            : event.target.parents.find((element: HTMLElement) => element.tagName === 'TR') ??
              event.target.querySelector('tr');

        if (currentRow) {
          if (document.activeElement?.isSameNode(currentRow)) {
            // look for previous sibling
            let previousSibling = currentRow.previousElementSibling;
            while (!previousSibling?.getAttribute('data-row-key')) {
              previousSibling = previousSibling.previousElementSibling;
              if (!previousSibling) break;
            }
            previousSibling?.focus();
          } else {
            // highlight itself
            currentRow.focus();
          }
        }
      }
    },
    [isFocused]
  );

  // Go to next row
  const handleDownKey = useCallback(
    (event) => {
      // If activeElement is a TR element or has any of it's parent as TR element, then we must look for next TR element
      if (isFocused && event.target) {
        // let's check if this itself is a TR element, if not, lets find one
        const currentRow =
          event.target.tagName === 'TR'
            ? event.target
            : event.target.parents.find((element: HTMLElement) => element.tagName === 'TR') ??
              event.target.querySelector('tr');

        if (currentRow) {
          if (document.activeElement?.isSameNode(currentRow)) {
            // look for next sibling
            let nextSibling = currentRow.nextElementSibling;
            while (!nextSibling?.getAttribute('data-row-key')) {
              nextSibling = nextSibling.nextElementSibling;
              if (!nextSibling) break;
            }
            nextSibling?.focus();
          } else {
            // highlight itself
            currentRow.focus();
          }
        }
      }
    },
    [isFocused]
  );

  // Expand Row
  const handleRightKey = useCallback(
    (event) => {
      // If activeElement is a TR element or has any of it's parent as TR element, then we must look for next TR element
      if (isFocused && event.target) {
        // let's check if this itself is a TR element, if not, lets find one
        const currentRow =
          event.target.tagName === 'TR'
            ? event.target
            : event.target.parents.find((element: HTMLElement) => element.tagName === 'TR') ??
              event.target.querySelector('tr');

        if (currentRow) {
          if (document.activeElement?.isSameNode(currentRow)) {
            // look for previous sibling
            const rowKey = currentRow.getAttribute('data-row-key');
            setExpandedRowKeys(Array.from(new Set([...expandedRowKeys, rowKey])));
          }
        }
      }
    },
    [isFocused, setExpandedRowKeys, expandedRowKeys]
  );

  // Collapse Row
  const handleLeftKey = useCallback(
    (event) => {
      // If activeElement is a TR element or has any of it's parent as TR element, then we must look for next TR element
      if (isFocused && event.target) {
        // let's check if this itself is a TR element, if not, lets find one
        const currentRow =
          event.target.tagName === 'TR'
            ? event.target
            : event.target.parents.find((element: HTMLElement) => element.tagName === 'TR') ??
              event.target.querySelector('tr');

        if (currentRow) {
          if (document.activeElement?.isSameNode(currentRow)) {
            // look for previous sibling
            const rowKey = currentRow.getAttribute('data-row-key');
            setExpandedRowKeys(expandedRowKeys.filter((keys) => keys !== rowKey));
          }
        }
      }
    },
    [isFocused, setExpandedRowKeys, expandedRowKeys]
  );

  useHotkeys('up', handleUpKey, [handleUpKey]);
  useHotkeys('down', handleDownKey, [handleDownKey]);
  useHotkeys('right', handleRightKey, [handleRightKey]);
  useHotkeys('left', handleLeftKey, [handleLeftKey]);

  return {
    handleOnFocus,
    handleOnBlur,
  };
};
