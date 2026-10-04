# SCSS Agent Instructions

## Purpose

This file defines the complete SCSS development rules for the Pulse frontend.

These instructions are mandatory for every SCSS-related task.

The goal is to keep SCSS:

- scalable
- responsive
- maintainable
- reusable
- accessible
- theme-aware
- low-specificity
- future-proof
- consistent with the existing project architecture

Do not introduce a new SCSS architecture unless explicitly requested.

---

# 1. Existing SCSS Architecture

The current SCSS architecture is:

```text
src/scss/
├── abstracts
│   ├── _breakpoints.scss
│   ├── _functions.scss
│   ├── _mixins.scss
│   └── _variables.scss
│
├── base
│   ├── _base.scss
│   ├── _reset.scss
│   └── _typography.scss
│
├── components
│   ├── _buttons.scss
│   ├── _cards.scss
│   ├── _forms.scss
│   ├── _modal.scss
│   ├── _scrollbar.scss
│   ├── _skeleton.scss
│   └── _toast.scss
│
├── layouts
│   ├── _auth.scss
│   ├── _dashboard.scss
│   └── _responsive.scss
│
├── pages
│   ├── auth/
│   │   └── _auth.scss
│   ├── chat/
│   │   └── _chat.scss
│   ├── notifications/
│   ├── profile/
│   │   └── _profile.scss
│   ├── settings/
│   │   └── _settings.scss
│   ├── themes/
│   │   ├── _dark.scss
│   │   ├── _light.scss
│   │   └── _themes.scss
│   └── users/
│       └── _users.scss
│
├── utilities
│   ├── _accessibility.scss
│   ├── _animations.scss
│   └── _utilities.scss
│
└── main.scss