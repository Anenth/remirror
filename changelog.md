# Changelog

## 1.0.0-next.2

> 2020-07-06

### Minor Changes

- Add support for `React.StrictMode`.

  Previously, activating `StrictMode` would cause the components to render twice and break
  functionality of `RemirrorProvider` due to an outdated check on whether `getRootProps` had been
  called. This check has been removed since it isn't needed anymore.

## 1.0.0-next.1

> 2020-07-05

### Patch Changes

- Fix missing dist files from previous publish.

## 1.0.0-next.0

> 2020-07-05

### Major Changes

- The whole API for remirror has completely changed. These pre-release versions are a breaking
  change across all packages. The best way to know what's changed is to read the documentaion on the
  new documentation site `https://remirror.io`.
- 28bd8bea: This is a breaking change to the structure of published npm packages.

  - Move build directory from `lib` to `dist`
  - Remove option for multiple entry points. It is no longer possible to import module from
    '@remirror/core/lib/custom'
  - Only use one entry file.
  - Remove declaration source mapping for declaration files
  - Remove the src directory from being published.

- 7b817ac2: Rename all types and interfaces postfixed with `Params` to use the postfix `Parameter`.
  If your code was importing any matching interface you will need to update the name.
- 09e990cb: Update `EditorManager` / `ExtensionManager` name to be \*\*`RemirrorManager`.

### Minor Changes

- Previously the `useRemirror` hook only updated when the provider was updated. There are times when
  you want to listen to specific changes from inside the editor.

  The `useRemirror` hook now takes an optional `onChange` argument which is called on every change
  to the editor state. With this you can react to updates in your editor and add some really cool
  effects.

## 0.11.0

### Minor Changes

- 026d4238: Add a `focus` method to the remirror editor context object. It allows focusing at a
  provided position which can be `start`, `end`, a specific position or a range using the
  `{from: number; to: number}` type signature.

  To use this run

  ```tsx
  import { useRemirrorContext } from '@remirror/react';

  const MyEditor = () => {
    const { focus, getRootProps } = useRemirrorContext();

    useEffect(() => {
      focus('end'); // Autofocus to the end once
    }, []);
  };
  return <div {...getRootProps()} />;
  ```

  Resolves the initial issue raised in #229.

- 69d00c62: Add custom arguments to `autoFocus` props. The same arguments that can added to the
  `focus()` context method can now be passed as a prop.

- c2237aa0: Allow empty string default value for extraAttrs

## 0.9.0

### Minor Changes

- 0300d01c: - Auto defined `isEnabled` via commands with `dispatch=undefined`.
  - `HistoryExtension` now checks that whether `dispatch=undefined`.
  - Remove `CommandStatusCheck`.
  - Add new type `ExtensionIsActiveFunction` which doesn't take the command name.
  - Remove `isEnabled` from `Extension` interface.

## 0.8.1

### Patch Changes

- 2904ebfd: Fix problem with build outputting native classes which can't be extended when the build
  process converts classes to their ES% function equivalent.

## 0.8.0

### Minor Changes

- 24f83413: - Change the signature of `CommandFunction` to only accept one parameter which contains
  `dispatch`, `view`, `state`.

  - Create a new exported `ProsemirrorCommandFunction` type to describe the prosemirror commands
    which are still used in the codebase.
  - Rename `KeyboardBindings` to `KeyBindings`. Allow `CommandFunctionParams` to provide extra
    parameters like `next` in the newly named `KeyBindings`.
  - Create a new `KeyBindingCommandFunction` to describe the `Extension.keys()` return type. Update
    the name of the `ExcludeOptions.keymaps` -> `ExcludeOptions.keys`.

  **BREAKING CHANGE**

- 24f83413: Improve the way `ExtensionManager` calls `Extension.keys` methods. Keys now use the new
  api for CommandFunctions which provides a `next` method. This method allows for better control
  when deciding whether or not to defer to the next keybinding in the chain.

  To override, create a new keybinding with another extension. Make sure the extension is created
  with a higher priority. The keybinding you create can either return true or false. By default if
  it returns true, no other keybindings will run. However if it returns `false` all other
  keybindings will be run until one returns `true`

  `next` basically calls the every lower priority keybinding in the extensions list. It gives you
  full control of how the bindings are called.

## [0.7.2] - 2019-12-10

### Changes

- 🐛 **`@remirror/core`**: Fix bug in `isExtension` predicate test
  (https://github.com/remirror/remirror/pull/181).
- Upgrade dependencies and add new command for unit testing built code.

### Removed

- `@remirror/core`: Remove deprecated `findNodeAtEndOfDoc` `findNodeAtStartOfDoc` which can be
  replaced with `doc.firstChild` and `doc.lastChild`

## [0.7.1] - 2019-12-02

### Changes

- Upgrade dependencies.

## [0.7.0] - 2019-11-18

### Added

- 🚀 `@remirror/react`, `@remirror/editor-wysiwyg`, `@remirror/editor-social`: New `extensions`
  props on the `RemirrorManager` for injecting additional extensions into prebuilt editors
  https://github.com/remirror/remirror/pull/176.

## [0.6.5] - 2019-11-17

### Changed

- `@remirror/extension-collaboration`: Bug fix for `this` being undefined
  https://github.com/remirror/remirror/issues/174.
- Upgrade dependencies.

## [0.6.4] - 2019-11-07

### Changed

- Switch to using JSX Pragma from `emotion/core`.
- Upgrade dependencies.

## [0.6.3] - 2019-11-01

### Changed

- Upgrade dependencies.
- Add [all-contributors](https://allcontributors.org/) config.
- Add package patches for broken types.

## [0.6.2] - 2019-10-21

### Changed

- Upgrade dependencies.
- Internal cleanup.

### Removed

- `@remirror/react-node-view` - Remove `SelectionObserver`.

## [0.6.1] - 2019-10-07

### Changed

- Upgrade dependencies.
- Use `Object.create(null)` instead of `{}` throughout the codebase.

## [0.6.0] - 2019-09-25

### Added

- `jest-prosemirror`: New snapshot serializer exported as `prosemirrorSerializer`.
- `jest-prosemirror`: New `debug` method which logs the editor's prettified html to the console.
- `prosemirror-suggest`: Now supports ignoring activation characters to prevent matches from
  appearing in ignored sections.

### Changed

- `@remirror/extension-mention`: Fix a long standing bug where the editor crashes after deleting a
  single character mention.

## [0.5.0] - 2019-09-23

### Added

- 🚀 `@remirror/react-hooks`: **New package** for shared react hooks.
- 🚀 `@remirror/react-portals`: **New package** for the remirror / react portals.
- 🚀 `@remirror/react-node-view`: **New package** for prosemirror node views built with react
  components.
- 🚀 `@remirror/dev`: **New package** developing extensions and components.
- 🚀 `prosemirror-suggest`: **New package** for managing prosemirror suggestions.
- 🚀 `test-keyboard`: **New package** for dispatching keyboard events.
- 🚀 `@remirror/ui`, `@remirror/ui-buttons`, `@remirror/ui-dropdown`, `@remirror/ui-icons`,
  `@remirror/ui-menus`, `@remirror/ui-modal`, `@remirror/ui-text`: **New packages** and several
  utilities for managing the ui of a remirror editor.
- 🚀 `@remirror/core`: Introduce the concept of meta tags for extensions. These allow an extension
  to tag itself and these tags are made available through the tag object which is passed to all
  extension methods.
- 🚀 `@remirror/core`: Add a `helpers` method to extensions. These are similar to commands except
  they don't have access to the view and shouldn't directly affect the editor. They can also return
  data and receive custom parameters. They can be accessed with `manager.data.helpers.myHelper()`.
- 🚀 `@remirror/core-extensions`: Add `TrailingNodeExtension` to always append a specified node to
  the end of the dom.
- `@remirror/core`: Add `getExtraAttrs` method to the extension which can be used in the
  `(Mark/Node)Extension`.
- 🚀 `@remirror/core`: Add `DropCursorExtension` for a cursor to show up at the exact location an
  item will be dropped.
- 🚀 `@remirror/core`: Add `GapCursorExtension` for support of tricky to select locations.

- Introduce new `@builtin` annotation to show when an extension is included by default.
- Introduce new `@schema` annotation for extension options to indicated that an option should not be
  updated after creating or it will change the schema.
- New command `yarn generate:json` which auto generates json files for
  `support/rollup/rollup.config.js`, `support/storybook/.babelrc.js`, `support/tsconfig.paths.json`
  and `.size-limit.json`. Previously these were maintained manually.

### Changed

- 💥 **BREAKING `@remirror/react-renderer`:** Updated the name of `@remirror/renderer-react` for
  consistency.
- 💥 **BREAKING `@remirror/core`:** `@emotion/core` is now a `peerDependency`. When adding this
  library to your project you will need to `yarn add @emotion/core` as well. This is required to
  prevent bugs with version conflicts within the EmotionThemeProvider.
- 💥 **BREAKING `@remirror/core`:** `deepMerge` now takes multiple parameters instead of one array
  of objects to merge.
- 💥 **BREAKING `@remirror/core` `@remirror/core-extensions` and all extensions:** Refactor
  ExtensionTypes with a whole set of helpers for better type checking and self documenting types.
  Now the remirror component can receive the List of Extensions and from this infer the nodes, marks
  and actions available on any editor. Currently this inference has only been added to the Wysiwyg
  editor but will be added to the Twitter editor and all future editors.
- 💥 **BREAKING `@remirror/core` `@remirror/core-extensions`:** Move `ParagraphExtension` from core
  to core-extensions. The reason is to not pollute the core library with formatting methods which
  are primarily just for extensions.
- 💥 **BREAKING `@remirror/core`:** Rename `ExtensionType.EXTENSION = 'extension'` to
  `ExtensionType.Plain = 'plain'`.
- 💥 **BREAKING `@remirror/ui`:** Rename `@remirror/react-components` to `@remirror/ui`. It is now
  the base component that will be used for all ui related functionality.
- 💥 **BREAKING `@remirror/react-utils`:** Refactor the type signature of node views and improve
  their design. Now node view takes attrs and options.
- 💥 **BREAKING `@remirror/react`:** Rename `NodeViewPortalComponent` to `RemirrorPortals` since it
  now supports decorations.
- 💥 **BREAKING `@remirror/react`:** Change the name of `useRemirror` to `useRemirrorContext`.
- 💥 **BREAKING `@remirror/editor-social`:** Rename `@remirror/editor-twitter` to
  `@remirror/editor-social` for branding reasons.
- 💥 **BREAKING `@remirror/core`:** Rename `NodeViewPortalContainer` to `PortalContainer`.
- 💥 **BREAKING `@remirror/core`:** Refactor the type signature of SSRComponents to only take a node
  and options `extraAttrs` configuration to enable parsing the dom.
- 💥 **BREAKING `jest-prosemirror`:** Names of matchers have been changed. `transformsPMNode` is now
  `toTransformNode` and `toEqualPMNode` is now `toEqualProsemirrorNode`.

- `@remirror/core`: Update `extraAttrs` configuration to enable parsing the dom.
- `@remirror/core`: Make default priority level for extensions `3` instead of `2`. A lower number
  means the extension is deemed more important and ordered earlier in lists.
- `@remirror/core-extensions`: Add `extraAttrs` to the following extensions: `LinkExtension`,
  `ParagraphExtension`, `HeadingExtension`.

### Removed

- 💥 **BREAKING `@remirror/renderer-react`:** Removed package.
- 💥 **BREAKING `@remirror/react-utils`:** Remove placeholder prop from the `RemirrorManager`.
- 💥 **BREAKING `@remirror/react`:** Remove higher order components.
- 💥 **BREAKING `@remirror/react`:** Remove `withoutEmotion` prop. This should now be configured via
  the `RemirrorThemeProvider` component.

## [0.4.1] - 2019-07-22

### Changed

- `@remirror/showcase`: Allow the `ExampleWysiwygEditor` to use prop `suppressHydrationWarning` for
  SSR rendering.
- `@remirror/showcase`: Revert unintended renaming of `ExampleTwitterEditor` to
  `ShowcaseTwitterEditor`.

## [0.4.0] - 2019-07-22

### Added

- 🚀 `@remirror/extension-collaboration`: Collaboration library added based on the brilliant example
  available in [tiptap](https://github.com/scrumpy/tiptap).
- 🚀 `@remirror/extension-mention`: Mentions can now be picked up from pasting data.
- 🚀 `@remirror/extension-code-block`: Add commands `toggleCodeBlock`, `createCodeBlock`,
  `updateCodeBlock` and `formatCodeBlock`, add keymap support for formatting, add backspace support
  for better navigation and other features.
- `@remirror/core`: Add `CommandNodeTypeParams`, `CommandMarkTypeParams`, `CommandTypeParams` which
  is now passed to the `commands` method for extensions.
- `@remirror/react-utils`, `@remirror/react`: Add `suppressHydrationWarning` prop to `Remirror`
  component. Set to true to ignore the hydration warning for a mismatch between the server and
  client content.
- `@remirror/core`: Add new `extensionData` method to the `ExtensionManager` which allows the
  extension to provide data on every transaction which will be available for consumption in the
  renderProp, React Context hooks and HOC's.
- `@remirror/core`: Add `getActions` to the params of all extension manager methods. This will throw
  an error if called before initialization.
- `@remirror/core`: Allow extensions to override `baseExtension` in the `RemirrorManager` component.
- `@remirror/core`: Add `ensureTrailingParagraph` as a configuration option for the paragraph node.
  In some scenarios, it is difficult to place a cursor after the last element. This ensures there's
  always space to select the position afterwards and fixes a whole range of issues. It defaults to
  false otherwise it breaks a lot of tests.
- `jest-prosemirror`: Enable editorViewOptions for the `createEditor` method. For example, now it is
  possible to intercept transactions with the `dispatchTransaction` hook.
- `@remirror/renderer-react`: Pass extension options through to SSR components as a prop.

- Add internal modifier key functions for puppeteer testing.
- Add integration editor tests for the `Wysiwyg` editor.

### Changed

- 💥 **BREAKING `@remirror/core`:** Change the way commands are configured. The command function on
  extensions now only accepts an object with the command names being globally unique. For example,
  the heading extension used to return a function now it returns an object with the following
  signature.

```ts
{
  toggleHeading(attrs?: Attrs<{level: number}>): CommandFunction;
}
```

This command can now be accessed via `actions.toggleHeading({ level: 2 })`

This is a large breaking change and may cause a lot of your existing code to stop working 😢.
However, it paves the way for a better development experience, a simpler to manage library and some
exciting features using type inference. Please do bear with me as I make these changes. I truly
believe they'll be worthwhile.

- 💥 **BREAKING `@remirror/core`:** Change usage `isEnabled` and `isActive` which are now methods on
  the command. e.g. `actions.toggleHeading.isEnabled()` would check whether the toggle heading
  button can be used at this moment.
- 💥 **BREAKING `@remirror/core`:** Change Extension function signature actions of `active` and
  `enabled`.
- 💥 **BREAKING `@remirror/core`:** Rename `getEditorState` to `getState`.
- 💥 **BREAKING `@remirror/core`:** Change method `getPortalContainer` to property `portalContainer`
  on the extension manager.
- 💥 **BREAKING `@remirror/extension-mention`:** Complete rewrite of internals and public API with
  better tests and more robust editing.
- 💥 **BREAKING `@remirror/extension-mention`:** Change `MentionExtension` from `NodeType` to
  `MarkType`. Text is now editable after a mention is created.
- 💥 **BREAKING `@remirror/react`:** Rename `setChildAsRoot` to `childAsRoot` on
  `RemirrorContextProviderProps` and all it consumers. This affects the `RemirrorContextProvider`,
  `RemirrorProvider` and `ManagedRemirrorProvider` exports. The prop now can take a boolean or the
  object with props to inject into the root.
- 💥 **BREAKING `@remirror/react`:** All RemirrorProviders now require a `children` prop. This
  prevents a bug when rendering in non-dom environments.
- 💥 **BREAKING `@remirror/react`:** `dispatchTransaction` has been renamed to
  `onDispatchTransaction`. It now must return a `transaction` and can be used to edit the
  transaction that will be used to create a new state.

- 🐛 `@remirror/core`: Fix bug with extension manager failing to provide attributes from the
  extensions.
- 🐛 `@remirror/core`: Fix TypeScript type of SSRComponent. Change from `Component` to
  `ComponentType`.
- 🐛 `@remirror/editor-twitter`: Fix bug where text area didn't expand to the full height of editor
  container.
- 🐛 `@remirror/editor-wysiwyg`: Fix bug where positioner was causing the editor to take up 10000 px
  in height.

## [0.3.0] - 2019-07-06

### Added

- `@remirror/react`: Add `withoutEmotion` which, when set to `true`, removes emotion (css-in-js)
  from the `Remirror` component. This is for those who don't like css-in-js and would like to work
  directly with the raw editor without random styles injected. Consuming the
  `@remirror/react-components` or any of the `@remirror/editor-*` packages will require the use of
  emotion.
- `@remirror/react-utils`: Add `oneChildOnly` export which throws readable errors for invalid
  children props.

### Changed

- 💥 **BREAKING `@remirror/react-utils`:** Rename `childIsFunction` to `propIsFunction` and make it
  a _pseudo_ predicate function (returns true when it doesn't throw an error).
- 💥 **BREAKING `@remirror/react`:** Rename `setChildAsRoot` to `childAsRoot` on
  `RemirrorContextProviderProps` and all it consumers. This affects the `RemirrorContextProvider`,
  `RemirrorProvider` and `ManagedRemirrorProvider` exports. The prop now can take a boolean or the
  object with props to inject into the root.
- 💥 **BREAKING `@remirror/editor-twitter`:** Rename `uiTwitterTheme` to `TwitterEditorTheme`.
- 💥 **BREAKING `@remirror/core`:** Rename `HasExtensions` to `ExtensionListParams`.
- 💥 **BREAKING `@remirror/core`:** It is now up to extensions to decide whether commands should be
  active when the editor is editable. `isEditable` method is now passed into the `commands` method
  as a means of checking.
- 💥 **BREAKING `@remirror/react`:** All RemirrorProviders now require a `children` prop. This
  prevents a bug when rendering in non-dom environments.

- Add support for [Git Large File Storage (LFS)](https://git-lfs.github.com/)
- `@remirror/editor-twitter`, `@remirror/editor-wysiwyg` : Use image-snapshot testing to ensure SSR
  and DOM rendered editors are identical.
- Update husky command from ~~`yarn stop:hooks`~~ and ~~`yarn start:hooks`~~ to `yarn husky:stop`
  and `yarn husky:start`.

### Removed

- 💥 **BREAKING `@remirror/react-utils` `@remirror/react` `@remirror/editor-markdown`
  `@remirror/editor-wysiwyg`:** Remove customRootProp from `RemirrorProps`.
- 💥 **BREAKING `@remirror/core`:** Remove `isEditable` guard from command functions. It is now up
  to the command or the caller to decide if it should run when the editor is not editable. To help
  with this command params with the method `isEditable` are passed to the `commands` method of the
  extension.
- 💥 **BREAKING `@remirror/core`:** Remove exports `GetItemParamsMethod` `createFlexibleFunctionMap`
  `hasExtensionProperty` `extensionPropertyMapper` `transformExtensionMap` `ignoreFunctions`.

## [0.2.0] - 2019-06-18

### Added

- Support for server side rendering (SSR) with passing integration tests for NextJS.
- Support for plain extension with styles impacting SSR (PlaceholderExtension can be rendered in
  SSR).
- **`@remirror/core`:** `ssrTransformer` added to extension methods as a way of wrapping and
  transforming the JSX element produced on the server.
- **`@remirror/core`:** `SSRComponent: React.ComponentType<any>` option added to
  `MarkExtensionOptions` and `NodeExtensionOptions` as a way of overriding the component rendered in
  an SSR environment.
- **`@remirror/core`:** `SSRHelpersExtension` added as a shorthand way of defining SSR
  transformations via ssrTransformer.
- **`@remirror/core`:** `injectBrIntoEmptyParagraphs` added for better SSR rendering.
- **`@remirror/react-utils`:** `isReactFragment` added to test if an element is a fragment.
- Create better unit tests for SSR.
- Add a changelog with changes starting from `v0.1.0`

### Changed

- 💥 **BREAKING:** Rename `@remirror/ui-*` packages to `@remirror/editor-*` for example
  @remirror/ui-twitter is .now called `@remirror/editor-twitter`.
- 💥 **BREAKING `@remirror/editor-twitter`:** Rename `UITwitter` and `TwitterUI` to `TwitterEditor`.
- 💥 **BREAKING `@remirror/editor-markdown`:** Rename `UIMarkdown` and `MarkdownUI` to
  `MarkdownEditor`.
- 💥 **BREAKING `@remirror/editor-wysiwyg`:** Rename `UIWysiwyg` and `WysiwygUI` to `WysiwygEditor`.
- Speed up tslint by enforcing linting on individual modules (new `tsconfig.lint.json` files).
- Remove `cx` import from `emotion` library in from `@remirror/core` to reduce the bundle size.
- Set `@emotion/core` and `@emotion/styled` as peer dependencies.

### Removed

- 💥 **BREAKING:** `@remirror/ui-*` packages.

## [0.1.0] - 2019-06-10

### Added

- Enable remirror as a controlled component #79 #78.
- @remirror/ui-markdown - Still in progress.
- @remirror/extension-multicursor - this is currently just a stub (almost no code).
- @remirror/api-documenter - will be used to generate the api documentation.

### Changed

- **BREAKING:** Rename all extensions to include an Extension postfix. e.g. Emoji is now
  EmojiExtension. This will hopefully reduce name collisions in the future.
- Improves the puppeteer testing by separating it out from unit tests in the package.
- Upgrade docz to v1 #65.
- General improvements to docs.
- Fixes missing TypeScript definitions #77.
- Fixes crash when rendering a ReactNodeView in NextJS #75.

[unreleased]: https://github.com/remirror/remirror/compare/0.7.2...HEAD
[0.7.2]: https://github.com/remirror/remirror/compare/v0.7.1...0.7.2
[0.7.1]: https://github.com/remirror/remirror/compare/v0.7.0...0.7.1
[0.7.0]: https://github.com/remirror/remirror/compare/v0.6.5...0.7.0
[0.6.5]: https://github.com/remirror/remirror/compare/v0.6.4...v0.6.5
[0.6.4]: https://github.com/remirror/remirror/compare/v0.6.3...v0.6.4
[0.6.3]: https://github.com/remirror/remirror/compare/v0.6.2...v0.6.3
[0.6.2]: https://github.com/remirror/remirror/compare/v0.6.1...v0.6.2
[0.6.1]: https://github.com/remirror/remirror/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/remirror/remirror/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/remirror/remirror/compare/v0.4.1...v0.5.0
[0.4.1]: https://github.com/remirror/remirror/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/remirror/remirror/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/remirror/remirror/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/remirror/remirror/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/remirror/remirror/releases/tag/v0.1.0
