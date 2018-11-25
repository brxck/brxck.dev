---
title: Voice Coding with VS Code
date: 2018-11-25
tags: Voice-Coding VSCode
---

Make voice coding faster, reduce cognitive load, and maintain your grammars more easily by moving complex actions into your editor.

One of the first optimizations you might want to make while voice coding is to incorporate boilerplate and complex actions into your programming vocabularies or grammars. Instead of constructing a for loop or a function declaration with single keywords and characters, you can give them a single command which gets you most of the way there. This is the kind of important optimization that makes voice coding possible, instead of a frustratingly slow and error prone slog. 

But this introduces a new set of problems: more commands to remember, more potential for conflict, and more to maintain in your grammars. The alternative solution is not limited to voice coding, and it may be painfully obvious if you are already familiar with it: snippets.

I'm sure this applies and any editor, but we're using VS Code here.

## Snippets

Editor snippets are fancy text expansion --- type few otherwise meaningless characters, hit your expansion key, and your characters are replaced with boilerplate, complete with predefined edit points you can tab between. 

Using snippets:
- reduces cognitive load remembering vocal commands. If you're fishing for a snippet you can't quite remember, rely on your editor's suggestions. 
- reduces difficult navigation by providing points to tab between
- is much easier and less prone to conflict and breakage than a dragonfly grammar
- [allows you to use snippets created and maintained by other people](https://marketplace.visualstudio.com/search?term=snippets&target=VSCode&category=All%20categories&sortBy=Relevance)
- and is super useful when you're at a keyboard as well.

### Emmet

If you find yourself editing HTML or JSX, you will find [Emmet](https://emmet.io/) similarly useful. It allows you to expand tags from abbreviations and has some useful features for navigating, selecting, and manipulating them as well.

### Settings

I felt really smart and really stupid when I figured this out. But there were a few settings I needed to discover (out of *729* total) in VS Code before this was practical:

```json
  "editor.tabCompletion": "on", // Instantly trigger snippet, no waiting on suggestion menu
  "editor.snippetSuggestions": "top",
  "editor.acceptSuggestionOnEnter": "off",
  "emmet.includeLanguages": { // Use expansions in React
    "javascript": "javascriptreact"
  },
```

The key shortcut for triggering Emmet expansions, `emmet.expandAbbreviation`, also needs to be set. By having separate keys for Emmet and snippets, we remove competition between the two.

Most importantly, you will need an alphabet of unambiguous alphabetical commands that you can speak quickly. You can just focus on optimizing these 26 commands, which are the gateway to any expansion you can find or come up with.

## Navigation

In my experience, navigation is another pain point when voice coding. Writing fresh code is easy, but getting around existing code involves some mental math and a healthy amount of guesswork. There are a couple ways to extend your navigation abilities.

- Setting relative line numbers (`"editor.lineNumbers": "relative",`) removes the mental math of navigating by line.
- Soft undo (ctrl-U) is a built-in feature that moves your cursor back to its previous location. 
- [MetaGo](https://github.com/metaseed/metaGo) can save you a lot of effort by letting you jump or select to any character on screen and navigate and by code blocks.

I found my editor-focused efforts have made coding and writing grammars much easier. It seems obvious, but wasn't really possible until I found the right configuration.