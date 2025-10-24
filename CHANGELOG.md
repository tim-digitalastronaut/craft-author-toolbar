# Release Notes for Author toolbar

## v1.1.11-beta - 2025.10.24

-   Fixed a failed release

## v1.1.10-beta - 2025.10.24

-   Added text highlighting to search matches

## v1.1.9-beta - 2025.10.22

-   Fixed commerce crashed
-   Fixed more styling scope issues

## v1.1.8-beta - 2025.10.22

-   Fixed issue where toolbar would crash if some settings where not saved
-   Fixed styling scope issue

## v1.1.7-beta - 2025.10.22

-   Added hotkey **Cmd + V** for collapsing the toolbar
-   Fixed escapce key not working for closing menus
-   Fixed JS text not getting translated correctly
-   Fixed some missing translations
-   Fixed issue where the margin for the toolbar would be applied if its not there
-   Limited search results per group to 5
-   Added an environment warning banner
-   Added settings to manage which entries can be created from the toolbar aciton buttons
-   Automatically update page margin to prevent the toolbar from covering page content

## v1.1.6-beta - 2025.10.20

-   Fixed show element on page class for headings tab
-   Fixed issue where the toolbar would render on livePreview requests [#3](https://github.com/tim-digitalastronaut/craft-author-toolbar/issues/3)
-   Added visibility toggle button to the toolbar for better control on smaller screens [#4](https://github.com/tim-digitalastronaut/craft-author-toolbar/issues/4)
-   Added a setting for showing and hiding the context bar

> [!NOTE]  
> If you experience crashes when visiting the settings page about an unknown customWidgets variable. Try reinstalling the plugin.

## v1.1.5-beta - 2025.10.16

-   Fixed a bug where the global page search would crash for non craft commerce projects

## v1.1.4-beta - 2025.10.16

-   Fixed a bug where the toolbar would crash if empty custom start menu links where added

## v1.1.3-beta - 2025.10.16

-   Also render the toolbar for custom pages
-   Fixed issue where the share previews would not work for custom pages
-   Fixed issue where the toolbar would show incorrect info for custom pages
-   Fixed responsive issues with the menu's for smaller screen sizes
-   Fixed responsive issues for the page info link
-   Added user permissions [#2](https://github.com/tim-digitalastronaut/craft-author-toolbar/issues/2)
-   Added settings for managing the default widgets
-   Added settings for managing the start menu links
-   Added settings for adding custom links to the start menu
-   Added translations for the plugin
-   Added English and Dutch translations
-   Added a documentation site
-   Styling refactored

## v1.1.2-beta - 2025.10.13

-   Fix for previous release fail again

## v1.1.1-beta - 2025.10.13

-   Fix for previous release fail

## v1.1.0-beta - 2025.10.13

-   Added Support for Craft Commerce
-   Added commerce orders (with new orders badge), products and inventory to the startmenu when craft commerce is installed
-   Fixed a layout issue where the url in the toolbar would wrap for extra long URL's
-   Fixed a styling issue in create entry type menu
-   Fixed an issue where the toolbar whould not show on product pages
-   Only show the toolbar for admin user (temporary fix for [#2](https://github.com/tim-digitalastronaut/craft-author-toolbar/issues/2))
-   Added context aware actions buttons so editing content pages and products is seamless
-   Added products to the global search menu
-   Improved the global search
    -   limited results per entry type/product
    -   removed unnessecary view all links and totals for single sections
    -   Show product specific data when entry is a commerce product
-   Added support for custom widgets that allow for site specific customisations (Work in progress)
-   Added structured data analasys to the SEO menu for inspecting JSON-LD objects [#1](https://github.com/tim-digitalastronaut/craft-author-toolbar/issues/1)

## v1.0.9-beta - 2025.09.30

-   Fixed empty help menu when no info is provided
-   Fixed empty add entries menu when no sections exist
-   Fixed styling issues with the seo previews

## v1.0.8-beta - 2025.09.29

-   Fixed service unavailable error

## v1.0.7-beta - 2025.09.29

-   Fixed a styling bug

## v1.0.6-beta - 2025.09.29

-   Added a more robust styling reset to better prevent styling conflicts
-   Added more specific element based styles to prevent user styling conflicts
-   Fixed a styling bug

## v1.0.5-beta - 2025.09.19

-   Fixed release issue

## v1.0.4-beta - 2025.09.19

-   Fixed release issue

## v1.0.3-beta - 2025.09.19

-   Fixed typo
-   Fixed a styling issue

## v1.0.2-beta - 2025.09.19

-   Fixed release issue

## v1.0.1-beta - 2025.09.19

-   Fixed styling specificity for basic elements to prevent them being overwritten.
-   Fixed the search function to only include entries that resolve to a frontend URL.
-   Fixed the SEO checklist alt tags check to exclude images with role presentation.
-   Added a fallback value when an account has no firstName and lastName value.

## v1.0.0-beta - 2025.09.19

-   Initial beta release
