# FE-05 — Accessibility notes

## Hand-built components

The playground contains three React + TypeScript components written without a component library:

- `Modal.tsx`
- `Tabs.tsx`
- `Disclosure.tsx`

The implementation follows the corresponding WAI-ARIA Authoring Practices patterns and keeps component props explicitly typed.

## Keyboard test checklist

### Modal

- Tab moves between focusable controls inside the dialog.
- Shift+Tab moves backwards and wraps at the first control.
- Escape closes the dialog.
- Focus moves into the dialog when it opens.
- Focus returns to the element that opened the dialog when it closes.
- `role="dialog"` and `aria-modal="true"` are present.

### Tabs

- ArrowRight selects/focuses the next tab.
- ArrowLeft selects/focuses the previous tab.
- Home moves to the first tab.
- End moves to the last tab.
- Enter/Space use the native button activation behavior.
- Only the active tab has tabIndex 0.

### Disclosure

- Enter and Space work through native button behavior.
- aria-expanded communicates open/closed state.
- aria-controls connects the trigger to its panel.

## What shadcn/ui handled that the hand-built version missed

The point of this comparison is not that the hand-built widgets are unusable; it is that a production component has more defensive behavior around edge cases.

### 1. Modal lifecycle and focus restoration

My version stores the active element when the dialog opens and restores it when the dialog closes. However, a production dialog implementation needs to handle more lifecycle edge cases, including trigger unmounting and focus behavior when the component tree changes during the open state. shadcn's dialog is built on Radix primitives, which provide a more comprehensive focus-management lifecycle.

### 2. Outside interaction and dismissal semantics

My modal demonstrates Escape and keyboard focus trapping, but it intentionally keeps the outside-interaction policy simple. A production dialog also needs deliberate handling of pointer/focus interaction outside the content, preventing accidental dismissal when appropriate, and coordinating overlay/content events. shadcn/Radix provides these interaction primitives instead of requiring each application to recreate them.

### 3. Focus guards and nested/focus-scope behavior

The hand-built focus trap queries the current dialog DOM each time Tab is pressed. It does not implement the broader focus-scope machinery needed for complex nested overlays or dynamically changing focus regions. Radix's dialog uses dedicated focus-management primitives to make these cases more robust.

### 4. Component API and state flexibility

The playground components intentionally expose small APIs for learning. shadcn's generated components expose more composable primitives, allowing applications to customize trigger, content, title, description, close, and other pieces independently rather than putting the entire widget behind one component.

## Conclusion

Building the widgets by hand made the keyboard and ARIA responsibilities visible. The comparison with shadcn shows why accessible UI is more than adding roles: focus lifecycle, dismissal behavior, composability, and edge cases need explicit engineering.
